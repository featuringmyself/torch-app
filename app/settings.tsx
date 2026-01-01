
import { getSettings, saveSettings, type Settings } from '@/utils/settingsManager';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

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
    
    if (settings?.hapticsEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }

  return (
    <View style={styles.container} className="bg-[#1E1E1E]">
      <Link href="/" asChild className="absolute top-16 left-8 bg-[#332D2B] rounded-2xl p-3">
        <Pressable>
          <Ionicons name="arrow-back" size={28} color="white" />
        </Pressable>
      </Link>

      <View style={styles.content}>
        <Text className="text-white text-4xl mb-12 font-medium">
          Settings
        </Text>

        <View className="w-full max-w-md gap-4">
          <View className="bg-[#332D2B] rounded-2xl p-6">
            <View className="flex flex-row justify-between items-center">
              <View className="flex-1 mr-4">
                <Text className="text-white text-lg font-semibold mb-1">
                  Torch Enabled
                </Text>
                <Text className="text-gray-400 text-sm">
                  Control the default flashlight state
                </Text>
              </View>
              <Switch 
                value={settings?.torchEnabled ?? true}  
                trackColor={{false: '#767577', true: '#4A9EFF'}} 
                thumbColor={settings?.torchEnabled ? '#FFD700' : '#f4f3f4'} 
                onValueChange={() => settingsHandler('torchEnabled', !settings?.torchEnabled)} 
              />
            </View>
          </View>

          <View className="bg-[#332D2B] rounded-2xl p-6">
            <View className="flex flex-row justify-between items-center">
              <View className="flex-1 mr-4">
                <Text className="text-white text-lg font-semibold mb-1">
                  Haptics Enabled
                </Text>
                <Text className="text-gray-400 text-sm">
                  Enable vibration feedback
                </Text>
              </View>
              <Switch 
                value={settings?.hapticsEnabled ?? false}  
                trackColor={{false: '#767577', true: '#4A9EFF'}} 
                thumbColor={settings?.hapticsEnabled ? '#FFD700' : '#f4f3f4'} 
                onValueChange={() => settingsHandler('hapticsEnabled', !settings?.hapticsEnabled)} 
              />
            </View>
          </View>
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
