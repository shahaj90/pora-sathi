import { StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/theme';

interface Props {
  value: number; // 0-1
  color?: string;
  trackColor?: string;
  height?: number;
}

/** Shared progress bar. */
export function ProgressBar({ value, color = Colors.primary, trackColor, height = 6 }: Props) {
  const pct = Math.max(0, Math.min(1, value));
  return (
    <View
      style={[
        styles.track,
        { height, borderRadius: height / 2, backgroundColor: trackColor ?? `${color}26` },
      ]}
    >
      <View
        style={[
          styles.fill,
          { width: `${Math.round(pct * 100)}%`, backgroundColor: color, borderRadius: height / 2 },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { overflow: 'hidden' },
  fill: { height: '100%' },
});
