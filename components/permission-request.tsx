import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Pressable, Text } from 'react-native';

interface PermissionRequestProps {
  message: string;
  onRequestPermission: () => void;
  buttonTitle?: string;
}

/**
 * Reusable component for requesting permissions
 */
export function PermissionRequest({
  message,
  onRequestPermission,
  buttonTitle = 'Grant Permission',
}: PermissionRequestProps) {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type="title" className="flex-row items-center justify-center text-center mb-10">
        {message}
      </ThemedText>
      <Pressable onPress={onRequestPermission} className="bg-blue-500 py-3 px-6 rounded-md">
        <Text className="text-white font-semibold text-xl">{buttonTitle}</Text>
      </Pressable>
    </ThemedView>
  );
}
