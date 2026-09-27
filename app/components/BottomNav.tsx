import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/theme';

export type BottomTabId = 'home' | 'notes' | 'quiz' | 'progress';

interface Tab {
  id: BottomTabId;
  icon: keyof typeof Ionicons.glyphMap;
  iconOutline: keyof typeof Ionicons.glyphMap;
  label: string;
}

const TABS: Tab[] = [
  { id: 'home', icon: 'home', iconOutline: 'home-outline', label: 'Home' },
  { id: 'notes', icon: 'document-text', iconOutline: 'document-text-outline', label: 'Notes' },
  { id: 'quiz', icon: 'help-circle', iconOutline: 'help-circle-outline', label: 'Quiz' },
  { id: 'progress', icon: 'stats-chart', iconOutline: 'stats-chart-outline', label: 'Progress' },
];

export function BottomNav({
  active,
  onChange,
}: {
  active: BottomTabId;
  onChange: (t: BottomTabId) => void;
}) {
  return (
    <View style={styles.wrap}>
      {TABS.map((t) => {
        const selected = t.id === active;
        return (
          <Pressable
            key={t.id}
            onPress={() => onChange(t.id)}
            style={styles.tab}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
          >
            <Ionicons
              name={selected ? t.icon : t.iconOutline}
              size={22}
              color={selected ? Colors.primary : Colors.textSecondary}
            />
            <Text style={[styles.label, selected && styles.labelActive]}>{t.label}</Text>
            {selected ? <View style={styles.pill} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: 22,
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  tab: { flex: 1, alignItems: 'center', gap: 3 },
  label: { fontSize: 11, color: Colors.textSecondary, fontWeight: '600' },
  labelActive: { color: Colors.primary, fontWeight: '800' },
  pill: { width: 20, height: 3, borderRadius: 2, backgroundColor: Colors.primary, marginTop: 2 },
});
