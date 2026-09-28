import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { useColors } from '../../context/ColorSchemeContext';
import { Button } from './Button';

interface Props {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  actionTitle?: string;
  onAction?: () => void;
}

/** Shared empty / error state with optional retry action. */
export function EmptyState({
  icon = 'cloud-offline-outline',
  title,
  subtitle,
  actionTitle,
  onAction,
}: Props) {
  const { colors: C } = useColors();
  return (
    <View style={{ alignItems: 'center', paddingHorizontal: 32, paddingVertical: 24, gap: 6 }}>
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: C.primarySoft,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 6,
        }}
      >
        <Ionicons name={icon} size={30} color={C.primary} />
      </View>
      <Text style={{ fontSize: 16, fontWeight: '800', color: C.text, textAlign: 'center' }}>
        {title}
      </Text>
      {subtitle ? (
        <Text style={{ fontSize: 13, color: C.muted, textAlign: 'center', lineHeight: 19 }}>
          {subtitle}
        </Text>
      ) : null}
      {actionTitle && onAction ? (
        <Button title={actionTitle} onPress={onAction} icon="refresh" />
      ) : null}
    </View>
  );
}
