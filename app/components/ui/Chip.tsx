import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text } from 'react-native';
import { Radius } from '../../constants/theme';
import { useColors } from '../../context/ColorSchemeContext';

interface Props {
  label: string;
  selected: boolean;
  onToggle: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  role?: 'checkbox' | 'tab';
  accent?: boolean;
  accessibilityLabel?: string;
}

/** Shared selectable pill — grade tabs, signup classes, filters. */
export function Chip({
  label,
  selected,
  onToggle,
  icon,
  role = 'checkbox',
  accent = false,
  accessibilityLabel,
}: Props) {
  const { colors: C } = useColors();
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole={role}
      accessibilityState={{ checked: selected, selected }}
      accessibilityLabel={accessibilityLabel ?? label}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: Radius.pill,
          backgroundColor: selected ? C.primary : accent ? C.warningSoft : C.surface,
          borderWidth: 1,
          borderColor: selected ? C.primary : accent ? C.warning : C.border,
        },
        pressed && { opacity: 0.88 },
      ]}
    >
      {selected ? <Ionicons name="checkmark" size={14} color={C.surface} /> : null}
      {icon && !selected ? (
        <Ionicons name={icon} size={14} color={accent ? C.warning : C.textSecondary} />
      ) : null}
      <Text
        style={{ fontSize: 13, fontWeight: '700', color: selected ? C.surface : C.textSecondary }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
