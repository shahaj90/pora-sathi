import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text } from 'react-native';

export function ChatFAB({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.wrap} accessibilityLabel="Ask AI tutor">
      <LinearGradient
        colors={['#6C3CE0', '#FF5C8A']}
        style={styles.grad}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name="chatbubble-ellipses" size={26} color="#fff" />
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
    shadowColor: '#6C3CE0',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
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
    backgroundColor: '#FFC531',
    color: '#191A2E',
    fontSize: 9,
    fontWeight: '900',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: 'hidden',
  },
});
