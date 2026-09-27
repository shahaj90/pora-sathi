import { Ionicons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Colors, Radius } from '../../constants/theme';

interface Props {
  title: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  variant?: 'primary' | 'soft' | 'ghost';
  style?: StyleProp<ViewStyle>;
}

/** Shared pill button with pressed + loading states. */
export function Button({
  title,
  onPress,
  icon,
  loading = false,
  variant = 'primary',
  style,
}: Props) {
  const disabled = loading;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'soft' && styles.soft,
        variant === 'ghost' && styles.ghost,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? Colors.surface : Colors.primary}
        />
      ) : (
        <Text
          style={[
            styles.text,
            variant === 'primary' && styles.textPrimary,
            variant !== 'primary' && styles.textSoft,
          ]}
        >
          {title}
        </Text>
      )}
      {!loading && icon ? (
        <Ionicons
          name={icon}
          size={17}
          color={variant === 'primary' ? Colors.surface : Colors.primary}
        />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: Radius.pill,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  primary: { backgroundColor: Colors.primary },
  soft: { backgroundColor: Colors.violetLight },
  ghost: { backgroundColor: 'transparent' },
  pressed: { opacity: 0.86 },
  disabled: { opacity: 0.7 },
  text: { fontSize: 15, fontWeight: '800' },
  textPrimary: { color: Colors.surface },
  textSoft: { color: Colors.primary },
});
