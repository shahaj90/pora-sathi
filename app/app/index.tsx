import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BottomNav } from '../components/BottomNav';
import { ChatFAB } from '../components/ChatFAB';
import { SectionHeader, GradeTabs } from '../components/GradeTabs';
import { ContinueCard, HomeHeader } from '../components/Header';
import { NotesSection, QuizSection } from '../components/Library';
import { SubjectGrid } from '../components/SubjectGrid';
import type {
  ContinueLearning,
  DashboardStats,
  Grade,
  GradeId,
  Note,
  Quiz,
  Subject,
} from '../constants/data';
import { Colors } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import {
  fetchDashboardMeta,
  fetchGrades,
  fetchNotes,
  fetchQuizzes,
  fetchSubjects,
} from '../lib/api';

export default function Dashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [grade, setGrade] = useState<GradeId>('c10');
  const [tab, setTab] = useState('home');

  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [continueItem, setContinueItem] = useState<ContinueLearning | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (gradeId: GradeId, initial: boolean) => {
    if (initial) setLoading(true);
    else setRefreshing(true);
    setError(null);
    try {
      // TODO(api): pass gradeId as query param, e.g. GET /subjects?grade=c10
      void gradeId;
      const [g, s, n, q, meta] = await Promise.all([
        fetchGrades(),
        fetchSubjects(),
        fetchNotes(),
        fetchQuizzes(),
        fetchDashboardMeta(),
      ]);
      setGrades(g);
      setSubjects(s);
      setNotes(n);
      setQuizzes(q);
      setStats(meta.stats);
      setContinueItem(meta.continue);
    } catch {
      setError('Could not load dashboard data. Check your connection and retry.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load('c10', true);
  }, [load]);

  const changeGrade = (g: GradeId) => {
    setGrade(g);
    load(g, false);
  };

  const openSubject = (s: Subject) => router.push(`/subject/${s.id}?grade=${grade}`);
  const openChat = () => router.push('/chat');
  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.centerText}>Loading your dashboard…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !stats || !continueItem) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.centerText}>{error ?? 'Something went wrong.'}</Text>
          <Pressable onPress={() => load(grade, true)} style={styles.retry}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          <HomeHeader
            name={user?.name ?? 'Guest'}
            grades={user?.grades ?? ['Class 10']}
            stats={stats}
            onLogout={handleLogout}
          />
          <View style={styles.gradeWrap}>
            <GradeTabs grades={grades} active={grade} onChange={changeGrade} />
          </View>

          {refreshing ? (
            <ActivityIndicator size="small" color={Colors.primary} style={styles.refresh} />
          ) : null}

          <ContinueCard item={continueItem} onAsk={openChat} />

          <SectionHeader title="Subjects" bangla="বিষয়সমূহ" action="See all" />
          <SubjectGrid subjects={subjects} onOpen={openSubject} />

          <SectionHeader title="PDF Notes" bangla="পিডিএফ নোট" action="View all" />
          <NotesSection notes={notes} />

          <SectionHeader title="Interactive Quizzes" bangla="কুইজ" action="View all" />
          <QuizSection quizzes={quizzes} />

          <View style={{ height: 140 }} />
        </ScrollView>

        <ChatFAB onPress={openChat} />
        <BottomNav active={tab} onChange={setTab} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#6C3CE0' },
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 8 },
  gradeWrap: { marginTop: 12 },
  center: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
  },
  centerText: { fontSize: 14, color: Colors.muted, textAlign: 'center' },
  retry: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
  },
  retryText: { color: '#fff', fontWeight: '800', fontSize: 14 },
  refresh: { marginTop: 8 },
});
