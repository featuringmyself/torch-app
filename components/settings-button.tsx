import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';

interface SettingsButtonProps {
  href: string;
  iconName: keyof typeof Ionicons.glyphMap;
  position?: 'top-left' | 'top-right';
}

/**
 * Reusable settings/back button component
 */
export function SettingsButton({
  href,
  iconName,
  position = 'top-left',
}: SettingsButtonProps) {
  const positionClasses =
    position === 'top-left' ? 'absolute top-16 left-8' : 'absolute top-16 right-8';

  return (
    <Link href={href} asChild className={`${positionClasses} bg-[#332D2B] rounded-2xl p-3`}>
      <Pressable>
        <Ionicons name={iconName} size={28} color="white" />
      </Pressable>
    </Link>
  );
}

