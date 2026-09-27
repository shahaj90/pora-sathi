import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Radius } from '../constants/theme';

export function HomeHeader({
  name,
  grades,
  onLogout,
}: {
  name: string;
  grades: string[];
  onLogout: () => void;
}) {
  const gradeLabel =
    grades.length <= 1 ? (grades[0] ?? 'Class 10') : `${grades[0]} +${grades.length - 1}`;
  return (
    <LinearGradient
      colors={['#6C3CE0', '#8B5CF6', '#B794FF']}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.topRow}>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
          </View>
          <View>
            <Text style={styles.hello}>Assalamu Alaikum 👋</Text>
            <Text style={styles.name}>
              {name} · {gradeLabel}
            </Text>
          </View>
        </View>
        <View style={styles.iconRow}>
          <Pressable style={styles.iconBtn}>
            <Ionicons name="flame" size={18} color="#FF8A3D" />
            <Text style={styles.streak}>12</Text>
          </Pressable>
          <Pressable
            style={styles.iconBtn}
            onPress={onLogout}
            accessibilityLabel="Log out"
            accessibilityRole="button"
          >
            <Ionicons name="log-out-outline" size={18} color={Colors.primary} />
          </Pressable>
        </View>
      </View>

      <View style={styles.search}>
        <Ionicons name="search" size={18} color={Colors.muted} />
        <Text style={styles.searchPlaceholder}>Search notes, quizzes, topics…</Text>
        <View style={styles.mic}>
          <Ionicons name="mic" size={16} color="#fff" />
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>68%</Text>
          <Text style={styles.statLabel}>Syllabus done</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>24</Text>
          <Text style={styles.statLabel}>Quizzes done</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>142</Text>
          <Text style={styles.statLabel}>PDF notes</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

export function ContinueCard({ onAsk }: { onAsk: () => void }) {
  return (
    <View style={c.wrap}>
      <View style={{ flex: 1 }}>
        <Text style={c.kicker}>CONTINUE LEARNING</Text>
        <Text style={c.title}>Quadratic Equations — Part 3</Text>
        <Text style={c.sub}>Mathematics · 8 min left · Class 10</Text>
        <View style={c.bar}>
          <View style={c.fill} />
        </View>
      </View>
      <Pressable style={c.play} onPress={onAsk}>
        <Ionicons name="play" size={20} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 18,
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 20, fontWeight: '800', color: Colors.primary },
  hello: { color: 'rgba(255,255,255,0.85)', fontSize: 12 },
  name: { color: '#fff', fontSize: 15, fontWeight: '800' },
  iconRow: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
  },
  streak: { fontWeight: '800', fontSize: 13 },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 14,
  },
  searchPlaceholder: { flex: 1, color: Colors.muted, fontSize: 13 },
  mic: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: Radius.md,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  statValue: { color: '#fff', fontWeight: '800', fontSize: 16 },
  statLabel: { color: 'rgba(255,255,255,0.85)', fontSize: 11, marginTop: 2 },
});

const c = StyleSheet.create({
  wrap: {
    marginHorizontal: 16,
    marginTop: -0,
    backgroundColor: '#191A2E',
    borderRadius: Radius.lg,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  kicker: { color: '#FFC531', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  title: { color: '#fff', fontSize: 15, fontWeight: '800', marginTop: 4 },
  sub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 },
  bar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    marginTop: 10,
    overflow: 'hidden',
  },
  fill: { width: '72%', height: 6, backgroundColor: '#FFC531', borderRadius: 3 },
  play: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
