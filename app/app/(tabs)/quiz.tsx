import { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QuizSection } from '../../components/Library';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { EmptyState } from '../../components/ui/EmptyState';
import { useColors } from '../../context/ColorSchemeContext';
import { useQuizzes } from '../../lib/useDashboardData';
import type { GradeId } from '../../constants/data';

export default function QuizTab() {
  const { colors: C } = useColors();
  const [grade] = useState<GradeId>('c10');
  const { data: quizzes, isLoading, isError } = useQuizzes(grade);

  const s = makeStyles(C);

  if (isLoading) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.center}>
          <EmptyState icon="help-circle-outline" title="Loading quizzes…" subtitle="Please wait" />
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.center}>
          <EmptyState
            icon="alert-circle-outline"
            title="Couldn't load quizzes"
            subtitle="Check your connection and try again."
            actionTitle="Retry"
            onAction={() => {}}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (!quizzes || quizzes.length === 0) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.center}>
          <EmptyState
            icon="help-circle-outline"
            title="No Quizzes"
            subtitle="Quizzes will appear here when available for this class."
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          <SectionHeader title="All Quizzes" bangla="সব কুইজ" />
          <QuizSection quizzes={quizzes} onPlay={() => {}} />
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
    spacer: { height: 36 },
  });
