import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { loadJsonFromStorage, saveJsonToStorage } from "@utils/storage";

const KEY = "europython:favorites";
const KEY_PER_YEAR = (year: number) => `${KEY}:${year}`;

export async function loadFavorites(year?: number): Promise<Set<string>> {
  const storageKey = year ? KEY_PER_YEAR(year) : KEY;
  const arr = await loadJsonFromStorage<string[]>(storageKey, []);
  return new Set(arr);
}

export async function saveFavorites(favs: Set<string>, year?: number): Promise<void> {
  const storageKey = year ? KEY_PER_YEAR(year) : KEY;
  const arr = Array.from(favs);
  await saveJsonToStorage(storageKey, arr);
}

type FavoritesContextValue = {
  favorites: Set<string>;
  loading: boolean;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => Promise<void>;
  setFavorite: (id: string, value: boolean) => Promise<void>;
  clearFavorites: () => Promise<void>;
  year?: number;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({
  children,
  year,
}: {
  children: React.ReactNode;
  year?: number;
}) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const favs = await loadFavorites(year);
        setFavorites(new Set(favs));
      } finally {
        setLoading(false);
      }
    })();
  }, [year]);

  const persist = useCallback(
    async (next: Set<string>) => {
      try {
        await saveFavorites(next, year);
      } catch (err) {
        console.warn("Failed to save favourites", err);
        throw err;
      }
    },
    [year],
  );

  const applyFavoriteChange = useCallback(
    async (mutate: (draft: Set<string>) => void) => {
      let nextState: Set<string> | null = null;
      let prevSnapshot: Set<string> | null = null;
      setFavorites((prev) => {
        prevSnapshot = prev;
        const next = new Set(prev);
        mutate(next);
        nextState = next;
        return next;
      });
      if (nextState) {
        try {
          await persist(nextState);
        } catch (err) {
          console.warn("Failed to save favourites", err);
          if (prevSnapshot) {
            setFavorites(prevSnapshot);
          }
        }
      }
    },
    [persist],
  );

  const setFavorite = useCallback(
    async (id: string, value: boolean) => {
      await applyFavoriteChange((draft) => {
        if (value) {
          draft.add(id);
        } else {
          draft.delete(id);
        }
      });
    },
    [applyFavoriteChange],
  );

  const toggleFavorite = useCallback(
    async (id: string) => {
      await applyFavoriteChange((draft) => {
        if (draft.has(id)) {
          draft.delete(id);
        } else {
          draft.add(id);
        }
      });
    },
    [applyFavoriteChange],
  );

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      loading,
      isFavorite: (id: string) => favorites.has(id),
      toggleFavorite,
      setFavorite,
      clearFavorites: async () => {
        setFavorites(new Set());
        try {
          await persist(new Set());
        } catch (err) {
          console.warn("Failed to clear favourites", err);
        }
      },
      year,
    }),
    [favorites, loading, setFavorite, toggleFavorite, persist, year],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return ctx;
}
