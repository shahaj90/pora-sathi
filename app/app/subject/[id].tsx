import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Note, Quiz, Subject } from '../../constants/data';
import { Colors, Radius } from '../../constants/theme';
import notesJson from '../../data/notes.json';
import quizzesJson from '../../data/quizzes.json';
import subjectsJson from '../../data/subjects.json';

const SUBJECTS = subjectsJson as Subject[];
const NOTES = notesJson as Note[];
const QUIZZES = quizzesJson as Quiz[];

export default function SubjectDetail() {
  const { id, grade, tab } = useLocalSearchParams<{ id: string; grade?: string; tab?: string }>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'notes' | 'quiz'>(tab === 'quiz' ? 'quiz' : 'notes');

  const subject = SUBJECTS.find((s) => s.id === id) ?? SUBJECTS[0];
  const notes = NOTES.filter((n) => n.subjectId === subject.id);
  const fallbackNotes = NOTES.slice(0, 3);
  const quizzes = QUIZZES.filter((q) => q.subjectId === subject.id);
  const fallbackQuiz = QUIZZES.slice(0, 2);

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
            <Text style={styles.gradePill}>
              {grade === 'ssc' ? 'SSC' : `Class ${grade?.replace('c', '') ?? '10'}`}
            </Text>
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
              color={activeTab === 'notes' ? Colors.surface : Colors.muted}
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
              color={activeTab === 'quiz' ? Colors.surface : Colors.muted}
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
  tabActive: { backgroundColor: Colors.text, borderColor: Colors.text },
  tabText: { fontWeight: '700', color: Colors.muted, fontSize: 13 },
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
  cardSub: { fontSize: 11.5, color: Colors.muted, marginTop: 3 },
  start: { color: Colors.primary, fontWeight: '800', fontSize: 13 },
  aiCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 999,
  },
  aiText: { color: Colors.surface, fontWeight: '800', fontSize: 14 },
});
