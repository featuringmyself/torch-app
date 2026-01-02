import { Switch, Text, View } from 'react-native';

interface SettingItemProps {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  trackColor?: { false: string; true: string };
  thumbColor?: { active: string; inactive: string };
}

/**
 * Reusable setting item component with switch
 */
export function SettingItem({
  title,
  description,
  value,
  onValueChange,
  trackColor = { false: '#767577', true: '#4A9EFF' },
  thumbColor = { active: '#FFD700', inactive: '#f4f3f4' },
}: SettingItemProps) {
  return (
    <View className="bg-[#332D2B] rounded-2xl p-6">
      <View className="flex flex-row justify-between items-center">
        <View className="flex-1 mr-4">
          <Text className="text-white text-lg font-semibold mb-1">{title}</Text>
          <Text className="text-gray-400 text-sm">{description}</Text>
        </View>
        <Switch
          value={value}
          trackColor={trackColor}
          thumbColor={value ? thumbColor.active : thumbColor.inactive}
          onValueChange={onValueChange}
        />
      </View>
    </View>
  );
}

