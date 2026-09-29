import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { type Quiz, type Subject } from '../constants/data';
import { Radius, Shadow } from '../constants/theme';
import { useColors } from '../context/ColorSchemeContext';
import { Card } from './ui/Card';

// ---------------------------------------------------------------------------
// BooksSection — 2-column grid (for full list views)
// ---------------------------------------------------------------------------

export function BooksSection({
  books,
  onOpen,
}: {
  books: Subject[];
  onOpen: (s: Subject) => void;
}) {
  const { width } = useWindowDimensions();
  const gap = 12;
  const padding = 32; // 16 * 2
  const columns = 2;
  const cardWidth = Math.floor((width - padding - gap) / columns);

  return (
    <View style={gridWrap}>
      {books.map((s, i) => {
        const isLastInRow = (i + 1) % columns === 0;
        return (
          <BookCard
            key={s.id}
            subject={s}
            onOpen={onOpen}
            style={{ width: cardWidth, marginRight: isLastInRow ? 0 : gap }}
          />
        );
      })}
    </View>
  );
}

// ---------------------------------------------------------------------------
// BooksCarousel — horizontal scroll (for home preview)
// ---------------------------------------------------------------------------

export function BooksCarousel({
  books,
  onOpen,
  limit = 4,
}: {
  books: Subject[];
  onOpen: (s: Subject) => void;
  limit?: number;
}) {
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.62;
  const items = books.slice(0, limit);

  if (items.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={carouselStyle}
    >
      {items.map((s) => (
        <BookCard key={s.id} subject={s} onOpen={onOpen} style={{ width: cardWidth }} />
      ))}
    </ScrollView>
  );
}

// ---------------------------------------------------------------------------
// BookCard — single book card
// ---------------------------------------------------------------------------

function BookCard({
  subject,
  onOpen,
  style,
}: {
  subject: Subject;
  onOpen: (s: Subject) => void;
  style?: object;
}) {
  return (
    <Pressable onPress={() => onOpen(subject)} accessibilityLabel={`Open book: ${subject.name}`}>
      <LinearGradient
        colors={subject.color}
        style={[bookCardStyle, style]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={bookIconWrap}>
          <Ionicons name={subject.icon} size={22} color="#FFFFFF" />
        </View>
        <Text numberOfLines={2} style={bookTitleStyle}>
          {subject.name}
        </Text>
        <Text style={bookBanglaStyle}>{subject.bangla}</Text>
        <Text style={bookMetaStyle}>{subject.chapterCount} chapters</Text>
      </LinearGradient>
    </Pressable>
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

const gridWrap = {
  flexDirection: 'row' as const,
  flexWrap: 'wrap' as const,
  paddingHorizontal: 16,
};

const carouselStyle = {
  paddingHorizontal: 16,
  gap: 12,
  paddingVertical: 2,
};

const bookCardStyle = {
  borderRadius: Radius.lg,
  padding: 14,
  minHeight: 152,
  justifyContent: 'space-between' as const,
  marginBottom: 12,
  ...Shadow.card,
};

const bookIconWrap = {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: 'rgba(255,255,255,0.25)',
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
};

const bookTitleStyle = {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '800' as const,
  lineHeight: 19,
  marginTop: 10,
};

const bookBanglaStyle = {
  color: 'rgba(255,255,255,0.9)',
  fontSize: 11,
  marginTop: 3,
};

const bookMetaStyle = {
  color: 'rgba(255,255,255,0.85)',
  fontSize: 11,
  fontWeight: '700' as const,
  marginTop: 8,
};

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
