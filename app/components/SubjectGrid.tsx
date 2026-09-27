import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import type { Subject } from '../constants/data';
import { Radius } from '../constants/theme';

export function SubjectGrid({
  subjects,
  onOpen,
}: {
  subjects: Subject[];
  onOpen: (s: Subject) => void;
}) {
  const { width } = useWindowDimensions();
  const gap = 12;
  const padding = 32; // 16 * 2
  const cardWidth = (width - padding - gap) / 2;

  return (
    <View style={styles.grid}>
      {subjects.map((s) => (
        <Pressable
          key={s.id}
          onPress={() => onOpen(s)}
          style={({ pressed }) => [
            styles.cardWrap,
            { width: cardWidth, opacity: pressed ? 0.92 : 1 },
          ]}
        >
          <LinearGradient
            colors={s.color}
            style={styles.card}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.iconRow}>
              <View style={styles.iconBubble}>
                <Ionicons name={s.icon as any} size={20} color="#fff" />
              </View>
              <Text style={styles.bangla}>{s.bangla}</Text>
            </View>
            <Text style={styles.name}>{s.name}</Text>
            <Text style={styles.meta}>
              {s.chapters} chapters · {s.notesCount} PDFs
            </Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${Math.round(s.progress * 100)}%` }]} />
            </View>
            <Text style={styles.progressText}>{Math.round(s.progress * 100)}% done</Text>
          </LinearGradient>
        </Pressable>
      ))}
      {/* SSC prep wide card */}
      <LinearGradient
        colors={['#191A2E', '#4B21B8']}
        style={[styles.sscCard, { width: width - 32 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View>
          <Text style={styles.sscTag}>SSC 2027 · 214 DAYS LEFT</Text>
          <Text style={styles.sscTitle}>SSC Crash Course + Model Tests</Text>
          <Text style={styles.sscSub}>All subjects · 12 model tests · AI evaluation</Text>
        </View>
        <View style={styles.sscBtn}>
          <Text style={styles.sscBtnText}>Resume</Text>
          <Ionicons name="arrow-forward" size={16} color="#191A2E" />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  cardWrap: { borderRadius: Radius.lg },
  card: {
    borderRadius: Radius.lg,
    padding: 14,
    minHeight: 158,
    justifyContent: 'space-between',
  },
  iconRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  iconBubble: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bangla: { color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: '600' },
  name: { color: '#fff', fontSize: 16, fontWeight: '800', marginTop: 12 },
  meta: { color: 'rgba(255,255,255,0.85)', fontSize: 11, marginTop: 2 },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: { height: 6, borderRadius: 3, backgroundColor: '#fff' },
  progressText: { color: '#fff', fontSize: 11, fontWeight: '700', marginTop: 6 },
  sscCard: {
    borderRadius: Radius.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  sscTag: { color: '#FFC531', fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  sscTitle: { color: '#fff', fontSize: 16, fontWeight: '800', marginTop: 4 },
  sscSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4 },
  sscBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  sscBtnText: { fontWeight: '800', fontSize: 13, color: '#191A2E' },
});
