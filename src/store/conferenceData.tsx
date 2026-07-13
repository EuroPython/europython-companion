import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AppState, type AppStateStatus } from "react-native";
import NetInfo, { type NetInfoState } from "@react-native-community/netinfo";

import { DATA_REFRESH_INTERVAL_MS } from "@config/constants";
import {
  loadCachedConferenceData,
  loadConferenceDataWithMeta,
} from "@services/conference";
import { loadWifiInfo, WifiInfo } from "@services/wifi";
import { ConferenceData } from "@app-types/conference";

type ConferenceContextValue = {
  data: ConferenceData | null;
  wifi: WifiInfo | null;
  loading: boolean;
  refreshing: boolean;
  error: Error | null;
  fromCache: boolean;
  fetchedAt: string | null;
  isOffline: boolean;
  lastFetchFailed: boolean;
  conferenceYear: number;
  resolvedYear: number;
  refresh: () => Promise<void>;
  refreshIfStale: () => Promise<void>;
};

const ConferenceDataContext = createContext<ConferenceContextValue | undefined>(
  undefined,
);

export function ConferenceDataProvider({
  children,
  year,
}: {
  children: React.ReactNode;
  year: number;
}) {
  const [data, setData] = useState<ConferenceData | null>(null);
  const [wifi, setWifi] = useState<WifiInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [lastFetchFailed, setLastFetchFailed] = useState(false);
  const [resolvedYear, setResolvedYear] = useState(year);
  const hasLoaded = useRef(false);
  const requestIdRef = useRef(0);
  const lastFetchAtRef = useRef(0);

  const fetchData = useCallback(
    async (opts?: { forceRefresh?: boolean; silent?: boolean }) => {
      // don't fetch if we are in silent mode and the last fetch
      // was too recent, unless forceRefresh is true (pull to refresh)
      if (opts?.silent && !opts?.forceRefresh) {
        if (Date.now() - lastFetchAtRef.current < DATA_REFRESH_INTERVAL_MS) return;
      }
      lastFetchAtRef.current = Date.now();

      const requestId = (requestIdRef.current += 1);
      const isRefresh = opts?.forceRefresh || hasLoaded.current;

      if (!opts?.silent) {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }
      }

      loadWifiInfo().then((info) => {
        if (requestId === requestIdRef.current) setWifi(info);
      });

      try {
        const result = await loadConferenceDataWithMeta(year, {
          forceRefresh: opts?.forceRefresh,
        });
        if (requestId !== requestIdRef.current) return;
        setData(result.data);
        setFromCache(result.fromCache);
        setFetchedAt(result.fetchedAt);
        setResolvedYear(result.resolvedYear ?? year);
        setError(null);
        setIsOffline(false);
        setLastFetchFailed(false);
        hasLoaded.current = true;
      } catch (err) {
        if (requestId !== requestIdRef.current) return;
        setError(err as Error);
        const navigatorOffline =
          typeof navigator !== "undefined" && navigator.onLine === false;
        setIsOffline((prev) => prev || navigatorOffline);
        setLastFetchFailed(true);
        if (!hasLoaded.current) {
          setData(null);
        }
      } finally {
        if (requestId !== requestIdRef.current) return;
        setLoading(false);
        setRefreshing(false);
      }
    },
    [year],
  );

  useEffect(() => {
    setData(null);
    setFetchedAt(null);
    setFromCache(false);
    setError(null);
    setResolvedYear(year);
    setLoading(true); // avoid a data=null && loading=false empty-state flash on year-switch
    hasLoaded.current = false;
    const requestId = (requestIdRef.current += 1);
    // Seed instantly from cache (if any) so the UI never blocks on the network,
    // then let fetchData() below run as a background revalidation.
    loadCachedConferenceData(year).then((cached) => {
      if (requestId !== requestIdRef.current) return; // year changed mid-read
      if (cached) {
        setData(cached.data);
        setFromCache(true);
        setFetchedAt(cached.fetchedAt);
        setLoading(false);
        hasLoaded.current = true; // so fetchData() below runs as a background refresh
      }
      fetchData();
    });
  }, [fetchData, year]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const offline = state.isConnected === false || state.isInternetReachable === false;
      setIsOffline(offline);
    });

    NetInfo.fetch().then((state: NetInfoState) => {
      const offline = state.isConnected === false || state.isInternetReachable === false;
      setIsOffline(offline);
    });

    return () => {
      unsubscribe();
    };
  }, [fetchData]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData({ silent: true });
    }, DATA_REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchData]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextState: AppStateStatus) => {
        if (nextState === "active") {
          fetchData({ silent: true });
        }
      },
    );
    return () => subscription.remove();
  }, [fetchData]);

  const refresh = useCallback(async () => {
    await fetchData({ forceRefresh: true });
  }, [fetchData]);

  const refreshIfStale = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  const value = useMemo<ConferenceContextValue>(
    () => ({
      data,
      wifi,
      loading,
      refreshing,
      error,
      fromCache,
      fetchedAt,
      isOffline,
      lastFetchFailed,
      conferenceYear: year,
      resolvedYear,
      refresh,
      refreshIfStale,
    }),
    [
      data,
      wifi,
      error,
      fetchedAt,
      fromCache,
      isOffline,
      lastFetchFailed,
      loading,
      refresh,
      refreshIfStale,
      refreshing,
      year,
      resolvedYear,
    ],
  );

  return (
    <ConferenceDataContext.Provider value={value}>
      {children}
    </ConferenceDataContext.Provider>
  );
}

export function useConferenceData(): ConferenceContextValue {
  const ctx = useContext(ConferenceDataContext);
  if (!ctx) {
    throw new Error("useConferenceData must be used within ConferenceDataProvider");
  }
  return ctx;
}
