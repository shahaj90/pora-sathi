import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { ContinueLearning, DashboardStats } from '../constants/data';
import { Gradients, Radius, Shadow } from '../constants/theme';
import { useColors } from '../context/ColorSchemeContext';
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
  const { colors: C } = useColors();
  const s = makeStyles(C);
  const gradeLabel =
    grades.length <= 1 ? (grades[0] ?? 'Class 10') : `${grades[0]} +${grades.length - 1}`;
  return (
    <LinearGradient
      colors={Gradients.header}
      style={s.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={s.topRow}>
        <View style={s.profileRow}>
          <Pressable
            onPress={onProfile}
            accessibilityRole="button"
            accessibilityLabel="Open profile menu"
          >
            <Avatar uri={avatar} name={name} size={44} />
          </Pressable>
          <View style={s.nameCol}>
            <Text style={s.hello}>Assalamu Alaikum 👋</Text>
            <Text style={s.name}>
              {name} · {gradeLabel}
            </Text>
          </View>
        </View>
        <View style={s.iconRow}>
          <Pressable
            style={s.iconBtn}
            onPress={onStreak}
            accessibilityRole="button"
            accessibilityLabel="View your progress"
          >
            <Ionicons name="flame" size={18} color={C.accent} />
            <Text style={s.streak}>{stats.streak}</Text>
          </Pressable>
        </View>
      </View>

      <View style={s.search}>
        <Ionicons name="search" size={18} color={C.muted} />
        <TextInput
          value={query}
          onChangeText={onQueryChange}
          placeholder="Search books, quizzes, topics…"
          placeholderTextColor={C.muted}
          style={s.searchInput}
          returnKeyType="search"
        />
        {query.length > 0 ? (
          <Pressable onPress={() => onQueryChange('')} hitSlop={8}>
            <Ionicons name="close-circle" size={18} color={C.muted} />
          </Pressable>
        ) : null}
        <Pressable
          style={s.mic}
          onPress={onMic}
          accessibilityRole="button"
          accessibilityLabel="Ask AI tutor"
        >
          <Ionicons name="mic" size={16} color={C.surface} />
        </Pressable>
      </View>

      <View style={s.statsRow}>
        <View style={s.statCard}>
          <Text style={s.statValue}>{stats.syllabusPct}%</Text>
          <Text style={s.statLabel}>Syllabus done</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statValue}>{stats.quizzesDone}</Text>
          <Text style={s.statLabel}>Quizzes done</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statValue}>{stats.booksCount}</Text>
          <Text style={s.statLabel}>Books</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

export function ContinueCard({ item, onAsk }: { item: ContinueLearning; onAsk: () => void }) {
  const { colors: C } = useColors();
  const s = continueStyles(C);
  return (
    <View style={s.wrap}>
      <View style={s.fill}>
        <Text style={s.kicker}>CONTINUE LEARNING</Text>
        <Text style={s.title}>{item.title}</Text>
        <Text style={s.sub}>{item.meta}</Text>
        <View style={s.bar}>
          <ProgressBar value={item.progress} color={C.yellow} trackColor="rgba(255,255,255,0.2)" />
        </View>
      </View>
      <Pressable style={s.play} onPress={onAsk}>
        <Ionicons name="play" size={20} color={C.surface} />
      </Pressable>
    </View>
  );
}

const makeStyles = (C: ReturnType<typeof useColors>['colors']) =>
  StyleSheet.create({
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
      backgroundColor: C.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: { fontSize: 20, fontWeight: '800', color: C.primaryDark },
    hello: { color: 'rgba(255,255,255,0.85)', fontSize: 12 },
    name: { color: C.surface, fontSize: 15, fontWeight: '800' },
    iconRow: { flexDirection: 'row', gap: 8 },
    iconBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: C.surface,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 999,
    },
    streak: { fontWeight: '800', fontSize: 13 },
    search: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: C.surface,
      borderRadius: 999,
      paddingHorizontal: 14,
      paddingVertical: 12,
      marginTop: 14,
    },
    searchInput: { flex: 1, color: C.text, fontSize: 14, paddingVertical: 2 },
    mic: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: C.accent,
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
    statValue: { color: C.surface, fontWeight: '800', fontSize: 18 },
    statLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 2, fontWeight: '600' },
  });

const continueStyles = (C: ReturnType<typeof useColors>['colors']) =>
  StyleSheet.create({
    fill: { flex: 1 },
    wrap: {
      marginHorizontal: 16,
      marginTop: 16,
      marginBottom: 6,
      backgroundColor: C.primary,
      borderRadius: Radius.lg,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      ...Shadow.card,
    },
    kicker: { color: C.warning, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
    title: { color: C.surface, fontSize: 15, fontWeight: '800', marginTop: 4 },
    sub: { color: 'rgba(255,255,255,0.72)', fontSize: 12, marginTop: 2 },
    bar: { marginTop: 10 },
    play: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: C.accent,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
