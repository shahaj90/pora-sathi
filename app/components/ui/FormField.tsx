import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { Colors, Radius } from '../../constants/theme';

interface Props extends TextInputProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
}

/** Reusable form row with label, optional icon, and error text. */
export function FormField({ label, icon, error, ...rest }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.row, error ? styles.errorBorder : null]}>
        {icon ? <Ionicons name={icon} size={18} color={Colors.textSecondary} /> : null}
        <TextInput
          {...rest}
          placeholderTextColor={Colors.muted}
          style={[styles.input, rest.style]}
          accessibilityLabel={label}
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '700', color: Colors.text, marginBottom: 6 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    minHeight: 52,
  },
  errorBorder: { borderColor: Colors.danger },
  input: { flex: 1, fontSize: 15, color: Colors.text, paddingVertical: 14 },
  error: { fontSize: 12, color: Colors.danger, marginTop: 4, fontWeight: '600' },
});
