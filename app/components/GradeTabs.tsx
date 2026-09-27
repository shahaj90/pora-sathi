import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { type Grade, type GradeId } from '../constants/data';
import { Colors } from '../constants/theme';

interface Props {
  grades: Grade[];
  active: GradeId;
  onChange: (g: GradeId) => void;
}

export function GradeTabs({ grades, active, onChange }: Props) {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {grades.map((g) => {
          const selected = g.id === active;
          const isSSC = g.id === 'ssc';
          return (
            <Pressable
              key={g.id}
              onPress={() => onChange(g.id)}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              style={[
                styles.pill,
                selected && styles.pillActive,
                isSSC && !selected && styles.sscPill,
              ]}
            >
              {isSSC ? (
                <Ionicons name="trophy" size={14} color={selected ? '#fff' : Colors.accent} />
              ) : null}
              <Text style={[styles.pillText, selected && styles.pillTextActive]}>{g.label}</Text>
              {selected ? <View style={styles.dot} /> : null}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 4,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  sscPill: {
    borderColor: '#FFD9B8',
    backgroundColor: '#FFF4E8',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.muted,
  },
  pillTextActive: {
    color: '#fff',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
});

export function SectionHeader({
  title,
  bangla,
  action,
}: {
  title: string;
  bangla?: string;
  action?: string;
}) {
  return (
    <View style={s.wrap}>
      <View>
        <Text style={s.title}>{title}</Text>
        {bangla ? <Text style={s.bangla}>{bangla}</Text> : null}
      </View>
      {action ? <Text style={s.action}>{action}</Text> : null}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  title: { fontSize: 17, fontWeight: '800', color: Colors.text },
  bangla: { fontSize: 12, color: Colors.muted, marginTop: 2 },
  action: { fontSize: 13, fontWeight: '700', color: Colors.primary },
});
