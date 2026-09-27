import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors, Radius } from '../../constants/theme';

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
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole={role}
      accessibilityState={{ checked: selected, selected }}
      accessibilityLabel={accessibilityLabel ?? label}
      style={({ pressed }) => [
        styles.base,
        accent && !selected && styles.accent,
        selected && styles.selected,
        pressed && styles.pressed,
      ]}
    >
      {selected ? <Ionicons name="checkmark" size={14} color={Colors.surface} /> : null}
      {icon && !selected ? (
        <Ionicons name={icon} size={14} color={accent ? Colors.accent : Colors.muted} />
      ) : null}
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selected: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  accent: { borderColor: Colors.accentBorder, backgroundColor: Colors.accentSoft },
  pressed: { opacity: 0.88 },
  text: { fontSize: 13, fontWeight: '700', color: Colors.muted },
  textSelected: { color: Colors.surface },
});
