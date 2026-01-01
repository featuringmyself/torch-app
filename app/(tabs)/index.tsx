import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from 'expo-haptics';
import { useState } from "react";
import { Button, StyleSheet, Switch, View } from "react-native";

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [torchEnabled, setTorchEnabled] = useState(false);

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
      <Switch value={torchEnabled}  trackColor={{false: '#767577', true: '#81b0ff'}} thumbColor={torchEnabled ? '#f5dd4b' : '#f4f3f4'} onValueChange={() => setTorchEnabled(!torchEnabled)} />
      <ThemedText className="text-2xl mt-[-6px]" onPress={() => {setTorchEnabled(!torchEnabled); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);}}>
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
});
