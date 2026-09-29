import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gradients, Radius } from '../constants/theme';
import { useGrade } from '../context/GradeContext';
import { useColors } from '../context/ColorSchemeContext';
import { GradeTabs } from './GradeTabs';

interface Props {
  /** Tab title, e.g. "All Books". */
  title: string;
  /** Bangla subtitle shown under the title. */
  bangla?: string;
  /** Count line under the class strip, e.g. "12 books". */
  count?: string;
}

/**
 * Header for the class-scoped tabs (Books, Quiz, Progress).
 *
 * Every list in this app is filtered by the selected class, so the class is
 * shown as an explicit banner with the picker inline — otherwise a learner
 * looking at a Class 8 list has no way to tell that from a Class 10 one.
 */
export function ClassHeader({ title, bangla, count }: Props) {
  const { colors: C } = useColors();
  const { grades, grade, setGrade, gradeLabel } = useGrade();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 16, backgroundColor: C.background }]}>
      <LinearGradient
        colors={Gradients.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.banner}
      >
        <View style={styles.bannerRow}>
          <View style={styles.bannerText}>
            <Text style={styles.title}>{title}</Text>
            {bangla ? <Text style={styles.bangla}>{bangla}</Text> : null}
          </View>
          <View style={styles.classPill}>
            <Ionicons name="school-outline" size={13} color="#FFFFFF" />
            <Text style={styles.classPillText}>{gradeLabel}</Text>
          </View>
        </View>
        {count ? <Text style={styles.count}>{count}</Text> : null}
      </LinearGradient>

      <View style={styles.tabsWrap}>
        <GradeTabs grades={grades} active={grade} onChange={setGrade} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingBottom: 16,
    // Sticky headers need an elevation on Android, otherwise the list scrolls
    // straight over them instead of underneath.
    elevation: 2,
    zIndex: 2,
  },
  banner: {
    marginHorizontal: 16,
    borderRadius: Radius.lg,
    padding: 18,
  },
  tabsWrap: { marginTop: 14 },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  bannerText: { flex: 1 },
  title: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  bangla: { color: 'rgba(255,255,255,0.85)', fontSize: 12, marginTop: 2 },
  classPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  classPillText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
  count: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 10 },
});
