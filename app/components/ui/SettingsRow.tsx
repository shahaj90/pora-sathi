import { Ionicons } from '@expo/vector-icons';
import { Pressable, Switch, Text, View } from 'react-native';
import { Radius } from '../../constants/theme';
import { useColors } from '../../context/ColorSchemeContext';

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
  const { colors: C } = useColors();

  const wrapStyle = {
    backgroundColor: C.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
  };

  const content = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      {icon ? (
        <View
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            backgroundColor: C.primarySoft,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name={icon} size={18} color={C.primary} />
        </View>
      ) : null}
      <Text style={{ flex: 1, fontSize: 14, fontWeight: '700', color: C.text }}>{label}</Text>
      {onToggle ? (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: C.border, true: C.primary }}
        />
      ) : null}
      {chevron ? <Ionicons name="chevron-forward" size={18} color={C.textSecondary} /> : null}
    </View>
  );

  if (onPress || chevron) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [wrapStyle, pressed && { opacity: 0.85 }]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={wrapStyle}>{content}</View>;
}
