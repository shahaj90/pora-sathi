import { View } from 'react-native';
import { useColors } from '../../context/ColorSchemeContext';

interface Props {
  value: number; // 0-1
  color?: string;
  trackColor?: string;
  height?: number;
}

/** Shared progress bar. */
export function ProgressBar({ value, color, trackColor, height = 6 }: Props) {
  const { colors: C } = useColors();
  const fillColor = color ?? C.accent;
  const pct = Math.max(0, Math.min(1, value));
  return (
    <View
      style={{
        height,
        borderRadius: height / 2,
        backgroundColor: trackColor ?? C.surfaceAlt,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          width: `${Math.round(pct * 100)}%`,
          backgroundColor: fillColor,
          borderRadius: height / 2,
          height: '100%',
        }}
      />
    </View>
  );
}
