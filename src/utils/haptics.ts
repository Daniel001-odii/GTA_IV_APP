import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

export function triggerSelectionHaptic() {
  if (Platform.OS === 'web') return;
  Haptics.selectionAsync().catch(() => {});
}

export function triggerLightImpact() {
  if (Platform.OS === 'web') return;
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
}

export function triggerImpactHaptic() {
  triggerLightImpact();
}

export function triggerSuccessHaptic() {
  if (Platform.OS === 'web') return;
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
}
