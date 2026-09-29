import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Pdf from 'react-native-pdf';
import type { GradeId } from '../../../constants/data';
import { Shadow } from '../../../constants/theme';
import { useColors } from '../../../context/ColorSchemeContext';
import { useGrade } from '../../../context/GradeContext';
import { getSubjectForGrade } from '../../../lib/api';

const PDF_ASSETS: Record<string, number> = {
  'class8-math.pdf': require('../../../assets/books/class8-math.pdf'),
  'class8-science.pdf': 0,
  'class8-bangla1.pdf': 0,
  'class8-bangla2.pdf': 0,
  'class8-english1.pdf': 0,
  'class8-english2.pdf': 0,
  'class9-math.pdf': 0,
  'class9-physics.pdf': 0,
  'class9-chemistry.pdf': 0,
  'class9-biology.pdf': 0,
  'class9-bangla1.pdf': 0,
  'class9-bangla2.pdf': 0,
  'class9-english1.pdf': 0,
  'class9-english2.pdf': 0,
  'class10-math.pdf': 0,
  'class10-physics.pdf': 0,
  'class10-chemistry.pdf': 0,
  'class10-biology.pdf': 0,
  'class10-bangla1.pdf': 0,
  'class10-bangla2.pdf': 0,
  'class10-english1.pdf': 0,
  'class10-english2.pdf': 0,
};

export default function ReaderScreen() {
  const { colors: C } = useColors();
  const router = useRouter();
  const { subjectId, chapterId } = useLocalSearchParams<{
    subjectId: string;
    chapterId: string;
  }>();
  const { grade: activeGrade } = useGrade();
  const { grade } = useLocalSearchParams<{ grade?: string }>();
  const gradeId = (grade as GradeId) ?? activeGrade;

  const subject = getSubjectForGrade(gradeId, subjectId as any);
  const chapter = subject?.chapters.find((c) => c.id === chapterId);
  const [currentPage, setCurrentPage] = useState(chapter?.pageStart ?? 1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (chapter) setCurrentPage(chapter.pageStart);
  }, [chapter]);

  const s = makeStyles(C);

  if (!subject || !chapter) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.center}>
          <Text style={s.centerText}>Book or chapter not found.</Text>
          <Pressable onPress={() => router.back()} style={s.backBtn}>
            <Text style={s.backBtnText}>Go back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const assetId = PDF_ASSETS[subject.pdfFile];
  const pdfSource = assetId
    ? { uri: Asset.fromModule(assetId).localUri ?? Asset.fromModule(assetId).uri }
    : undefined;

  return (
    <SafeAreaView style={s.safe} edges={['left', 'right', 'bottom']}>
      <View style={s.header}>
        <Pressable onPress={() => router.back()} style={s.back}>
          <Ionicons name="arrow-back" size={20} color={C.text} />
        </Pressable>
        <View style={s.titleCol}>
          <Text style={s.title} numberOfLines={1}>
            {subject.name}
          </Text>
          <Text style={s.subtitle} numberOfLines={1}>
            {chapter.title}
          </Text>
        </View>
        <View style={s.pageBadge}>
          <Text style={s.pageText}>
            {currentPage}/{totalPages || '-'}
          </Text>
        </View>
      </View>

      {pdfSource ? (
        <Pdf
          source={pdfSource}
          page={chapter.pageStart}
          onLoadComplete={(numberOfPages) => setTotalPages(numberOfPages)}
          onPageChanged={(page) => setCurrentPage(page)}
          onError={(error) => console.log('PDF error:', error)}
          style={s.pdf}
        />
      ) : (
        <View style={s.placeholder}>
          <Ionicons name="document-text-outline" size={48} color={C.muted} />
          <Text style={s.placeholderTitle}>PDF not available yet</Text>
          <Text style={s.placeholderSub}>
            The {subject.name} book for this class hasn't been added.
          </Text>
        </View>
      )}

      <Pressable style={s.aiFab} onPress={() => router.push('/chat')}>
        <Ionicons name="chatbubble-ellipses" size={20} color={C.surface} />
        <Text style={s.aiText}>Ask AI Teacher</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const makeStyles = (C: ReturnType<typeof useColors>['colors']) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.background },
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      gap: 12,
    },
    centerText: { fontSize: 14, color: C.textSecondary },
    backBtn: {
      backgroundColor: C.primary,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 999,
    },
    backBtnText: { color: C.surface, fontWeight: '800' },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: C.border,
      backgroundColor: C.surface,
    },
    back: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: C.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleCol: { flex: 1 },
    title: { fontSize: 16, fontWeight: '800', color: C.text },
    subtitle: { fontSize: 12, color: C.textSecondary, marginTop: 2 },
    pageBadge: {
      backgroundColor: C.primarySoft,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
    },
    pageText: { color: C.primary, fontWeight: '800', fontSize: 12 },
    pdf: { flex: 1, backgroundColor: C.background },
    placeholder: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      gap: 12,
    },
    placeholderTitle: { fontSize: 16, fontWeight: '800', color: C.text },
    placeholderSub: { fontSize: 13, color: C.textSecondary, textAlign: 'center' },
    aiFab: {
      position: 'absolute',
      bottom: 24,
      right: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: C.accent,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 999,
      ...Shadow.card,
    },
    aiText: { color: C.surface, fontWeight: '800', fontSize: 13 },
  });
