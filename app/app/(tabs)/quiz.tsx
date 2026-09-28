import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClassHeader } from '../../components/ClassHeader';
import { QuizSection } from '../../components/Library';
import { EmptyState } from '../../components/ui/EmptyState';
import { useColors } from '../../context/ColorSchemeContext';
import { useGrade } from '../../context/GradeContext';
import { useQuizzes } from '../../lib/useDashboardData';

export default function QuizTab() {
  const { colors: C } = useColors();
  const { grade, gradeLabel } = useGrade();
  const { data: quizzes, isLoading, isError, refetch } = useQuizzes(grade);

  const s = makeStyles(C);

  if (isLoading) {
    return (
      <SafeAreaView style={s.safe} edges={['left', 'right', 'bottom']}>
        <View style={s.center}>
          <EmptyState icon="help-circle-outline" title="Loading quizzes…" subtitle="Please wait" />
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={s.safe} edges={['left', 'right', 'bottom']}>
        <View style={s.center}>
          <EmptyState
            icon="alert-circle-outline"
            title="Couldn't load quizzes"
            subtitle="Check your connection and try again."
            actionTitle="Retry"
            onAction={() => void refetch()}
          />
        </View>
      </SafeAreaView>
    );
  }

  const items = quizzes ?? [];

  return (
    <SafeAreaView style={s.safe} edges={['left', 'right', 'bottom']}>
      <View style={s.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={s.scroll}
          stickyHeaderIndices={[0]}
        >
          <ClassHeader
            title="All Quizzes"
            bangla="সব কুইজ"
            count={
              items.length === 0
                ? `No quizzes for ${gradeLabel} yet`
                : `${items.length} ${items.length === 1 ? 'quiz' : 'quizzes'} in ${gradeLabel}`
            }
          />

          {items.length === 0 ? (
            <View style={s.empty}>
              <EmptyState
                icon="help-circle-outline"
                title="No Quizzes"
                subtitle={`There are no quizzes for ${gradeLabel} yet. Try another class.`}
              />
            </View>
          ) : (
            <QuizSection quizzes={items} onPlay={() => {}} />
          )}
          <View style={s.spacer} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const makeStyles = (C: ReturnType<typeof useColors>['colors']) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.background },
    container: { flex: 1, backgroundColor: C.background },
    scroll: { paddingBottom: 8 },
    center: {
      flex: 1,
      backgroundColor: C.background,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      padding: 24,
    },
    empty: { marginTop: 8 },
    spacer: { height: 36 },
  });
