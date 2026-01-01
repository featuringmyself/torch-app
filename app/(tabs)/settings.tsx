import { StyleSheet, Switch } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { getSettings, saveSettings, type Settings } from '@/utils/settingsManager';
import { useEffect, useState } from 'react';

export default function SettingsScreen() {
  const [settings, setSettings] = useState<Settings | null>(null);

  const loadSettings = async() => {
    const savedSettings = await getSettings();
    setSettings(savedSettings);
  }

  useEffect(() => {
    loadSettings();
  }, []);

  const settingsHandler = async (key: keyof Settings, value: Settings[keyof Settings]) => {
    if (!settings) return;
    const updatedSettings = { ...settings, [key]: value } as Settings;
    await saveSettings(updatedSettings);
    setSettings(updatedSettings);
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Settings
        </ThemedText>
      </ThemedView>
      <ThemedView className='flex flex-row flex-1 justify-between items-center'>
        <ThemedText>Torch enabled</ThemedText>
        <Switch value={settings?.torchEnabled}  trackColor={{false: '#767577', true: '#81b0ff'}} thumbColor={settings?.torchEnabled ? '#f5dd4b' : '#f4f3f4'} onValueChange={() => settingsHandler('torchEnabled', !settings?.torchEnabled)} />
      </ThemedView>
      <ThemedView className='flex flex-row flex-1 justify-between items-center'>
        <ThemedText>Haptics enabled</ThemedText>
        <Switch value={settings?.hapticsEnabled}  trackColor={{false: '#767577', true: '#81b0ff'}} thumbColor={settings?.hapticsEnabled ? '#f5dd4b' : '#f4f3f4'} onValueChange={() => settingsHandler('hapticsEnabled', !settings?.hapticsEnabled)} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
