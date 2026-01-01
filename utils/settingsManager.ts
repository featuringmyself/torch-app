import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = "@torch_app_settings";


export type Settings = {
    torchEnabled: boolean;
    hapticsEnabled?: boolean;
}

const DEFAULT_SETTINGS: Settings = {
    torchEnabled: true,
    hapticsEnabled: true,
}

export const getSettings = async () => {
    try {
        const settings = await AsyncStorage.getItem(SETTINGS_KEY);
        return settings ? JSON.parse(settings) : DEFAULT_SETTINGS;
    } catch (error) {
        console.error("Error getting settings:", error);
        return DEFAULT_SETTINGS;
    }
}

export const updateSettings = async(key: keyof Settings, value: Settings[keyof Settings]) => {
    try {
        const currentSettings = await getSettings();
        const updatedSettings: Settings = { ...currentSettings, [key]: value };
            await saveSettings(updatedSettings);
            return updatedSettings;
    } catch (error) {
        console.error("Error updating settings:", error);
        return DEFAULT_SETTINGS;
    }
}

export const saveSettings = async(settings: Settings) => {
    try {
        await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        return true;
    } catch (error) {
        console.error("Error saving settings:", error);
        return false;
    }
}

export const resetSettings = async() => {
    try {
        await saveSettings(DEFAULT_SETTINGS);
        return DEFAULT_SETTINGS;
    } catch (error) {
        console.error("Error resetting settings:", error);
        return null;
    }
}