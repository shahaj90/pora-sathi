import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { type Note, type Quiz } from '../constants/data';
import { Colors } from '../constants/theme';
import { Card } from './ui/Card';

export function NotesSection({ notes, onOpen }: { notes: Note[]; onOpen: (n: Note) => void }) {
  return (
    <View style={styles.row}>
      {notes.slice(0, 4).map((n) => (
        <NoteCard key={n.id} note={n} onOpen={onOpen} />
      ))}
    </View>
  );
}

function NoteCard({ note, onOpen }: { note: Note; onOpen: (n: Note) => void }) {
  return (
    <Card
      onPress={() => onOpen(note)}
      accessibilityLabel={`Open note: ${note.title}`}
      padding={12}
      style={styles.card}
    >
      <View style={styles.pdfBadge}>
        <Ionicons name="document-text" size={18} color={Colors.surface} />
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
    </Card>
  );
}

export function QuizSection({ quizzes, onPlay }: { quizzes: Quiz[]; onPlay: (q: Quiz) => void }) {
  return (
    <View style={styles.quizList}>
      {quizzes.map((q) => (
        <QuizRow key={q.id} quiz={q} onPlay={onPlay} />
      ))}
    </View>
  );
}

function QuizRow({ quiz, onPlay }: { quiz: Quiz; onPlay: (q: Quiz) => void }) {
  const diffColor =
    quiz.difficulty === 'Easy'
      ? Colors.teal
      : quiz.difficulty === 'Medium'
        ? Colors.accent
        : Colors.pink;
  return (
    <Card padding={12} style={styles.quizCard}>
      <View style={[styles.quizIcon, { backgroundColor: `${diffColor}1A` }]}>
        <Ionicons name="help-circle" size={22} color={diffColor} />
      </View>
      <View style={styles.fill}>
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
      <Pressable
        style={styles.playBtn}
        onPress={() => onPlay(quiz)}
        accessibilityRole="button"
        accessibilityLabel={`Start quiz: ${quiz.title}`}
      >
        <Ionicons name="play" size={16} color={Colors.surface} />
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    width: '48%',
    flexGrow: 1,
  },
  pdfBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.danger,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
