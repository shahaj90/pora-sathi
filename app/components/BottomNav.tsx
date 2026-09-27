import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/theme';

const TABS = [
  { id: 'home', icon: 'home', label: 'Home' },
  { id: 'notes', icon: 'document-text', label: 'Notes' },
  { id: 'quiz', icon: 'help-circle', label: 'Quiz' },
  { id: 'progress', icon: 'stats-chart', label: 'Progress' },
] as const;

export function BottomNav({ active, onChange }: { active: string; onChange: (t: string) => void }) {
  return (
    <View style={styles.wrap}>
      {TABS.map((t) => {
        const selected = t.id === active;
        return (
          <Pressable key={t.id} onPress={() => onChange(t.id)} style={styles.tab}>
            <Ionicons
              name={(selected ? t.icon : `${t.icon}-outline`) as any}
              size={22}
              color={selected ? Colors.primary : Colors.muted}
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
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: 22,
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  tab: { flex: 1, alignItems: 'center', gap: 3 },
  label: { fontSize: 11, color: Colors.muted, fontWeight: '600' },
  labelActive: { color: Colors.primary, fontWeight: '800' },
  pill: { width: 20, height: 3, borderRadius: 2, backgroundColor: Colors.primary, marginTop: 2 },
});
