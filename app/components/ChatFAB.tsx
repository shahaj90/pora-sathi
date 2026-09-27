import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors, Shadow } from '../constants/theme';

export function ChatFAB({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.wrap} accessibilityLabel="Ask AI tutor">
      <LinearGradient
        colors={[Colors.primary, Colors.pink]}
        style={styles.grad}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name="chatbubble-ellipses" size={26} color={Colors.surface} />
        <Text style={styles.badge}>AI</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    right: 16,
    bottom: 92,
    ...Shadow.pop,
  },
  grad: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: Colors.yellow,
    color: Colors.text,
    fontSize: 9,
    fontWeight: '900',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: 'hidden',
  },
});
