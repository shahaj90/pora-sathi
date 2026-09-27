import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NOTES, QUIZZES, type Note, type Quiz } from '../constants/data';
import { Colors, Radius } from '../constants/theme';

export function NotesSection({ onOpenAll }: { onOpenAll?: () => void }) {
  return (
    <View style={styles.row}>
      {NOTES.slice(0, 4).map((n) => (
        <NoteCard key={n.id} note={n} />
      ))}
    </View>
  );
}

function NoteCard({ note }: { note: Note }) {
  return (
    <Pressable style={styles.card}>
      <View style={styles.pdfBadge}>
        <Ionicons name="document-text" size={18} color="#fff" />
      </View>
      <Text numberOfLines={2} style={styles.title}>
        {note.title}
      </Text>
      <Text style={styles.chapter}>{note.chapter}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>
          {note.pages}p · {note.size}
        </Text>
        <View style={styles.dl}>
          <Ionicons name="download-outline" size={13} color={Colors.primary} />
          <Text style={styles.dlText}>{note.downloads}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export function QuizSection() {
  return (
    <View style={styles.quizList}>
      {QUIZZES.map((q) => (
        <QuizRow key={q.id} quiz={q} />
      ))}
    </View>
  );
}

function QuizRow({ quiz }: { quiz: Quiz }) {
  const diffColor =
    quiz.difficulty === 'Easy' ? '#00A88F' : quiz.difficulty === 'Medium' ? '#FF8A3D' : '#FF5C8A';
  return (
    <View style={styles.quizCard}>
      <View style={[styles.quizIcon, { backgroundColor: `${diffColor}1A` }]}>
        <Ionicons name="help-circle" size={22} color={diffColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.quizTitle}>{quiz.title}</Text>
        <Text style={styles.quizMeta}>
          {quiz.questions} Qs · {quiz.minutes} min · {quiz.attempts} attempts
        </Text>
        <View style={styles.tagRow}>
          <View style={[styles.tag, { backgroundColor: `${diffColor}1A` }]}>
            <Text style={[styles.tagText, { color: diffColor }]}>{quiz.difficulty}</Text>
          </View>
          {typeof quiz.bestScore === 'number' ? (
            <Text style={styles.best}>Best: {quiz.bestScore}%</Text>
          ) : (
            <Text style={styles.best}>Not attempted</Text>
          )}
        </View>
      </View>
      <Pressable style={styles.playBtn}>
        <Ionicons name="play" size={16} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: Radius.md,
    padding: 12,
    width: '48%',
    flexGrow: 1,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pdfBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FF5C5C',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: { fontSize: 13, fontWeight: '800', color: Colors.text, lineHeight: 18 },
  chapter: { fontSize: 11, color: Colors.muted, marginTop: 4 },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  meta: { fontSize: 11, color: Colors.muted },
  dl: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dlText: { fontSize: 11, fontWeight: '700', color: Colors.primary },
  quizList: { paddingHorizontal: 16, gap: 10 },
  quizCard: {
    backgroundColor: '#fff',
    borderRadius: Radius.md,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quizIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizTitle: { fontSize: 14, fontWeight: '800', color: Colors.text },
  quizMeta: { fontSize: 11, color: Colors.muted, marginTop: 2 },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  tag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 },
  tagText: { fontSize: 11, fontWeight: '800' },
  best: { fontSize: 11, color: Colors.muted, fontWeight: '600' },
  playBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
