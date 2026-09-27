import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { BottomNav } from '../components/BottomNav';
import { ChatFAB } from '../components/ChatFAB';
import { SectionHeader, GradeTabs } from '../components/GradeTabs';
import { ContinueCard, HomeHeader } from '../components/Header';
import { NotesSection, QuizSection } from '../components/Library';
import { SubjectGrid } from '../components/SubjectGrid';
import { SUBJECTS, type GradeId, type Subject } from '../constants/data';
import { Colors } from '../constants/theme';

export default function Dashboard() {
  const router = useRouter();
  const [grade, setGrade] = useState<GradeId>('c10');
  const [tab, setTab] = useState('home');

  // TODO: filter subjects per grade once grade-specific content lands.
  const subjects = SUBJECTS;

  const openSubject = (s: Subject) => router.push(`/subject/${s.id}?grade=${grade}`);
  const openChat = () => router.push('/chat');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          <HomeHeader />
          <View style={styles.gradeWrap}>
            <GradeTabs active={grade} onChange={setGrade} />
          </View>

          <ContinueCard onAsk={openChat} />

          <SectionHeader title="Subjects" bangla="বিষয়সমূহ" action="See all" />
          <SubjectGrid subjects={subjects} onOpen={openSubject} />

          <SectionHeader title="PDF Notes" bangla="পিডিএফ নোট" action="View all" />
          <NotesSection />

          <SectionHeader title="Interactive Quizzes" bangla="কুইজ" action="View all" />
          <QuizSection />

          <View style={{ height: 140 }} />
        </ScrollView>

        <ChatFAB onPress={openChat} />
        <BottomNav active={tab} onChange={setTab} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#6C3CE0' },
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 8 },
  gradeWrap: { marginTop: 12 },
});
