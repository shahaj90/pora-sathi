import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClassHeader } from '../../components/ClassHeader';
import { NotesSection } from '../../components/Library';
import { EmptyState } from '../../components/ui/EmptyState';
import { useColors } from '../../context/ColorSchemeContext';
import { useGrade } from '../../context/GradeContext';
import { useNotes } from '../../lib/useDashboardData';

export default function NotesTab() {
  const { colors: C } = useColors();
  const { grade, gradeLabel } = useGrade();
  const { data: notes, isLoading, isError, refetch } = useNotes(grade);

  const s = makeStyles(C);

  if (isLoading) {
    return (
      <SafeAreaView style={s.safe} edges={['left', 'right', 'bottom']}>
        <View style={s.center}>
          <EmptyState icon="document-text-outline" title="Loading notes…" subtitle="Please wait" />
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
            title="Couldn't load notes"
            subtitle="Check your connection and try again."
            actionTitle="Retry"
            onAction={() => void refetch()}
          />
        </View>
      </SafeAreaView>
    );
  }

  const items = notes ?? [];

  return (
    <SafeAreaView style={s.safe} edges={['left', 'right', 'bottom']}>
      <View style={s.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={s.scroll}
          stickyHeaderIndices={[0]}
        >
          <ClassHeader
            title="All PDF Notes"
            bangla="সব পিডিএফ নোট"
            count={
              items.length === 0
                ? `No notes for ${gradeLabel} yet`
                : `${items.length} ${items.length === 1 ? 'note' : 'notes'} in ${gradeLabel}`
            }
          />

          {items.length === 0 ? (
            <View style={s.empty}>
              <EmptyState
                icon="document-text-outline"
                title="No PDF Notes"
                subtitle={`There are no notes for ${gradeLabel} yet. Try another class.`}
              />
            </View>
          ) : (
            <View style={s.content}>
              <NotesSection notes={items} onOpen={() => {}} />
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
