import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, Text, TextInput, View, type TextInputProps } from 'react-native';
import { Radius } from '../../constants/theme';
import { useColors } from '../../context/ColorSchemeContext';

interface Props extends TextInputProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  /** When true, renders a show/hide eye toggle (only for password fields). */
  secureTextEntry?: boolean;
}

/**
 * Reusable form row with label, optional icon, show/hide password toggle, and error text.
 * Merged from the old AuthField + FormField components — now just FormField with `secureTextEntry`.
 */
export function FormField({ label, icon, error, secureTextEntry, ...rest }: Props) {
  const { colors: C } = useColors();
  const [hidden, setHidden] = useState(secureTextEntry ?? false);

  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ fontSize: 13, fontWeight: '700', color: C.text, marginBottom: 6 }}>
        {label}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          backgroundColor: C.background,
          borderWidth: 1,
          borderColor: error ? C.danger : C.border,
          borderRadius: Radius.md,
          paddingHorizontal: 14,
          minHeight: 52,
        }}
      >
        {icon ? <Ionicons name={icon} size={18} color={C.textSecondary} /> : null}
        <TextInput
          {...rest}
          placeholderTextColor={C.muted}
          style={[
            {
              flex: 1,
              fontSize: 15,
              color: C.text,
              paddingVertical: 14,
            },
            rest.style,
          ]}
          accessibilityLabel={label}
          autoCorrect={false}
          secureTextEntry={hidden}
        />
        {secureTextEntry ? (
          <Pressable onPress={() => setHidden((h) => !h)} hitSlop={8}>
            <Ionicons name={hidden ? 'eye-outline' : 'eye-off-outline'} size={18} color={C.muted} />
          </Pressable>
        ) : null}
      </View>
      {error ? (
        <Text style={{ fontSize: 12, color: C.danger, marginTop: 4, fontWeight: '600' }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}
