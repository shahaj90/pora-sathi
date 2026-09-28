import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/theme';

interface Props {
  uri?: string | null;
  name?: string;
  size?: number;
  onPress?: () => void;
  editable?: boolean;
}

export function Avatar({ uri, name = '', size = 44, onPress, editable = false }: Props) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const wrap = { width: size, height: size, borderRadius: size / 2, position: 'relative' as const };
  const image = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: Colors.border,
  };
  const fallback = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };
  const initialsStyle = { fontSize: size * 0.4, fontWeight: '800' as const, color: Colors.primary };

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : 'image'}
      accessibilityLabel={editable ? 'Change profile photo' : `${name}'s avatar`}
      style={({ pressed }) => [wrap, pressed && onPress && styles.pressed]}
    >
      {uri ? (
        <Image source={{ uri }} style={image} />
      ) : (
        <View style={fallback}>
          <Text style={initialsStyle}>{initials || '?'}</Text>
        </View>
      )}
      {editable ? (
        <View style={styles.badge}>
          <Ionicons name="camera" size={12} color={Colors.surface} />
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.88 },
  badge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.surface,
  },
});
