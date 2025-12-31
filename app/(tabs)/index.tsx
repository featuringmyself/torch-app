import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";

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
      <ThemedText type="title" onPress={() => setTorchEnabled(!torchEnabled)}>
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
