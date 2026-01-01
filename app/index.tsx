import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getSettings, type Settings } from "@/utils/settingsManager";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [torchEnabled, setTorchEnabled] = useState(true);
  const [settings, setSettings] = useState<Settings | null>(null);

  const loadSettings = async () => {
    const savedSettings = await getSettings();
    setSettings(savedSettings);

    if (savedSettings.torchEnabled !== undefined) {
      setTorchEnabled(savedSettings.torchEnabled);
    } else {
      setTorchEnabled(true);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleToggleTorch = async () => {
    setTorchEnabled(!torchEnabled);

    if (settings?.hapticsEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">
          Torch needs camera permission to work
        </ThemedText>
        <Button onPress={requestPermission} title="grant permission" />
      </ThemedView>
    );
  }

  return (
    <View
      style={styles.container}
      className={`${torchEnabled ? "bg-[#1F1A18]" : "bg-[#1E1E1E]"}`}
    >

      <Link href="/settings" asChild className="absolute top-16 left-8 bg-[#332D2B] rounded-2xl p-3">
        <Pressable>
          <Ionicons name="settings" size={28} color="white" />
        </Pressable>
      </Link>
      <View className="h-[50vh] w-1 bg-black absolute top-0 left-1/2 -translate-x-1/2"></View>
      <CameraView
        enableTorch={torchEnabled}
        style={{
          width: 1,
          height: 1,
          position: "absolute",
          opacity: 0,
          zIndex: -1,
        }}
      />
      <Pressable onPress={handleToggleTorch}>
        <Image
          source={
            torchEnabled
              ? require("@/assets/lightBulbOn.png")
              : require("@/assets/lightBulbOff.png")
          }
          className="w-32 h-32"
          contentFit="contain"
          style={{ width: 320, height: 320 }}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  switchContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
