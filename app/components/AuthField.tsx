import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors, Radius } from '../constants/theme';

interface Props {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder: string;
  icon: keyof typeof Ionicons.glyphMap;
  error?: string;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secure?: boolean;
}

export function AuthField({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  error,
  keyboardType = 'default',
  autoCapitalize = 'none',
  secure = false,
}: Props) {
  const [hidden, setHidden] = useState(secure);

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputRow, error ? styles.inputError : null]}>
        <Ionicons name={icon} size={18} color={Colors.muted} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.muted}
          accessibilityLabel={label}
          style={styles.input}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          secureTextEntry={hidden}
        />
        {secure ? (
          <Pressable onPress={() => setHidden((h) => !h)} hitSlop={8}>
            <Ionicons
              name={hidden ? 'eye-outline' : 'eye-off-outline'}
              size={18}
              color={Colors.muted}
            />
          </Pressable>
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '700', color: Colors.text, marginBottom: 6 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    paddingVertical: 4,
    minHeight: 52,
  },
  inputError: { borderColor: Colors.danger },
  input: { flex: 1, fontSize: 15, color: Colors.text, paddingVertical: 10 },
  error: { fontSize: 12, color: Colors.danger, marginTop: 4, fontWeight: '600' },
});
