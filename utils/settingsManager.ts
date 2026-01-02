import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = '@torch_app_settings';

export interface Settings {
  torchEnabled: boolean;
  hapticsEnabled: boolean;
  shakeEnabled: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  torchEnabled: true,
  hapticsEnabled: true,
  shakeEnabled: true,
};

/**
 * Retrieves settings from AsyncStorage or returns default settings
 * @returns Promise resolving to Settings object
 */
export const getSettings = async (): Promise<Settings> => {
  try {
    const settingsJson = await AsyncStorage.getItem(SETTINGS_KEY);
    if (!settingsJson) {
      return DEFAULT_SETTINGS;
    }

    const parsedSettings = JSON.parse(settingsJson) as Partial<Settings>;
    // Merge with defaults to ensure all required fields exist
    return { ...DEFAULT_SETTINGS, ...parsedSettings };
  } catch (error) {
    console.error('Error getting settings:', error);
    return DEFAULT_SETTINGS;
  }
};

/**
 * Updates a specific setting key with a new value
 * @param key - The setting key to update
 * @param value - The new value for the setting
 * @returns Promise resolving to updated Settings object
 */
export const updateSettings = async (
  key: keyof Settings,
  value: Settings[keyof Settings]
): Promise<Settings> => {
  try {
    const currentSettings = await getSettings();
    const updatedSettings: Settings = { ...currentSettings, [key]: value };
    await saveSettings(updatedSettings);
    return updatedSettings;
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};

/**
 * Saves settings to AsyncStorage
 * @param settings - The settings object to save
 * @returns Promise resolving to true if successful, false otherwise
 */
export const saveSettings = async (settings: Settings): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
};

/**
 * Resets settings to default values
 * @returns Promise resolving to default Settings object
 */
export const resetSettings = async (): Promise<Settings> => {
  try {
    await saveSettings(DEFAULT_SETTINGS);
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Error resetting settings:', error);
    throw error;
  }
};