import { PermissionRequest } from '@/components/permission-request';
import { SettingsButton } from '@/components/settings-button';
import { APP_COLORS, CAMERA_CONFIG, LIGHTBULB_SIZE } from '@/constants/app';
import { useSettings } from '@/hooks/use-settings';
import { useShake } from '@/hooks/use-shake';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const { settings, isLoading: settingsLoading, updateSetting } = useSettings();
  const [torchEnabled, setTorchEnabled] = useState(true);

  // Initialize torch state from settings
  useEffect(() => {
    if (settings && !settingsLoading) {
      setTorchEnabled(settings.torchEnabled);
    }
  }, [settings, settingsLoading]);

  const handleToggleTorch = useCallback(async () => {
    const newTorchState = !torchEnabled;
    setTorchEnabled(newTorchState);

    // Save to settings
    try {
      await updateSetting('torchEnabled', newTorchState);
    } catch (error) {
      console.error('Failed to save torch state:', error);
      // Revert state on error
      setTorchEnabled(torchEnabled);
    }

    // Haptic feedback
    if (settings?.hapticsEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    }
  }, [torchEnabled, settings, updateSetting]);

  // Use shake detection to toggle torch (only if enabled in settings)
  useShake(handleToggleTorch, {
    enabled: settings?.shakeEnabled ?? true,
  });

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <PermissionRequest
        message="Torch needs camera permission to work"
        onRequestPermission={requestPermission}
      />
    );
  }

  const backgroundColor = torchEnabled
    ? APP_COLORS.background.torchOn
    : APP_COLORS.background.torchOff;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <SettingsButton href="/settings" iconName="settings" />
      <View className="h-[50vh] w-1 bg-black absolute top-0 left-1/2 -translate-x-1/2" />
      <CameraView
        enableTorch={torchEnabled}
        style={[
          styles.hiddenCamera,
          {
            width: CAMERA_CONFIG.hiddenCamera.width,
            height: CAMERA_CONFIG.hiddenCamera.height,
            opacity: CAMERA_CONFIG.hiddenCamera.opacity,
          },
        ]}
      />
      <Pressable onPress={handleToggleTorch} disabled={settingsLoading}>
        <Image
          source={
            torchEnabled
              ? require('@/assets/lightBulbOn.png')
              : require('@/assets/lightBulbOff.png')
          }
          className="w-32 h-32"
          contentFit="contain"
          style={{
            width: LIGHTBULB_SIZE.width,
            height: LIGHTBULB_SIZE.height,
          }}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenCamera: {
    position: 'absolute',
    zIndex: -1,
  },
});