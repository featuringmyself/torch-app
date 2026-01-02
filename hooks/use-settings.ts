import { getSettings, saveSettings, type Settings } from '@/utils/settingsManager';
import { useCallback, useEffect, useState } from 'react';

interface UseSettingsReturn {
  settings: Settings | null;
  isLoading: boolean;
  error: Error | null;
  updateSetting: <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => Promise<void>;
  reloadSettings: () => Promise<void>;
}

/**
 * Custom hook for managing app settings
 * @returns Settings state, loading state, error state, and update function
 */
export function useSettings(): UseSettingsReturn {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const savedSettings = await getSettings();
      setSettings(savedSettings);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to load settings');
      setError(error);
      console.error('Failed to load settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateSetting = useCallback(
    async <K extends keyof Settings>(key: K, value: Settings[K]) => {
      if (!settings) {
        throw new Error('Settings not loaded');
      }

      const updatedSettings = { ...settings, [key]: value } as Settings;

      try {
        const success = await saveSettings(updatedSettings);
        if (!success) {
          throw new Error('Failed to save settings');
        }
        setSettings(updatedSettings);
        setError(null);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to update setting');
        setError(error);
        console.error('Failed to update setting:', error);
        throw error;
      }
    },
    [settings]
  );

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  return {
    settings,
    isLoading,
    error,
    updateSetting,
    reloadSettings: loadSettings,
  };
}

