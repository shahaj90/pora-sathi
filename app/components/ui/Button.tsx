import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, Text, type StyleProp, type ViewStyle } from 'react-native';
import { Radius } from '../../constants/theme';
import { useColors } from '../../context/ColorSchemeContext';

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
  const { colors: C } = useColors();
  const disabled = loading;

  const baseStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: Radius.pill,
    paddingVertical: 14,
    paddingHorizontal: 20,
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        baseStyle,
        variant === 'primary' && { backgroundColor: C.primary },
        variant === 'soft' && { backgroundColor: C.primarySoft },
        variant === 'ghost' && { backgroundColor: 'transparent' },
        pressed && !disabled && { opacity: 0.86 },
        disabled && { opacity: 0.7 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'primary' ? C.surface : C.primary} />
      ) : (
        <Text
          style={{
            fontSize: 15,
            fontWeight: '800',
            color: variant === 'primary' ? C.surface : C.primary,
          }}
        >
          {title}
        </Text>
      )}
      {!loading && icon ? (
        <Ionicons name={icon} size={17} color={variant === 'primary' ? C.surface : C.primary} />
      ) : null}
    </Pressable>
  );
}
