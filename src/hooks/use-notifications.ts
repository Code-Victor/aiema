import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useStore } from "@/store";
import { Href, router } from "expo-router";
import { z } from "zod";

const DEFAULT_NOTIFICATION_BEHAVIOUR: Notifications.NotificationBehavior = {
  shouldShowAlert: true,
  shouldPlaySound: false,
  shouldSetBadge: false,
};
const notificationDataSchema = z.object({
  url: z.string(),
});

/**
 * initialize notifications with DEFAULT behaviour that can be extended
 *
 * @param {Object} data - customize notification behaviour
 */
export function initializeNotifications(
  notificationBehaviour?: Notifications.NotificationBehavior
) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      ...DEFAULT_NOTIFICATION_BEHAVIOUR,
      ...notificationBehaviour,
    }),
  });
}

/**
 * Setup notifications to get pushToken and add notification listeners.
 *
 */
export default function useNotifications(config?: {
  onNotificationReceived?: (notification: Notifications.Notification) => void;
  onNotificationResponseReceived?: (
    notification: Notifications.NotificationResponse
  ) => void;
}) {
  const { onNotificationReceived, onNotificationResponseReceived } =
    config ?? {};
  const [expoPushToken, setExpoPushToken] = useStore((state) => [
    state.expoPushToken,
    state.setExpoPushToken,
  ]);
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    []
  );
  // should be handled individaully every hook call.
  //   const [notification, setNotification] = useState<
  //     Notifications.Notification | undefined
  //   >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  useEffect(() => {
    let isMounted = true;

    async function setupNotifications() {
      const token = await registerForPushNotificationsAsync();
      if (token && isMounted) setExpoPushToken(token);

      if (Platform.OS === "android") {
        const androidChannels =
          await Notifications.getNotificationChannelsAsync();
        if (isMounted) setChannels(androidChannels ?? []);
      }

      if (onNotificationReceived)
        notificationListener.current =
          Notifications.addNotificationReceivedListener(onNotificationReceived);

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          if (onNotificationResponseReceived) {
            onNotificationResponseReceived(response);
          }
          handleNotificationResponse(response.notification);
        });

      // Check for the last notification response
      const lastNotificationResponse =
        await Notifications.getLastNotificationResponseAsync();
      if (lastNotificationResponse?.notification) {
        handleNotificationResponse(lastNotificationResponse.notification);
      }
    }

    setupNotifications();

    return () => {
      isMounted = false;
      if (notificationListener.current)
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      if (responseListener.current)
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return {
    expoPushToken,
    channels,
  };
}
function handleNotificationResponse(notification: Notifications.Notification) {
  try {
    if (!notification.request.content.data) return;
    const data = notificationDataSchema.safeParse(
      notification.request.content.data
    );
    if (!data.success) {
      return;
    }
    console.log("Latest Notification Date: ", data.data);
    router.push(data.data.url as Href);
  } catch (error) {
    console.error("Error parsing notification data:", error);
  }
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error("Project ID not found");
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
