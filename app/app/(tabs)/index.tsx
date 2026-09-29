import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useColors } from '../../context/ColorSchemeContext';
import { useGrade } from '../../context/GradeContext';
import { ChatFAB } from '../../components/ChatFAB';
import { BottomSheetMenu, type MenuItem } from '../../components/ui/BottomSheetMenu';
import { ContentSkeleton, DashboardSkeleton } from '../../components/DashboardSkeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { GradeTabs } from '../../components/GradeTabs';
import { ContinueCard, HomeHeader } from '../../components/Header';
import { BooksCarousel, QuizCarousel } from '../../components/Library';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { SubjectGrid } from '../../components/SubjectGrid';
import { SscBannerCard } from '../../components/SscBanner';
import { useDashboard } from '../../lib/useDashboardData';
import type { Quiz, Subject } from '../../constants/data';

export default function HomeTab() {
  const { colors: C } = useColors();
  const router = useRouter();
  const { user, restoring: authRestoring, logout } = useAuth();
  const { grade, setGrade, grades, restoring: gradeRestoring } = useGrade();
  const [query, setQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const { subjects, quizzes, meta, isLoading, isError, error } = useDashboard(grade);

  const q = query.trim().toLowerCase();
  const filteredSubjects = useMemo(
    () =>
      q
        ? subjects.filter(
            (s: Subject) => s.name.toLowerCase().includes(q) || s.bangla.toLowerCase().includes(q),
          )
        : subjects,
    [subjects, q],
  );
  const filteredBooks = useMemo(
    () =>
      q
        ? subjects.filter(
            (s: Subject) =>
              s.name.toLowerCase().includes(q) ||
              s.bangla.toLowerCase().includes(q) ||
              s.chapters.some((c) => c.title.toLowerCase().includes(q)),
          )
        : subjects,
    [subjects, q],
  );
  const filteredQuizzes = useMemo(
    () => (q ? quizzes.filter((t: Quiz) => t.title.toLowerCase().includes(q)) : quizzes),
    [quizzes, q],
  );

  const openSubject = (s: Subject) => router.push(`/subject/${s.id}?grade=${grade}`);
  const openBook = (s: Subject) => router.push(`/subject/${s.id}?grade=${grade}&tab=book`);
  const openQuiz = (t: Quiz) => router.push(`/subject/${t.subjectId}?grade=${grade}&tab=quiz`);
  const openChat = () => router.push('/chat');

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
    {
      id: 'logout',
      label: 'Log Out',
      icon: 'log-out-outline',
      onPress: logout,
    },
  ];

  if (authRestoring || gradeRestoring || (isLoading && !query)) {
    return <DashboardSkeleton />;
  }

  if (isError || !meta) {
    return (
      <SafeAreaView style={safe(C)}>
        <View style={center(C)}>
          <EmptyState
            title="Couldn't load your dashboard"
            subtitle={error?.message ?? 'Something went wrong.'}
            actionTitle="Retry"
            onAction={() => {}}
          />
        </View>
      </SafeAreaView>
    );
  }

  const searching = q.length > 0;

  return (
    <SafeAreaView style={safe(C)}>
      <View style={container(C)}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={scroll}>
          <HomeHeader
            name={user?.name ?? 'Guest'}
            grades={user?.grades ?? ['Class 10']}
            avatar={user?.avatar}
            stats={meta.stats}
            query={query}
            onQueryChange={setQuery}
            onMic={openChat}
            onStreak={() => {}}
            onProfile={() => setMenuVisible(true)}
          />
          <View style={gradeWrap}>
            <GradeTabs grades={grades} active={grade} onChange={setGrade} />
          </View>

          {isLoading && query.length === 0 ? (
            <ContentSkeleton />
          ) : (
            <>
              {searching ? (
                <View>
                  <SectionHeader
                    title={`Results for "${query.trim()}"`}
                    bangla={`${filteredSubjects.length + filteredBooks.length + filteredQuizzes.length} matches`}
                  />
                  {filteredSubjects.length > 0 ? (
                    <View>
                      <SectionHeader title="Subjects" />
                      <SubjectGrid subjects={filteredSubjects} onOpen={openSubject} compact />
                    </View>
                  ) : null}
                  {filteredBooks.length > 0 ? (
                    <View>
                      <SectionHeader title="Books" />
                      <BooksCarousel books={filteredBooks} onOpen={openBook} limit={4} />
                    </View>
                  ) : null}
                  {filteredQuizzes.length > 0 ? (
                    <View>
                      <SectionHeader title="Quizzes" />
                      <QuizCarousel quizzes={filteredQuizzes} onPlay={openQuiz} limit={4} />
                    </View>
                  ) : null}
                  {filteredSubjects.length === 0 &&
                  filteredBooks.length === 0 &&
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
              ) : (
                <View>
                  <ContinueCard item={meta.continue} onAsk={openChat} />
                  <SectionHeader title="Subjects" bangla="বিষয়সমূহ" action="See all" />
                  <SubjectGrid subjects={subjects} onOpen={openSubject} compact />
                  <SscBannerCard banner={meta.sscBanner} onPress={openChat} />
                  <SectionHeader
                    title="Quick Books"
                    bangla="বইসমূহ"
                    action="View all"
                    onAction={() => router.push('/(tabs)/books')}
                  />
                  <BooksCarousel books={subjects} onOpen={openBook} />
                  <SectionHeader
                    title="Quick Quizzes"
                    bangla="কুইজ"
                    action="View all"
                    onAction={() => router.push('/(tabs)/quiz')}
                  />
                  <QuizCarousel quizzes={quizzes} onPlay={openQuiz} />
                </View>
              )}
            </>
          )}

          <View style={spacer} />
        </ScrollView>

        <ChatFAB onPress={openChat} />
        <BottomSheetMenu
          visible={menuVisible}
          title="Account"
          items={menuItems}
          onClose={() => setMenuVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
}

const scroll = { paddingBottom: 8 };
const gradeWrap = { marginTop: 12 };
const spacer = { height: 36 };

const safe = (C: ReturnType<typeof useColors>['colors']) => ({
  flex: 1 as const,
  backgroundColor: C.background,
});
const container = (C: ReturnType<typeof useColors>['colors']) => ({
  flex: 1 as const,
  backgroundColor: C.background,
});
const center = (C: ReturnType<typeof useColors>['colors']) => ({
  flex: 1 as const,
  backgroundColor: C.background,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  gap: 12 as const,
  padding: 24 as const,
});
