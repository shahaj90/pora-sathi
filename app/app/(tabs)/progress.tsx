import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClassHeader } from '../../components/ClassHeader';
import { ProgressSection } from '../../components/ProgressSection';
import { EmptyState } from '../../components/ui/EmptyState';
import { useColors } from '../../context/ColorSchemeContext';
import { useGrade } from '../../context/GradeContext';
import { useSubjects } from '../../lib/useDashboardData';

export default function ProgressTab() {
  const { colors: C } = useColors();
  const { grade, gradeLabel } = useGrade();
  const { data: subjects, isLoading, isError, refetch } = useSubjects(grade);

  const s = makeStyles(C);

  if (isLoading) {
    return (
      <SafeAreaView style={s.safe} edges={['left', 'right', 'bottom']}>
        <View style={s.center}>
          <EmptyState icon="analytics-outline" title="Loading progress…" subtitle="Please wait" />
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
            title="Couldn't load progress"
            subtitle="Check your connection and try again."
            actionTitle="Retry"
            onAction={() => void refetch()}
          />
        </View>
      </SafeAreaView>
    );
  }

  const items = subjects ?? [];

  return (
    <SafeAreaView style={s.safe} edges={['left', 'right', 'bottom']}>
      <View style={s.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={s.scroll}
          stickyHeaderIndices={[0]}
        >
          <ClassHeader
            title="Your Progress"
            bangla="আপনার অগ্রগতি"
            count={
              items.length === 0
                ? `No subjects for ${gradeLabel} yet`
                : `${items.length} ${items.length === 1 ? 'subject' : 'subjects'} in ${gradeLabel}`
            }
          />

          {items.length === 0 ? (
            <View style={s.empty}>
              <EmptyState
                icon="analytics-outline"
                title="No Subjects"
                subtitle={`There are no subjects for ${gradeLabel} yet. Try another class.`}
              />
            </View>
          ) : (
            <View style={s.content}>
              <ProgressSection subjects={items} onOpen={() => {}} />
            </View>
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
    empty: { marginTop: 16 },
    content: { marginTop: 16 },
    spacer: { height: 36 },
  });
