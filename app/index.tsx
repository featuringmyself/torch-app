import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getSettings, type Settings } from "@/utils/settingsManager";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from 'expo-haptics';
import { useEffect, useState } from "react";
import { Button, StyleSheet, Switch, View } from "react-native";


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
    <ThemedView style={styles.container}>
      <CameraView enableTorch={torchEnabled} />
      <View style={styles.switchContainer}>
        <Switch value={torchEnabled}  trackColor={{false: '#767577', true: '#81b0ff'}} thumbColor={torchEnabled ? '#f5dd4b' : '#f4f3f4'} onValueChange={handleToggleTorch} />
      </View>
      <ThemedText className="antialiased" onPress={handleToggleTorch}>
        {torchEnabled ? "Torch On" : "Torch Off"}
      </ThemedText>
    </ThemedView>
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
