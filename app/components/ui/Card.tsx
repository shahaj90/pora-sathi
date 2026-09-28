import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import { Radius, Shadow } from '../../constants/theme';
import { useColors } from '../../context/ColorSchemeContext';

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
  const { colors: C } = useColors();
  const cardStyle: ViewStyle = {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    padding,
    borderRadius: radius,
    ...(elevated ? Shadow.card : {}),
  };
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        style={({ pressed }) => [cardStyle, pressed && { opacity: 0.94 }, style]}
      >
        {children}
      </Pressable>
    );
  }
  return <View style={[cardStyle, style]}>{children}</View>;
}
