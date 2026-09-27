import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import type { SscBanner, Subject } from '../constants/data';
import { Colors, Radius, Shadow } from '../constants/theme';
import { ProgressBar } from './ui/ProgressBar';

export function SubjectGrid({
  subjects,
  banner,
  onOpen,
  onResumeSsc,
}: {
  subjects: Subject[];
  banner: SscBanner;
  onOpen: (s: Subject) => void;
  onResumeSsc: () => void;
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
                <Ionicons name={s.icon} size={20} color={Colors.surface} />
              </View>
              <Text style={styles.bangla}>{s.bangla}</Text>
            </View>
            <Text style={styles.name}>{s.name}</Text>
            <Text style={styles.meta}>
              {s.chapters} chapters · {s.notesCount} PDFs
            </Text>
            <View style={styles.progressWrap}>
              <ProgressBar
                value={s.progress}
                color={Colors.surface}
                trackColor="rgba(255,255,255,0.3)"
              />
            </View>
            <Text style={styles.progressText}>{Math.round(s.progress * 100)}% done</Text>
          </LinearGradient>
        </Pressable>
      ))}
      {/* SSC prep wide card */}
      <Pressable
        onPress={onResumeSsc}
        accessibilityRole="button"
        accessibilityLabel="Resume SSC crash course"
        style={({ pressed }) => [{ width: width - 32, opacity: pressed ? 0.92 : 1 }]}
      >
        <LinearGradient
          colors={[Colors.text, Colors.primaryDark]}
          style={styles.sscCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.fill}>
            <Text style={styles.sscTag}>{banner.tag}</Text>
            <Text style={styles.sscTitle}>{banner.title}</Text>
            <Text style={styles.sscSub}>{banner.subtitle}</Text>
          </View>
          <View style={styles.sscBtn}>
            <Text style={styles.sscBtnText}>{banner.action}</Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.text} />
          </View>
        </LinearGradient>
      </Pressable>
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
  fill: { flex: 1 },
  card: {
    borderRadius: Radius.lg,
    padding: 14,
    minHeight: 158,
    justifyContent: 'space-between',
    ...Shadow.card,
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
  name: { color: Colors.surface, fontSize: 16, fontWeight: '800', marginTop: 12 },
  meta: { color: 'rgba(255,255,255,0.85)', fontSize: 11, marginTop: 2 },
  progressWrap: { marginTop: 10 },
  progressText: { color: Colors.surface, fontSize: 11, fontWeight: '700', marginTop: 6 },
  sscCard: {
    borderRadius: Radius.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    ...Shadow.card,
  },
  sscTag: { color: Colors.warning, fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  sscTitle: { color: Colors.surface, fontSize: 16, fontWeight: '800', marginTop: 4 },
  sscSub: { color: 'rgba(255,255,255,0.72)', fontSize: 12, marginTop: 4 },
  sscBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.accent,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  sscBtnText: { fontWeight: '800', fontSize: 13, color: Colors.surface },
});
