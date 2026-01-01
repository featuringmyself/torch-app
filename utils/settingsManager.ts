import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = "@torch_app_settings";


const DEFAULT_SETTINGS = {
    torchEnabled: true,
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

export const updateSettings = async(key: keyof typeof DEFAULT_SETTINGS, value: typeof DEFAULT_SETTINGS[keyof typeof DEFAULT_SETTINGS]) => {
    try {
        const currentSettings = await getSettings();
        const updatedSettings: typeof DEFAULT_SETTINGS = { ...currentSettings, [key]: value };
            await saveSettings(updatedSettings);
            return updatedSettings;
    } catch (error) {
        console.error("Error updating settings:", error);
        return DEFAULT_SETTINGS;
    }
}

export const saveSettings = async(settings: typeof DEFAULT_SETTINGS) => {
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