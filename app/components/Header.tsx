import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { ContinueLearning, DashboardStats } from '../constants/data';
import { Colors, Gradients, Radius, Shadow } from '../constants/theme';
import { ProgressBar } from './ui/ProgressBar';
import { Avatar } from './ui/Avatar';

export function HomeHeader({
  name,
  grades,
  avatar,
  stats,
  query,
  onQueryChange,
  onMic,
  onStreak,
  onProfile,
}: {
  name: string;
  grades: string[];
  avatar?: string;
  stats: DashboardStats;
  query: string;
  onQueryChange: (q: string) => void;
  onMic: () => void;
  onStreak: () => void;
  onProfile: () => void;
}) {
  const gradeLabel =
    grades.length <= 1 ? (grades[0] ?? 'Class 10') : `${grades[0]} +${grades.length - 1}`;
  return (
    <LinearGradient
      colors={Gradients.header}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.topRow}>
        <View style={styles.profileRow}>
          <Pressable
            onPress={onProfile}
            accessibilityRole="button"
            accessibilityLabel="Open profile menu"
          >
            <Avatar uri={avatar} name={name} size={44} />
          </Pressable>
          <View style={styles.nameCol}>
            <Text style={styles.hello}>Assalamu Alaikum 👋</Text>
            <Text style={styles.name}>
              {name} · {gradeLabel}
            </Text>
          </View>
        </View>
        <View style={styles.iconRow}>
          <Pressable
            style={styles.iconBtn}
            onPress={onStreak}
            accessibilityRole="button"
            accessibilityLabel="View your progress"
          >
            <Ionicons name="flame" size={18} color={Colors.accent} />
            <Text style={styles.streak}>{stats.streak}</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.search}>
        <Ionicons name="search" size={18} color={Colors.muted} />
        <TextInput
          value={query}
          onChangeText={onQueryChange}
          placeholder="Search notes, quizzes, topics…"
          placeholderTextColor={Colors.muted}
          style={styles.searchInput}
          returnKeyType="search"
        />
        {query.length > 0 ? (
          <Pressable onPress={() => onQueryChange('')} hitSlop={8}>
            <Ionicons name="close-circle" size={18} color={Colors.muted} />
          </Pressable>
        ) : null}
        <Pressable
          style={styles.mic}
          onPress={onMic}
          accessibilityRole="button"
          accessibilityLabel="Ask AI tutor"
        >
          <Ionicons name="mic" size={16} color={Colors.surface} />
        </Pressable>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.syllabusPct}%</Text>
          <Text style={styles.statLabel}>Syllabus done</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.quizzesDone}</Text>
          <Text style={styles.statLabel}>Quizzes done</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.notesCount}</Text>
          <Text style={styles.statLabel}>PDF notes</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

export function ContinueCard({ item, onAsk }: { item: ContinueLearning; onAsk: () => void }) {
  return (
    <View style={c.wrap}>
      <View style={c.fill}>
        <Text style={c.kicker}>CONTINUE LEARNING</Text>
        <Text style={c.title}>{item.title}</Text>
        <Text style={c.sub}>{item.meta}</Text>
        <View style={c.bar}>
          <ProgressBar
            value={item.progress}
            color={Colors.yellow}
            trackColor="rgba(255,255,255,0.2)"
          />
        </View>
      </View>
      <Pressable style={c.play} onPress={onAsk}>
        <Ionicons name="play" size={20} color={Colors.surface} />
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
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  nameCol: { justifyContent: 'center' },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 20, fontWeight: '800', color: Colors.primaryDark },
  hello: { color: 'rgba(255,255,255,0.85)', fontSize: 12 },
  name: { color: Colors.surface, fontSize: 15, fontWeight: '800' },
  iconRow: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
  },
  streak: { fontWeight: '800', fontSize: 13 },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surface,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 14,
  },
  searchInput: { flex: 1, color: Colors.text, fontSize: 14, paddingVertical: 2 },
  mic: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: Radius.md,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  statValue: { color: Colors.surface, fontWeight: '800', fontSize: 18 },
  statLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 2, fontWeight: '600' },
});

const c = StyleSheet.create({
  fill: { flex: 1 },
  wrap: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 6,
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    ...Shadow.card,
  },
  kicker: { color: Colors.warning, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  title: { color: Colors.surface, fontSize: 15, fontWeight: '800', marginTop: 4 },
  sub: { color: 'rgba(255,255,255,0.72)', fontSize: 12, marginTop: 2 },
  bar: { marginTop: 10 },
  play: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
