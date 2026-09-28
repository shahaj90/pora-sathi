import { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NotesSection } from '../../components/Library';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { EmptyState } from '../../components/ui/EmptyState';
import { useColors } from '../../context/ColorSchemeContext';
import { useNotes } from '../../lib/useDashboardData';
import type { GradeId } from '../../constants/data';

export default function NotesTab() {
  const { colors: C } = useColors();
  const [grade] = useState<GradeId>('c10');
  const { data: notes, isLoading, isError } = useNotes(grade);

  const s = makeStyles(C);

  if (isLoading) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.center}>
          <EmptyState icon="document-text-outline" title="Loading notes…" subtitle="Please wait" />
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
            title="Couldn't load notes"
            subtitle="Check your connection and try again."
            actionTitle="Retry"
            onAction={() => {}}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.center}>
          <EmptyState
            icon="document-text-outline"
            title="No PDF Notes"
            subtitle="Notes will appear here when available for this class."
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          <SectionHeader title="All PDF Notes" bangla="সব পিডিএফ নোট" />
          <NotesSection notes={notes} onOpen={() => {}} />
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
