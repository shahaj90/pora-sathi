import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { Colors, Radius } from '../../constants/theme';

interface Props {
  icon?: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: boolean;
  onToggle?: (v: boolean) => void;
  onPress?: () => void;
  chevron?: boolean;
}

/** Reusable settings row: toggle, navigate, or action. */
export function SettingsRow({ icon, label, value, onToggle, onPress, chevron = false }: Props) {
  const content = (
    <View style={styles.row}>
      {icon ? (
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={18} color={Colors.primary} />
        </View>
      ) : null}
      <Text style={styles.label}>{label}</Text>
      {onToggle ? (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: Colors.border, true: Colors.primary }}
        />
      ) : null}
      {chevron ? <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} /> : null}
    </View>
  );

  if (onPress || chevron) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.wrap, pressed && styles.pressed]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={styles.wrap}>{content}</View>;
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  pressed: { opacity: 0.85 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { flex: 1, fontSize: 14, fontWeight: '700', color: Colors.text },
});
