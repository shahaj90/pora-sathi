import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Chapter, GradeId, Subject } from '../../constants/data';
import { Radius } from '../../constants/theme';
import { useColors } from '../../context/ColorSchemeContext';
import { useGrade } from '../../context/GradeContext';
import { getQuizzesForGrade, getSubjectForGrade } from '../../lib/api';

export default function SubjectDetail() {
  const { colors: C } = useColors();
  const { id, grade, tab } = useLocalSearchParams<{ id: string; grade?: string; tab?: string }>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'book' | 'quiz'>(tab === 'quiz' ? 'quiz' : 'book');
  const { grade: activeGrade, gradeLabel } = useGrade();

  // The link carries the class it was opened from; fall back to whatever class
  // is currently selected so a deep link still lands on the right content.
  const gradeId = (grade as GradeId) ?? activeGrade;
  const subject = getSubjectForGrade(gradeId, id as Subject['id']);

  const quizzes = useMemo(() => {
    return getQuizzesForGrade(gradeId).filter((q) => q.subjectId === subject?.id);
  }, [gradeId, subject?.id]);

  const fallbackQuiz = useMemo(() => getQuizzesForGrade(gradeId), [gradeId]);

  const s = makeStyles(C);

  if (!subject) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.center}>
          <Text style={s.centerText}>Subject not found.</Text>
          <Pressable onPress={() => router.back()} style={s.backBtn}>
            <Text style={s.backBtnText}>Go back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const openChapter = (chapter: Chapter) => {
    router.push(`/reader/${subject.id}/${chapter.id}?grade=${gradeId}`);
  };

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <LinearGradient
          colors={subject.color}
          style={s.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={s.nav}>
            <Pressable onPress={() => router.back()} style={s.back}>
              <Ionicons name="arrow-back" size={20} color={C.surface} />
            </Pressable>
            <Text style={s.gradePill}>{gradeLabel}</Text>
          </View>
          <View style={s.iconBubble}>
            <Ionicons name={subject.icon} size={28} color={C.surface} />
          </View>
          <Text style={s.name}>{subject.name}</Text>
          <Text style={s.bangla}>
            {subject.bangla} · {subject.chapterCount} chapters
          </Text>
          <View style={s.statRow}>
            <View style={s.stat}>
              <Text style={s.statV}>{subject.chapterCount}</Text>
              <Text style={s.statL}>Chapters</Text>
            </View>
            <View style={s.stat}>
              <Text style={s.statV}>{subject.quizCount}</Text>
              <Text style={s.statL}>Quizzes</Text>
            </View>
            <View style={s.stat}>
              <Text style={s.statV}>{Math.round(subject.progress * 100)}%</Text>
              <Text style={s.statL}>Completed</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={s.tabRow}>
          <Pressable
            onPress={() => setActiveTab('book')}
            style={[s.tab, activeTab === 'book' && s.tabActive]}
          >
            <Ionicons
              name="book"
              size={16}
              color={activeTab === 'book' ? C.surface : C.textSecondary}
            />
            <Text style={[s.tabText, activeTab === 'book' && s.tabTextActive]}>Read Book</Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('quiz')}
            style={[s.tab, activeTab === 'quiz' && s.tabActive]}
          >
            <Ionicons
              name="help-circle"
              size={16}
              color={activeTab === 'quiz' ? C.surface : C.textSecondary}
            />
            <Text style={[s.tabText, activeTab === 'quiz' && s.tabTextActive]}>Quizzes</Text>
          </Pressable>
        </View>

        {activeTab === 'book' ? (
          <View style={s.list}>
            {subject.chapters.map((chapter) => (
              <Pressable key={chapter.id} style={s.card} onPress={() => openChapter(chapter)}>
                <View style={[s.pdf, { backgroundColor: C.primary }]}>
                  <Ionicons name="book-outline" size={18} color={C.surface} />
                </View>
                <View style={s.fill}>
                  <Text style={s.cardTitle}>{chapter.title}</Text>
                  <Text style={s.cardSub}>
                    Pages {chapter.pageStart}–{chapter.pageEnd}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={C.primary} />
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={s.list}>
            {(quizzes.length ? quizzes : fallbackQuiz).map((q) => (
              <View key={q.id} style={s.card}>
                <View style={[s.pdf, { backgroundColor: C.primary }]}>
                  <Ionicons name="play" size={16} color={C.surface} />
                </View>
                <View style={s.fill}>
                  <Text style={s.cardTitle}>{q.title}</Text>
                  <Text style={s.cardSub}>
                    {q.questions} Qs · {q.minutes} min · {q.difficulty}
                  </Text>
                </View>
                <Text style={s.start}>Start</Text>
              </View>
            ))}
          </View>
        )}

        <Pressable style={s.aiCta} onPress={() => router.push('/chat')}>
          <Ionicons name="sparkles" size={20} color={C.surface} />
          <Text style={s.aiText}>Ask AI about {subject.name}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (C: ReturnType<typeof useColors>['colors']) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.background },
    fill: { flex: 1 },
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      gap: 12,
    },
    centerText: { fontSize: 14, color: C.textSecondary },
    backBtn: {
      backgroundColor: C.primary,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 999,
    },
    backBtnText: { color: C.surface, fontWeight: '800' },
    hero: {
      paddingTop: 54,
      paddingHorizontal: 16,
      paddingBottom: 20,
      borderBottomLeftRadius: 26,
      borderBottomRightRadius: 26,
    },
    nav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    back: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: 'rgba(255,255,255,0.25)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    gradePill: {
      backgroundColor: 'rgba(255,255,255,0.25)',
      color: C.surface,
      fontWeight: '800',
      fontSize: 12,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 999,
      overflow: 'hidden',
    },
    iconBubble: {
      width: 56,
      height: 56,
      borderRadius: 18,
      backgroundColor: 'rgba(255,255,255,0.25)',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16,
    },
    name: { color: C.surface, fontSize: 24, fontWeight: '900', marginTop: 10 },
    bangla: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 2 },
    statRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
    stat: {
      flex: 1,
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: Radius.md,
      padding: 10,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.3)',
    },
    statV: { color: C.surface, fontWeight: '900', fontSize: 16 },
    statL: { color: 'rgba(255,255,255,0.85)', fontSize: 11, marginTop: 2 },
    tabRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginTop: 16 },
    tab: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      backgroundColor: C.surface,
      paddingVertical: 12,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: C.border,
    },
    tabActive: { backgroundColor: C.primary, borderColor: C.primary },
    tabText: { fontWeight: '700', color: C.textSecondary, fontSize: 13 },
    tabTextActive: { color: C.surface },
    list: { paddingHorizontal: 16, marginTop: 12, gap: 10 },
    card: {
      backgroundColor: C.surface,
      borderRadius: Radius.md,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      borderWidth: 1,
      borderColor: C.border,
    },
    pdf: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: C.danger,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardTitle: { fontSize: 13.5, fontWeight: '800', color: C.text },
    cardSub: { fontSize: 11.5, color: C.textSecondary, marginTop: 3 },
    start: { color: C.accent, fontWeight: '800', fontSize: 13 },
    aiCta: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      backgroundColor: C.accent,
      marginHorizontal: 16,
      marginTop: 16,
      paddingVertical: 14,
      borderRadius: 999,
    },
    aiText: { color: C.surface, fontWeight: '800', fontSize: 14 },
  });
