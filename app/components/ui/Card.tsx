import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import { Colors, Radius, Shadow } from '../../constants/theme';

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  elevated?: boolean;
  padding?: number;
  radius?: number;
  onPress?: () => void;
  accessibilityLabel?: string;
}

/** Shared surface: white card with soft shadow and theme radius.
 *  Renders a Pressable when `onPress` is provided. */
export function Card({
  children,
  style,
  elevated = true,
  padding = 14,
  radius = Radius.md,
  onPress,
  accessibilityLabel,
}: Props) {
  const cardStyle = [
    styles.base,
    elevated && Shadow.card,
    { padding, borderRadius: radius },
    style,
  ];
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        style={({ pressed }) => [cardStyle, pressed && { opacity: 0.94 }]}
      >
        {children}
      </Pressable>
    );
  }
  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
