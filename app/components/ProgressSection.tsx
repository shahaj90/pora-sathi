import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import type { Subject } from '../constants/data';
import { Radius, Shadow } from '../constants/theme';
import { useColors } from '../context/ColorSchemeContext';
import { Card } from './ui/Card';
import { ProgressBar } from './ui/ProgressBar';

export function ProgressSection({
  subjects,
  onOpen,
}: {
  subjects: Subject[];
  onOpen: (s: Subject) => void;
}) {
  const { colors: C } = useColors();
  const overall = subjects.length
    ? Math.round((subjects.reduce((sum, s) => sum + s.progress, 0) / subjects.length) * 100)
    : 0;

  const s = makeStyles(C);

  return (
    <View style={s.wrap}>
      <View style={s.overall}>
        <Text style={s.overallValue}>{overall}%</Text>
        <Text style={s.overallLabel}>Overall syllabus completed</Text>
        <View style={s.overallBar}>
          <ProgressBar
            value={overall / 100}
            color={C.yellow}
            trackColor="rgba(255,255,255,0.2)"
            height={8}
          />
        </View>
      </View>
      {subjects.map((sbj) => (
        <Card
          key={sbj.id}
          onPress={() => onOpen(sbj)}
          accessibilityLabel={`Open ${sbj.name}, ${Math.round(sbj.progress * 100)} percent complete`}
          padding={12}
          style={s.row}
        >
          <View style={[s.icon, { backgroundColor: `${sbj.color[0]}1A` }]}>
            <Ionicons name={sbj.icon} size={20} color={sbj.color[0]} />
          </View>
          <View style={s.fill}>
            <View style={s.nameRow}>
              <Text style={s.name}>{sbj.name}</Text>
              <Text style={s.pct}>{Math.round(sbj.progress * 100)}%</Text>
            </View>
            <View style={s.bar}>
              <ProgressBar value={sbj.progress} color={sbj.color[0]} trackColor={C.border} />
            </View>
            <Text style={s.meta}>
              {sbj.chapterCount} chapters · {sbj.booksCount} book · {sbj.quizCount} quizzes
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={C.textSecondary} />
        </Card>
      ))}
    </View>
  );
}

const makeStyles = (C: ReturnType<typeof useColors>['colors']) =>
  StyleSheet.create({
    wrap: { paddingHorizontal: 16, gap: 10 },
    fill: { flex: 1 },
    overall: {
      backgroundColor: C.primary,
      borderRadius: Radius.lg,
      padding: 16,
      ...Shadow.card,
    },
    overallValue: { color: C.surface, fontSize: 28, fontWeight: '900' },
    overallLabel: { color: 'rgba(255,255,255,0.72)', fontSize: 12, marginTop: 2 },
    overallBar: { marginTop: 12 },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    icon: {
      width: 44,
      height: 44,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    name: { fontSize: 14, fontWeight: '800', color: C.text },
    pct: { fontSize: 13, fontWeight: '800', color: C.accent },
    bar: { marginTop: 8 },
    meta: { fontSize: 11, color: C.textSecondary, marginTop: 6 },
  });
