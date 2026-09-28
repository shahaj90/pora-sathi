import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav, type BottomTabId } from '../components/BottomNav';
import { ChatFAB } from '../components/ChatFAB';
import { BottomSheetMenu, type MenuItem } from '../components/ui/BottomSheetMenu';
import { ContentSkeleton, DashboardSkeleton } from '../components/DashboardSkeleton';
import { GradeTabs } from '../components/GradeTabs';
import { ContinueCard, HomeHeader } from '../components/Header';
import { NotesSection, QuizSection } from '../components/Library';
import { ProgressSection } from '../components/ProgressSection';
import { SubjectGrid } from '../components/SubjectGrid';
import { EmptyState } from '../components/ui/EmptyState';
import { SectionHeader } from '../components/ui/SectionHeader';
import type {
  ContinueLearning,
  DashboardStats,
  Grade,
  GradeId,
  Note,
  Quiz,
  SscBanner,
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
  const [view, setView] = useState<BottomTabId>('home');
  const [query, setQuery] = useState('');

  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [continueItem, setContinueItem] = useState<ContinueLearning | null>(null);
  const [banner, setBanner] = useState<SscBanner | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gradeChanging, setGradeChanging] = useState(false);

  // TODO(api): accept a gradeId and request per-grade content,
  // e.g. GET /subjects?grade=c10
  const load = useCallback(async (initial: boolean) => {
    if (initial) {
      setLoading(true);
    } else {
      setRefreshing(true);
      setGradeChanging(true);
    }
    setError(null);
    try {
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
      setBanner(meta.sscBanner);
    } catch {
      setError('Could not load dashboard data. Check your connection and retry.');
    } finally {
      setLoading(false);
      setRefreshing(false);
      setGradeChanging(false);
    }
  }, []);

  useEffect(() => {
    load(true);
  }, [load]);

  const changeGrade = (g: GradeId) => {
    setGrade(g);
    load(false);
  };

  const q = query.trim().toLowerCase();
  const filteredSubjects = useMemo(
    () =>
      q
        ? subjects.filter(
            (s) => s.name.toLowerCase().includes(q) || s.bangla.toLowerCase().includes(q),
          )
        : subjects,
    [subjects, q],
  );
  const filteredNotes = useMemo(
    () =>
      q
        ? notes.filter(
            (n) => n.title.toLowerCase().includes(q) || n.chapter.toLowerCase().includes(q),
          )
        : notes,
    [notes, q],
  );
  const filteredQuizzes = useMemo(
    () => (q ? quizzes.filter((t) => t.title.toLowerCase().includes(q)) : quizzes),
    [quizzes, q],
  );

  const openSubject = (s: Subject) => router.push(`/subject/${s.id}?grade=${grade}`);
  const openNote = (n: Note) => router.push(`/subject/${n.subjectId}?grade=${grade}`);
  const openQuiz = (t: Quiz) => router.push(`/subject/${t.subjectId}?grade=${grade}&tab=quiz`);
  const openChat = () => router.push('/chat');
  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const [menuVisible, setMenuVisible] = useState(false);
  const menuItems: MenuItem[] = [
    {
      id: 'profile',
      label: 'My Profile',
      icon: 'person-outline',
      onPress: () => router.push('/profile'),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings-outline',
      onPress: () => router.push('/settings'),
    },
    { id: 'logout', label: 'Log Out', icon: 'log-out-outline', onPress: handleLogout },
  ];

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error || !stats || !continueItem || !banner) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <EmptyState
            title="Couldn't load your dashboard"
            subtitle={error ?? 'Something went wrong.'}
            actionTitle="Retry"
            onAction={() => load(true)}
          />
        </View>
      </SafeAreaView>
    );
  }

  const searching = q.length > 0;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          <HomeHeader
            name={user?.name ?? 'Guest'}
            grades={user?.grades ?? ['Class 10']}
            avatar={user?.avatar}
            stats={stats}
            query={query}
            onQueryChange={setQuery}
            onMic={openChat}
            onStreak={() => setView('progress')}
            onProfile={() => setMenuVisible(true)}
          />
          <View style={styles.gradeWrap}>
            <GradeTabs grades={grades} active={grade} onChange={changeGrade} />
          </View>

          {refreshing ? (
            <ActivityIndicator size="small" color={Colors.primary} style={styles.refresh} />
          ) : null}

          {gradeChanging ? (
            <ContentSkeleton />
          ) : (
            <>
              {searching ? (
                <View>
                  <SectionHeader
                    title={`Results for "${query.trim()}"`}
                    bangla={`${filteredSubjects.length + filteredNotes.length + filteredQuizzes.length} matches`}
                  />
                  {filteredSubjects.length > 0 ? (
                    <View>
                      <SectionHeader title="Subjects" />
                      <SubjectGrid
                        subjects={filteredSubjects}
                        banner={banner}
                        onOpen={openSubject}
                        onResumeSsc={openChat}
                      />
                    </View>
                  ) : null}
                  {filteredNotes.length > 0 ? (
                    <View>
                      <SectionHeader title="PDF Notes" />
                      <NotesSection notes={filteredNotes} onOpen={openNote} />
                    </View>
                  ) : null}
                  {filteredQuizzes.length > 0 ? (
                    <View>
                      <SectionHeader title="Quizzes" />
                      <QuizSection quizzes={filteredQuizzes} onPlay={openQuiz} />
                    </View>
                  ) : null}
                  {filteredSubjects.length === 0 &&
                  filteredNotes.length === 0 &&
                  filteredQuizzes.length === 0 ? (
                    <EmptyState
                      icon="search-outline"
                      title="No matches found"
                      subtitle="Try another topic or ask the AI tutor for help."
                      actionTitle="Ask AI tutor"
                      onAction={openChat}
                    />
                  ) : null}
                </View>
              ) : null}

              {!searching && view === 'home' ? (
                <View>
                  <ContinueCard item={continueItem} onAsk={openChat} />
                  <SectionHeader
                    title="Subjects"
                    bangla="বিষয়সমূহ"
                    action="See all"
                    onAction={() => setView('progress')}
                  />
                  <SubjectGrid
                    subjects={subjects}
                    banner={banner}
                    onOpen={openSubject}
                    onResumeSsc={openChat}
                  />
                  <SectionHeader
                    title="PDF Notes"
                    bangla="পিডিএফ নোট"
                    action="View all"
                    onAction={() => setView('notes')}
                  />
                  <NotesSection notes={notes} onOpen={openNote} />
                  <SectionHeader
                    title="Interactive Quizzes"
                    bangla="কুইজ"
                    action="View all"
                    onAction={() => setView('quiz')}
                  />
                  <QuizSection quizzes={quizzes} onPlay={openQuiz} />
                </View>
              ) : null}

              {!searching && view === 'notes' ? (
                <View>
                  <SectionHeader title="All PDF Notes" bangla="সব পিডিএফ নোট" />
                  <NotesSection notes={notes} onOpen={openNote} />
                </View>
              ) : null}

              {!searching && view === 'quiz' ? (
                <View>
                  <SectionHeader title="All Quizzes" bangla="সব কুইজ" />
                  <QuizSection quizzes={quizzes} onPlay={openQuiz} />
                </View>
              ) : null}

              {!searching && view === 'progress' ? (
                <View>
                  <SectionHeader title="Your Progress" bangla="অগ্রগতি" />
                  <ProgressSection subjects={subjects} onOpen={openSubject} />
                </View>
              ) : null}
            </>
          )}

          <View style={styles.spacer} />
        </ScrollView>

        <ChatFAB onPress={openChat} />
        <BottomNav active={view} onChange={setView} />
      </View>

      <BottomSheetMenu
        visible={menuVisible}
        title="Menu"
        items={menuItems}
        onClose={() => setMenuVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
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
  retry: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
  },
  retryText: { color: Colors.surface, fontWeight: '800', fontSize: 14 },
  refresh: { marginTop: 8 },
  spacer: { height: 140 },
});
