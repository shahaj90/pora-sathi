import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import type { Subject } from '../constants/data';
import { Colors, Radius, Shadow } from '../constants/theme';
import { Card } from './ui/Card';
import { ProgressBar } from './ui/ProgressBar';

export function ProgressSection({
  subjects,
  onOpen,
}: {
  subjects: Subject[];
  onOpen: (s: Subject) => void;
}) {
  const overall = subjects.length
    ? Math.round((subjects.reduce((sum, s) => sum + s.progress, 0) / subjects.length) * 100)
    : 0;

  return (
    <View style={styles.wrap}>
      <View style={styles.overall}>
        <Text style={styles.overallValue}>{overall}%</Text>
        <Text style={styles.overallLabel}>Overall syllabus completed</Text>
        <View style={styles.overallBar}>
          <ProgressBar
            value={overall / 100}
            color={Colors.yellow}
            trackColor="rgba(255,255,255,0.2)"
            height={8}
          />
        </View>
      </View>
      {subjects.map((s) => (
        <Card
          key={s.id}
          onPress={() => onOpen(s)}
          accessibilityLabel={`Open ${s.name}, ${Math.round(s.progress * 100)} percent complete`}
          padding={12}
          style={styles.row}
        >
          <View style={[styles.icon, { backgroundColor: `${s.color[0]}1A` }]}>
            <Ionicons name={s.icon} size={20} color={s.color[0]} />
          </View>
          <View style={styles.fill}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{s.name}</Text>
              <Text style={styles.pct}>{Math.round(s.progress * 100)}%</Text>
            </View>
            <View style={styles.bar}>
              <ProgressBar value={s.progress} color={s.color[0]} trackColor={Colors.border} />
            </View>
            <Text style={styles.meta}>
              {s.chapters} chapters · {s.notesCount} PDFs · {s.quizCount} quizzes
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, gap: 10 },
  fill: { flex: 1 },
  overall: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    padding: 16,
    ...Shadow.card,
  },
  overallValue: { color: Colors.surface, fontSize: 28, fontWeight: '900' },
  overallLabel: { color: 'rgba(255,255,255,0.72)', fontSize: 12, marginTop: 2 },
  overallBar: { marginTop: 12 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 14, fontWeight: '800', color: Colors.text },
  pct: { fontSize: 13, fontWeight: '800', color: Colors.accent },
  bar: { marginTop: 8 },
  meta: { fontSize: 11, color: Colors.textSecondary, marginTop: 6 },
});
