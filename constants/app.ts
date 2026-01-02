/**
 * Application-wide constants
 */

export const APP_COLORS = {
  background: {
    torchOn: '#1F1A18',
    torchOff: '#1E1E1E',
    settingsButton: '#332D2B',
  },
  switch: {
    trackColor: {
      false: '#767577',
      true: '#4A9EFF',
    },
    thumbColor: {
      active: '#FFD700',
      inactive: '#f4f3f4',
    },
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#9BA1A6',
  },
} as const;

export const CAMERA_CONFIG = {
  hiddenCamera: {
    width: 1,
    height: 1,
    opacity: 0,
  },
} as const;

export const LIGHTBULB_SIZE = {
  width: 320,
  height: 320,
} as const;

