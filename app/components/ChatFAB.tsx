import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text } from 'react-native';
import { Shadow } from '../constants/theme';
import { useColors } from '../context/ColorSchemeContext';

export function ChatFAB({ onPress }: { onPress: () => void }) {
  const { colors: C } = useColors();
  return (
    <Pressable onPress={onPress} style={wrapStyle} accessibilityLabel="Ask AI tutor">
      <LinearGradient
        colors={[C.primary, C.pink]}
        style={gradStyle}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name="chatbubble-ellipses" size={26} color={C.surface} />
        <Text style={[badgeStyle, { backgroundColor: C.yellow, color: C.text }]}>AI</Text>
      </LinearGradient>
    </Pressable>
  );
}

const wrapStyle = {
  position: 'absolute' as const,
  right: 16,
  bottom: 92,
  ...Shadow.pop,
};

const gradStyle = {
  width: 62,
  height: 62,
  borderRadius: 31,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
};

const badgeStyle = {
  position: 'absolute' as const,
  top: -2,
  right: -2,
  fontSize: 9,
  fontWeight: '900' as const,
  paddingHorizontal: 6,
  paddingVertical: 2,
  borderRadius: 999,
  overflow: 'hidden' as const,
};
