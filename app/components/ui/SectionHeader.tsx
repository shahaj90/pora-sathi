import { Pressable, Text, View } from 'react-native';
import { useColors } from '../../context/ColorSchemeContext';

interface Props {
  title: string;
  bangla?: string;
  action?: string;
  onAction?: () => void;
}

/** Shared section heading with optional trailing link. */
export function SectionHeader({ title, bangla, action, onAction }: Props) {
  const { colors: C } = useColors();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        marginTop: 22,
        marginBottom: 12,
      }}
    >
      <View>
        <Text style={{ fontSize: 17, fontWeight: '800', color: C.text }}>{title}</Text>
        {bangla ? (
          <Text style={{ fontSize: 12, color: C.textSecondary, marginTop: 2 }}>{bangla}</Text>
        ) : null}
      </View>
      {action ? (
        <Pressable onPress={onAction} accessibilityRole="button" hitSlop={8}>
          <Text style={{ fontSize: 13, fontWeight: '700', color: C.accent }}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
