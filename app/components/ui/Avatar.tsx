import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, Text, View } from 'react-native';
import { useColors } from '../../context/ColorSchemeContext';

interface Props {
  uri?: string | null;
  name?: string;
  size?: number;
  onPress?: () => void;
  editable?: boolean;
}

export function Avatar({ uri, name = '', size = 44, onPress, editable = false }: Props) {
  const { colors: C } = useColors();
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const wrap = { width: size, height: size, borderRadius: size / 2, position: 'relative' as const };

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : 'image'}
      accessibilityLabel={editable ? 'Change profile photo' : `${name}'s avatar`}
      style={({ pressed }) => [wrap, pressed && onPress && { opacity: 0.88 }]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: C.border,
          }}
        />
      ) : (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: C.primarySoft,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: size * 0.4, fontWeight: '800', color: C.primary }}>
            {initials || '?'}
          </Text>
        </View>
      )}
      {editable ? (
        <View
          style={{
            position: 'absolute',
            right: -2,
            bottom: -2,
            width: 22,
            height: 22,
            borderRadius: 11,
            backgroundColor: C.accent,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: C.surface,
          }}
        >
          <Ionicons name="camera" size={12} color={C.surface} />
        </View>
      ) : null}
    </Pressable>
  );
}
