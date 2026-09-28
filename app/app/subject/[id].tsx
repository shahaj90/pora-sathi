import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { GradeId, Note, Quiz, Subject } from '../../constants/data';
import { Colors, Radius } from '../../constants/theme';
import notesC8 from '../../data/notes-c8.json';
import notesC9 from '../../data/notes-c9.json';
import notesC10 from '../../data/notes-c10.json';
import quizzesC8 from '../../data/quizzes-c8.json';
import quizzesC9 from '../../data/quizzes-c9.json';
import quizzesC10 from '../../data/quizzes-c10.json';
import subjectsC8 from '../../data/subjects-c8.json';
import subjectsC9 from '../../data/subjects-c9.json';
import subjectsC10 from '../../data/subjects-c10.json';

const SUBJECTS: Record<GradeId, Subject[]> = {
  c8: subjectsC8 as Subject[],
  c9: subjectsC9 as Subject[],
  c10: subjectsC10 as Subject[],
};

const NOTES: Record<GradeId, Note[]> = {
  c8: notesC8 as Note[],
  c9: notesC9 as Note[],
  c10: notesC10 as Note[],
};

const QUIZZES: Record<GradeId, Quiz[]> = {
  c8: quizzesC8 as Quiz[],
  c9: quizzesC9 as Quiz[],
  c10: quizzesC10 as Quiz[],
};

const DEFAULT_GRADE: GradeId = 'c10';

export default function SubjectDetail() {
  const { id, grade, tab } = useLocalSearchParams<{ id: string; grade?: string; tab?: string }>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'notes' | 'quiz'>(tab === 'quiz' ? 'quiz' : 'notes');

  const gradeId = (grade as GradeId) ?? DEFAULT_GRADE;
  const subjects = SUBJECTS[gradeId] ?? SUBJECTS[DEFAULT_GRADE];
  const subject = subjects.find((s) => s.id === id) ?? subjects[0];

  const notes = useMemo(() => {
    const list = NOTES[gradeId] ?? NOTES[DEFAULT_GRADE];
    return list.filter((n) => n.subjectId === subject.id);
  }, [gradeId, subject.id]);

  const fallbackNotes = useMemo(() => NOTES[gradeId] ?? NOTES[DEFAULT_GRADE], [gradeId]);

  const quizzes = useMemo(() => {
    const list = QUIZZES[gradeId] ?? QUIZZES[DEFAULT_GRADE];
    return list.filter((q) => q.subjectId === subject.id);
  }, [gradeId, subject.id]);

  const fallbackQuiz = useMemo(() => QUIZZES[gradeId] ?? QUIZZES[DEFAULT_GRADE], [gradeId]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <LinearGradient
          colors={subject.color}
          style={styles.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.nav}>
            <Pressable onPress={() => router.back()} style={styles.back}>
              <Ionicons name="arrow-back" size={20} color={Colors.surface} />
            </Pressable>
            <Text style={styles.gradePill}>Class {gradeId.replace('c', '')}</Text>
          </View>
          <View style={styles.iconBubble}>
            <Ionicons name={subject.icon} size={28} color={Colors.surface} />
          </View>
          <Text style={styles.name}>{subject.name}</Text>
          <Text style={styles.bangla}>
            {subject.bangla} · {subject.chapters} chapters
          </Text>
          <View style={styles.statRow}>
            <View style={styles.stat}>
              <Text style={styles.statV}>{subject.notesCount}</Text>
              <Text style={styles.statL}>PDF Notes</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statV}>{subject.quizCount}</Text>
              <Text style={styles.statL}>Quizzes</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statV}>{Math.round(subject.progress * 100)}%</Text>
              <Text style={styles.statL}>Completed</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.tabRow}>
          <Pressable
            onPress={() => setActiveTab('notes')}
            style={[styles.tab, activeTab === 'notes' && styles.tabActive]}
          >
            <Ionicons
              name="document-text"
              size={16}
              color={activeTab === 'notes' ? Colors.surface : Colors.textSecondary}
            />
            <Text style={[styles.tabText, activeTab === 'notes' && styles.tabTextActive]}>
              PDF Notes
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('quiz')}
            style={[styles.tab, activeTab === 'quiz' && styles.tabActive]}
          >
            <Ionicons
              name="help-circle"
              size={16}
              color={activeTab === 'quiz' ? Colors.surface : Colors.textSecondary}
            />
            <Text style={[styles.tabText, activeTab === 'quiz' && styles.tabTextActive]}>
              Quizzes
            </Text>
          </Pressable>
        </View>

        {activeTab === 'notes' ? (
          <View style={styles.list}>
            {(notes.length ? notes : fallbackNotes).map((n) => (
              <View key={n.id} style={styles.card}>
                <View style={styles.pdf}>
                  <Text style={styles.pdfText}>PDF</Text>
                </View>
                <View style={styles.fill}>
                  <Text style={styles.cardTitle}>{n.title}</Text>
                  <Text style={styles.cardSub}>
                    {n.chapter} · {n.pages} pages · {n.size}
                  </Text>
                </View>
                <Ionicons name="download-outline" size={20} color={Colors.primary} />
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.list}>
            {(quizzes.length ? quizzes : fallbackQuiz).map((q) => (
              <View key={q.id} style={styles.card}>
                <View style={[styles.pdf, { backgroundColor: Colors.primary }]}>
                  <Ionicons name="play" size={16} color={Colors.surface} />
                </View>
                <View style={styles.fill}>
                  <Text style={styles.cardTitle}>{q.title}</Text>
                  <Text style={styles.cardSub}>
                    {q.questions} Qs · {q.minutes} min · {q.difficulty}
                  </Text>
                </View>
                <Text style={styles.start}>Start</Text>
              </View>
            ))}
          </View>
        )}

        <Pressable style={styles.aiCta} onPress={() => router.push('/chat')}>
          <Ionicons name="sparkles" size={20} color={Colors.surface} />
          <Text style={styles.aiText}>Ask AI about {subject.name}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  fill: { flex: 1 },
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
    color: Colors.surface,
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
  name: { color: Colors.surface, fontSize: 24, fontWeight: '900', marginTop: 10 },
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
  statV: { color: Colors.surface, fontWeight: '900', fontSize: 16 },
  statL: { color: 'rgba(255,255,255,0.85)', fontSize: 11, marginTop: 2 },
  tabRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginTop: 16 },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.surface,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  tabText: { fontWeight: '700', color: Colors.textSecondary, fontSize: 13 },
  tabTextActive: { color: Colors.surface },
  list: { paddingHorizontal: 16, marginTop: 12, gap: 10 },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pdf: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdfText: { color: Colors.surface, fontWeight: '900', fontSize: 12 },
  cardTitle: { fontSize: 13.5, fontWeight: '800', color: Colors.text },
  cardSub: { fontSize: 11.5, color: Colors.textSecondary, marginTop: 3 },
  start: { color: Colors.accent, fontWeight: '800', fontSize: 13 },
  aiCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.accent,
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 999,
  },
  aiText: { color: Colors.surface, fontWeight: '800', fontSize: 14 },
});
