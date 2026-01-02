import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from 'react-native';

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
      <ThemedText type="title" className="flex-row items-center justify-center text-center">
        {message}
      </ThemedText>
      <Button onPress={onRequestPermission} title={buttonTitle} />
    </ThemedView>
  );
}

