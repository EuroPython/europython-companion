import { useCallback } from "react";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import navigationRef from "@navigation/navigationRef";
import {
  CombinedParamList,
  HomeStackRoutes,
  SharedRoutes,
  TabRoutes,
  AgendaStackRoutes,
  SettingsStackRoutes,
} from "@navigation/routes";

/**
 * Centralized navigation helpers for common app routes.
 * These helpers try the local navigator first, then fall back to the parent tab navigator.
 */
export function useAppNavigation() {
  const navigation = useNavigation<NavigationProp<CombinedParamList>>();
  const parentNav = navigation?.getParent?.();

  const hasRoute = (nav: NavigationProp<ParamListBase> | undefined, name: string) => {
    const state = nav?.getState?.();
    const names = state?.routeNames as string[] | undefined;
    return Array.isArray(names) && names.includes(name);
  };

  const goToScheduleTab = useCallback(() => {
    if (parentNav) {
      parentNav.navigate(TabRoutes.Schedule);
    } else {
      navigationRef.current?.navigate(TabRoutes.Schedule);
    }
  }, [parentNav]);

  const goToSpeakersTab = useCallback(() => {
    if (parentNav) {
      parentNav.navigate(TabRoutes.Speakers);
    } else {
      navigationRef.current?.navigate(TabRoutes.Speakers);
    }
  }, [parentNav]);

  const goToHomeTab = useCallback(() => {
    if (parentNav) {
      parentNav.navigate(TabRoutes.Home);
    } else {
      navigationRef.current?.navigate(TabRoutes.Home);
    }
  }, [parentNav]);

  const goToSettingsTab = useCallback(() => {
    if (parentNav) {
      parentNav.navigate(TabRoutes.Settings);
    } else {
      navigationRef.current?.navigate(TabRoutes.Settings);
    }
  }, [parentNav]);

  const goToAgendaTab = useCallback(() => {
    if (hasRoute(navigation, AgendaStackRoutes.Agenda)) {
      navigation.navigate(AgendaStackRoutes.Agenda);
      return;
    }
    if (parentNav) {
      parentNav.navigate(TabRoutes.Agenda, {
        screen: AgendaStackRoutes.Agenda,
      });
      return;
    }
    navigationRef.current?.navigate(TabRoutes.Agenda, {
      screen: AgendaStackRoutes.Agenda,
    });
  }, [navigation, parentNav]);

  const openSession = useCallback(
    (sessionId: string) => {
      if (hasRoute(navigation, SharedRoutes.SessionDetail)) {
        navigation.navigate(SharedRoutes.SessionDetail, { sessionId });
        return;
      }
      if (parentNav) {
        parentNav.navigate(TabRoutes.Schedule, {
          screen: SharedRoutes.SessionDetail,
          params: { sessionId },
        });
        return;
      }
      navigationRef.current?.navigate(TabRoutes.Schedule, {
        screen: SharedRoutes.SessionDetail,
        params: { sessionId },
      });
    },
    [navigation, parentNav],
  );

  const openSpeaker = useCallback(
    (speakerId: string) => {
      if (hasRoute(navigation, SharedRoutes.SpeakerDetail)) {
        navigation.navigate(SharedRoutes.SpeakerDetail, { speakerId });
        return;
      }
      if (parentNav) {
        parentNav.navigate(TabRoutes.Speakers, {
          screen: SharedRoutes.SpeakerDetail,
          params: { speakerId },
        });
        return;
      }
      navigationRef.current?.navigate(TabRoutes.Speakers, {
        screen: SharedRoutes.SpeakerDetail,
        params: { speakerId },
      });
    },
    [navigation, parentNav],
  );

  const openNotificationsList = useCallback(() => {
    if (hasRoute(navigation, SettingsStackRoutes.NotificationsList)) {
      navigation.navigate(SettingsStackRoutes.NotificationsList);
      return;
    }
    if (parentNav) {
      parentNav.navigate(TabRoutes.Settings, {
        screen: SettingsStackRoutes.NotificationsList,
      });
      return;
    }
    navigationRef.current?.navigate(TabRoutes.Settings, {
      screen: SettingsStackRoutes.NotificationsList,
    });
  }, [navigation, parentNav]);

  const openCoC = useCallback(() => {
    try {
      navigation.navigate(HomeStackRoutes.CoC);
      return;
    } catch {}
    if (parentNav) {
      parentNav.navigate(TabRoutes.Home, {
        screen: HomeStackRoutes.CoC,
      });
      return;
    }
    navigationRef.current?.navigate(TabRoutes.Home, { screen: HomeStackRoutes.CoC });
  }, [navigation, parentNav]);

  const openCoCContacts = useCallback(() => {
    try {
      navigation.navigate(HomeStackRoutes.CoCContacts);
      return;
    } catch {}
    if (parentNav) {
      parentNav.navigate(TabRoutes.Home, {
        screen: HomeStackRoutes.CoCContacts,
      });
      return;
    }
    navigationRef.current?.navigate(TabRoutes.Home, {
      screen: HomeStackRoutes.CoCContacts,
    });
  }, [navigation, parentNav]);

  return {
    navigation,
    goToScheduleTab,
    goToSpeakersTab,
    goToHomeTab,
    goToSettingsTab,
    goToAgendaTab,
    openSession,
    openSpeaker,
    openNotificationsList,
    openCoC,
    openCoCContacts,
  };
}

export default useAppNavigation;
