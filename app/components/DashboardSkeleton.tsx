import { ScrollView, StyleSheet, View } from 'react-native';
import { Colors, Radius } from '../constants/theme';
import { Skeleton } from './ui/Skeleton';

export function DashboardSkeleton({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <View style={styles.wrap}>
      {!hideHeader ? (
        <View style={styles.header}>
          <View style={styles.row}>
            <Skeleton
              width={44}
              height={44}
              borderRadius={22}
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            />
            <View style={styles.nameCol}>
              <Skeleton
                width={120}
                height={14}
                style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
              />
              <Skeleton
                width={160}
                height={16}
                style={{ backgroundColor: 'rgba(255,255,255,0.35)', marginTop: 6 }}
              />
            </View>
          </View>
          <Skeleton
            width="100%"
            height={48}
            borderRadius={Radius.pill}
            style={{ backgroundColor: 'rgba(255,255,255,0.22)', marginTop: 14 }}
          />
          <View style={styles.stats}>
            <Skeleton
              width="30%"
              height={58}
              borderRadius={Radius.md}
              style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
            />
            <Skeleton
              width="30%"
              height={58}
              borderRadius={Radius.md}
              style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
            />
            <Skeleton
              width="30%"
              height={58}
              borderRadius={Radius.md}
              style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
            />
          </View>
        </View>
      ) : null}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
        <View style={styles.gradeRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} width={80} height={40} borderRadius={Radius.pill} />
          ))}
        </View>

        <Skeleton width="100%" height={96} borderRadius={Radius.lg} style={styles.section} />

        <View style={styles.subjectRow}>
          <Skeleton width="48%" height={158} borderRadius={Radius.lg} />
          <Skeleton width="48%" height={158} borderRadius={Radius.lg} />
        </View>

        <View style={styles.sectionRow}>
          <Skeleton width="48%" height={120} borderRadius={Radius.md} />
          <Skeleton width="48%" height={120} borderRadius={Radius.md} />
        </View>

        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} width="100%" height={72} borderRadius={Radius.md} style={styles.quiz} />
        ))}

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

export function ContentSkeleton() {
  return (
    <View style={styles.contentWrap}>
      <Skeleton width="100%" height={96} borderRadius={Radius.lg} style={styles.section} />

      <View style={styles.subjectRow}>
        <Skeleton width="48%" height={158} borderRadius={Radius.lg} />
        <Skeleton width="48%" height={158} borderRadius={Radius.lg} />
      </View>

      <View style={styles.sectionRow}>
        <Skeleton width="48%" height={120} borderRadius={Radius.md} />
        <Skeleton width="48%" height={120} borderRadius={Radius.md} />
      </View>

      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} width="100%" height={72} borderRadius={Radius.md} style={styles.quiz} />
      ))}

      <View style={{ height: 120 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 18,
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  nameCol: { flex: 1, gap: 4 },
  stats: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 },
  body: { paddingBottom: 8 },
  contentWrap: { paddingBottom: 8 },
  gradeRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
  },
  section: { marginHorizontal: 16, marginTop: 16 },
  subjectRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginTop: 16,
  },
  sectionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginTop: 20,
  },
  quiz: { marginHorizontal: 16, marginTop: 10 },
});
