import { Accelerometer, AccelerometerMeasurement } from 'expo-sensors';
import { Subscription } from 'expo-sensors/build/Pedometer';
import { useEffect, useRef } from 'react';

const DEFAULT_SHAKE_THRESHOLD = 800;
const SHAKE_DELAY_MS = 500;
const ACCELEROMETER_UPDATE_INTERVAL_MS = 500;

interface UseShakeOptions {
  threshold?: number;
  delay?: number;
  updateInterval?: number;
  enabled?: boolean;
}

/**
 * Custom hook to detect device shake gestures
 * @param onShake - Callback function to execute when shake is detected
 * @param options - Configuration options for shake detection
 */
export function useShake(
  onShake: () => void,
  options: UseShakeOptions = {}
): void {
  const {
    threshold = DEFAULT_SHAKE_THRESHOLD,
    delay = SHAKE_DELAY_MS,
    updateInterval = ACCELEROMETER_UPDATE_INTERVAL_MS,
    enabled = true,
  } = options;

  const onShakeRef = useRef(onShake);
  const lastShakeTimeRef = useRef(0);

  // Keep callback ref up to date
  useEffect(() => {
    onShakeRef.current = onShake;
  }, [onShake]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let subscription: Subscription | undefined;

    Accelerometer.setUpdateInterval(updateInterval);

    const handleAccelerometerData = ({ x, y, z }: AccelerometerMeasurement) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      const accelerationChange = Math.abs(acceleration - 1);
      const now = Date.now();

      if (
        accelerationChange > threshold / 1000 &&
        now - lastShakeTimeRef.current > delay
      ) {
        lastShakeTimeRef.current = now;
        onShakeRef.current();
      }
    };

    subscription = Accelerometer.addListener(handleAccelerometerData);

    return () => {
      subscription?.remove();
    };
  }, [threshold, delay, updateInterval, enabled]);
}

