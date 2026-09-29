import { useRouter } from 'expo-router';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClassHeader } from '../../components/ClassHeader';
import { BooksSection } from '../../components/Library';
import { EmptyState } from '../../components/ui/EmptyState';
import { useColors } from '../../context/ColorSchemeContext';
import { useGrade } from '../../context/GradeContext';
import { useSubjects } from '../../lib/useDashboardData';

export default function BooksTab() {
  const { colors: C } = useColors();
  const router = useRouter();
  const { grade, gradeLabel } = useGrade();
  const { data: subjects, isLoading, isError, refetch } = useSubjects(grade);

  const s = makeStyles(C);

  if (isLoading) {
    return (
      <SafeAreaView style={s.safe} edges={['left', 'right', 'bottom']}>
        <View style={s.center}>
          <EmptyState icon="book-outline" title="Loading books…" subtitle="Please wait" />
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
            title="Couldn't load books"
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
            title="All Books"
            bangla="সব বই"
            count={
              items.length === 0
                ? `No books for ${gradeLabel} yet`
                : `${items.length} ${items.length === 1 ? 'book' : 'books'} in ${gradeLabel}`
            }
          />

          {items.length === 0 ? (
            <View style={s.empty}>
              <EmptyState
                icon="book-outline"
                title="No Books"
                subtitle={`There are no books for ${gradeLabel} yet. Try another class.`}
              />
            </View>
          ) : (
            <View style={s.content}>
              <BooksSection
                books={items}
                onOpen={(s) => router.push(`/reader/${s.id}/${s.chapters[0].id}?grade=${grade}`)}
              />
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
