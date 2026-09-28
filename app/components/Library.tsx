import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { type Note, type Quiz } from '../constants/data';
import { useColors } from '../context/ColorSchemeContext';
import { Card } from './ui/Card';

// ---------------------------------------------------------------------------
// NotesSection — 2-column grid (for full list views)
// ---------------------------------------------------------------------------

export function NotesSection({ notes, onOpen }: { notes: Note[]; onOpen: (n: Note) => void }) {
  return (
    <View style={rowStyle}>
      {notes.map((n) => (
        <NoteCard key={n.id} note={n} onOpen={onOpen} />
      ))}
    </View>
  );
}

// ---------------------------------------------------------------------------
// NotesCarousel — horizontal scroll (for home preview)
// ---------------------------------------------------------------------------

export function NotesCarousel({
  notes,
  onOpen,
  limit = 4,
}: {
  notes: Note[];
  onOpen: (n: Note) => void;
  limit?: number;
}) {
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.62;
  const items = notes.slice(0, limit);

  if (items.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={carouselStyle}
    >
      {items.map((n) => (
        <NoteCard key={n.id} note={n} onOpen={onOpen} style={{ width: cardWidth }} />
      ))}
    </ScrollView>
  );
}

// ---------------------------------------------------------------------------
// NoteCard — single note card
// ---------------------------------------------------------------------------

function NoteCard({
  note,
  onOpen,
  style,
}: {
  note: Note;
  onOpen: (n: Note) => void;
  style?: object;
}) {
  const { colors: C } = useColors();
  return (
    <Card
      onPress={() => onOpen(note)}
      accessibilityLabel={`Open note: ${note.title}`}
      padding={12}
      style={[cardStatic, style]}
    >
      <View style={[pdfBadge, { backgroundColor: C.danger }]}>
        <Ionicons name="document-text" size={18} color={C.surface} />
      </View>
      <Text numberOfLines={2} style={[titleText, { color: C.text }]}>
        {note.title}
      </Text>
      <Text style={[chapterText, { color: C.textSecondary }]}>{note.chapter}</Text>
      <View style={metaRowStyle}>
        <Text style={[metaText, { color: C.textSecondary }]}>
          {note.pages}p · {note.size}
        </Text>
        <View style={dlStyle}>
          <Ionicons name="download-outline" size={13} color={C.primary} />
          <Text style={[dlTextValue, { color: C.primary }]}>{note.downloads}</Text>
        </View>
      </View>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// QuizSection — vertical list (for full list views)
// ---------------------------------------------------------------------------

export function QuizSection({ quizzes, onPlay }: { quizzes: Quiz[]; onPlay: (q: Quiz) => void }) {
  return (
    <View style={quizListStyle}>
      {quizzes.map((q) => (
        <QuizRow key={q.id} quiz={q} onPlay={onPlay} />
      ))}
    </View>
  );
}

// ---------------------------------------------------------------------------
// QuizCarousel — horizontal scroll (for home preview)
// ---------------------------------------------------------------------------

export function QuizCarousel({
  quizzes,
  onPlay,
  limit = 4,
}: {
  quizzes: Quiz[];
  onPlay: (q: Quiz) => void;
  limit?: number;
}) {
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.72;
  const items = quizzes.slice(0, limit);

  if (items.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={carouselStyle}
    >
      {items.map((q) => (
        <QuizRow key={q.id} quiz={q} onPlay={onPlay} style={{ width: cardWidth }} />
      ))}
    </ScrollView>
  );
}

// ---------------------------------------------------------------------------
// QuizRow — single quiz row
// ---------------------------------------------------------------------------

function QuizRow({
  quiz,
  onPlay,
  style,
}: {
  quiz: Quiz;
  onPlay: (q: Quiz) => void;
  style?: object;
}) {
  const { colors: C } = useColors();
  const diffColor =
    quiz.difficulty === 'Easy' ? C.accent : quiz.difficulty === 'Medium' ? C.warning : C.pink;
  return (
    <Card padding={12} style={[quizCardStyle, style]}>
      <View style={[quizIconStyle, { backgroundColor: `${diffColor}1A` }]}>
        <Ionicons name="help-circle" size={22} color={diffColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[quizTitleText, { color: C.text }]}>{quiz.title}</Text>
        <Text style={[quizMetaText, { color: C.textSecondary }]}>
          {quiz.questions} Qs · {quiz.minutes} min · {quiz.attempts} attempts
        </Text>
        <View style={tagRowStyle}>
          <View style={[tagStyle, { backgroundColor: `${diffColor}1A` }]}>
            <Text style={[tagTextStyle, { color: diffColor }]}>{quiz.difficulty}</Text>
          </View>
          {typeof quiz.bestScore === 'number' ? (
            <Text style={[bestText, { color: C.textSecondary }]}>Best: {quiz.bestScore}%</Text>
          ) : (
            <Text style={[bestText, { color: C.textSecondary }]}>Not attempted</Text>
          )}
        </View>
      </View>
      <Pressable
        style={[playBtnStyle, { backgroundColor: C.accent }]}
        onPress={() => onPlay(quiz)}
        accessibilityRole="button"
        accessibilityLabel={`Start quiz: ${quiz.title}`}
      >
        <Ionicons name="play" size={16} color={C.surface} />
      </Pressable>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Static styles
// ---------------------------------------------------------------------------

const rowStyle = {
  flexDirection: 'row' as const,
  flexWrap: 'wrap' as const,
  paddingHorizontal: 16,
  gap: 12,
};

const carouselStyle = {
  paddingHorizontal: 16,
  gap: 12,
  paddingVertical: 2,
};

const cardStatic = {
  width: '48%' as const,
  flexGrow: 1,
};

const pdfBadge = {
  width: 36,
  height: 36,
  borderRadius: 10,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  marginBottom: 8,
};

const titleText = {
  fontSize: 13,
  fontWeight: '800' as const,
  lineHeight: 18,
};

const chapterText = {
  fontSize: 11,
  marginTop: 4,
};

const metaRowStyle = {
  flexDirection: 'row' as const,
  justifyContent: 'space-between' as const,
  alignItems: 'center' as const,
  marginTop: 10,
};

const metaText = { fontSize: 11 };

const dlStyle = { flexDirection: 'row' as const, alignItems: 'center' as const, gap: 4 };

const dlTextValue = { fontSize: 11, fontWeight: '700' as const };

const quizListStyle = { paddingHorizontal: 16, gap: 10 };

const quizCardStyle = {
  flexDirection: 'row' as const,
  alignItems: 'center' as const,
  gap: 12,
};

const quizIconStyle = {
  width: 44,
  height: 44,
  borderRadius: 14,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
};

const quizTitleText = { fontSize: 14, fontWeight: '800' as const };

const quizMetaText = { fontSize: 11, marginTop: 2 };

const tagRowStyle = {
  flexDirection: 'row' as const,
  alignItems: 'center' as const,
  gap: 8,
  marginTop: 6,
};

const tagStyle = { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 };

const tagTextStyle = { fontSize: 11, fontWeight: '800' as const };

const bestText = { fontSize: 11, fontWeight: '600' as const };

const playBtnStyle = {
  width: 38,
  height: 38,
  borderRadius: 19,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
};
