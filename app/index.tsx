import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getSettings, type Settings } from "@/utils/settingsManager";
import { useCameraPermissions } from "expo-camera";
import * as Haptics from 'expo-haptics';
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [torchEnabled, setTorchEnabled] = useState(true);
  const [settings, setSettings] = useState<Settings | null>(null);

  const loadSettings = async() => {
    const savedSettings = await getSettings();
    setSettings(savedSettings);

    if(savedSettings.torchEnabled !== undefined){
      setTorchEnabled(savedSettings.torchEnabled);
    }else{
      setTorchEnabled(true);
    }
  }

  

  useEffect(() => {
    loadSettings();
  }, []);
  const handleToggleTorch = async() => {
    setTorchEnabled(!torchEnabled);

    if(settings?.hapticsEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }
  }
  if(!permission){
    return <View />
  }

  if(!permission.granted){
    return (
     <ThemedView style={styles.container}>
        <ThemedText type="title">Torch needs camera permission to work</ThemedText>
        <Button onPress={requestPermission} title="grant permission"/>
     </ThemedView>
    )
  }
  
  return (
    // <ThemedView style={styles.container}>
    //   <CameraView enableTorch={torchEnabled} />
    //   <View style={styles.switchContainer}>
    //     <Switch value={torchEnabled}  trackColor={{false: '#767577', true: '#81b0ff'}} thumbColor={torchEnabled ? '#f5dd4b' : '#f4f3f4'} onValueChange={handleToggleTorch} />
    //   </View>
    //   <ThemedText className="antialiased" onPress={handleToggleTorch}>
    //     {torchEnabled ? "Torch On" : "Torch Off"}
    //   </ThemedText>
    // </ThemedView>
    <View style={styles.container}>
      <View className="h-[50vh] w-1 bg-black absolute top-0 left-1/2 -translate-x-1/2"></View>
      <Pressable onPress={handleToggleTorch}>
      <Image source={torchEnabled ? require("@/assets/lightBulbOn.png") : require("@/assets/lightBulbOff.png")} className="w-10 h-10" contentFit="contain" style={{ width: 100, height: 100 }}  />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
  },
  switchContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
