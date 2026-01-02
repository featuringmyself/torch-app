import { SettingItem } from '@/components/setting-item';
import { SettingsButton } from '@/components/settings-button';
import { APP_COLORS } from '@/constants/app';
import { useSettings } from '@/hooks/use-settings';
import { type Settings } from '@/utils/settingsManager';
import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen() {
  const { settings, isLoading, updateSetting } = useSettings();

  const handleSettingChange = useCallback(
    async (key: keyof Settings, value: boolean) => {
      if (!settings) return;

      try {
        await updateSetting(key, value);

        // Provide haptic feedback
        // For hapticsEnabled toggle, use the new value; for others, use current haptics setting
        const shouldProvideHaptic =
          key === 'hapticsEnabled' ? value : settings.hapticsEnabled;

        if (shouldProvideHaptic) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      } catch (error) {
        console.error('Failed to save setting:', error);
      }
    },
    [settings, updateSetting]
  );

  const handleTorchToggle = useCallback(
    (value: boolean) => {
      handleSettingChange('torchEnabled', value);
    },
    [handleSettingChange]
  );

  const handleHapticsToggle = useCallback(
    (value: boolean) => {
      handleSettingChange('hapticsEnabled', value);
    },
    [handleSettingChange]
  );

  const handleShakeToggle = useCallback(
    (value: boolean) => {
      handleSettingChange('shakeEnabled', value);
    },
    [handleSettingChange]
  );

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: APP_COLORS.background.torchOff }]}>
        <SettingsButton href="/" iconName="arrow-back" />
        <View style={styles.content}>
          <ActivityIndicator size="large" color={APP_COLORS.text.primary} />
        </View>
      </View>
    );
  }

  if (!settings) {
    return (
      <View style={[styles.container, { backgroundColor: APP_COLORS.background.torchOff }]}>
        <SettingsButton href="/" iconName="arrow-back" />
        <View style={styles.content}>
          <Text className="text-white text-lg">Failed to load settings</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: APP_COLORS.background.torchOff }]}>
      <SettingsButton href="/" iconName="arrow-back" />

      <View style={styles.content}>
        <Text className="text-white text-4xl mb-12 font-medium">Settings</Text>

        <View className="w-full max-w-md gap-4">
          <SettingItem
            title="Torch Enabled"
            description="Control the default flashlight state"
            value={settings.torchEnabled}
            onValueChange={handleTorchToggle}
            trackColor={APP_COLORS.switch.trackColor}
            thumbColor={APP_COLORS.switch.thumbColor}
          />

          <SettingItem
            title="Haptics Enabled"
            description="Enable vibration feedback"
            value={settings.hapticsEnabled}
            onValueChange={handleHapticsToggle}
            trackColor={APP_COLORS.switch.trackColor}
            thumbColor={APP_COLORS.switch.thumbColor}
          />

          <SettingItem
            title="Shake to Toggle"
            description="Enable shake gesture to toggle torch"
            value={settings.shakeEnabled}
            onValueChange={handleShakeToggle}
            trackColor={APP_COLORS.switch.trackColor}
            thumbColor={APP_COLORS.switch.thumbColor}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});
