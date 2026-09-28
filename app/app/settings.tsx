import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Chip } from '../components/ui/Chip';
import { SettingsRow } from '../components/ui/SettingsRow';
import { type Grade, type GradeId, type Teacher } from '../constants/data';
import { Colors, Gradients, Radius } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import gradesJson from '../data/grades.json';
import teachersJson from '../data/teachers.json';

const GRADES = gradesJson as Grade[];
const TEACHERS = teachersJson as Teacher[];

export default function SettingsScreen() {
  const router = useRouter();
  const { user, updateUser, logout } = useAuth();

  const [gradeIds, setGradeIds] = useState<GradeId[]>(
    (user?.grades
      .map((label) => GRADES.find((g) => g.label === label)?.id)
      .filter(Boolean) as GradeId[]) ?? ['c10'],
  );
  const [teacherId, setTeacherId] = useState<string | null>(
    TEACHERS.find((t) => t.name === user?.teacher)?.id ?? null,
  );
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!user) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.centerText}>You are not signed in.</Text>
          <Pressable style={styles.loginBtn} onPress={() => router.replace('/login')}>
            <Text style={styles.loginText}>Go to Login</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const toggleGrade = (id: GradeId) => {
    setGradeIds((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]));
  };

  const saveSettings = () => {
    const grades = GRADES.filter((g) => gradeIds.includes(g.id)).map((g) => g.label);
    const teacher = TEACHERS.find((t) => t.id === teacherId)?.name;
    updateUser({ grades, teacher });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          <LinearGradient colors={Gradients.header} style={styles.hero}>
            <View style={styles.nav}>
              <Pressable onPress={() => router.back()} style={styles.back}>
                <Ionicons name="arrow-back" size={20} color={Colors.surface} />
              </Pressable>
              <Text style={styles.heroTitle}>Settings</Text>
              <View style={{ width: 38 }} />
            </View>
          </LinearGradient>

          <View style={styles.card}>
            {saved ? (
              <View style={styles.savedBanner}>
                <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
                <Text style={styles.savedText}>Settings saved successfully</Text>
              </View>
            ) : null}

            <Text style={styles.sectionTitle}>Your Classes</Text>
            <View style={styles.chips}>
              {GRADES.map((g) => (
                <Chip
                  key={g.id}
                  label={g.label}
                  selected={gradeIds.includes(g.id)}
                  onToggle={() => toggleGrade(g.id)}
                />
              ))}
            </View>

            <Text style={styles.sectionTitle}>Preferred Teacher</Text>
            <View style={styles.teachers}>
              {TEACHERS.map((t) => {
                const selected = teacherId === t.id;
                return (
                  <Pressable
                    key={t.id}
                    onPress={() => setTeacherId(t.id)}
                    style={[styles.teacherCard, selected && styles.teacherCardActive]}
                  >
                    <View
                      style={[styles.teacherIcon, selected && { backgroundColor: Colors.primary }]}
                    >
                      <Ionicons
                        name="person"
                        size={18}
                        color={selected ? Colors.surface : Colors.primary}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.teacherName, selected && styles.teacherNameActive]}>
                        {t.name}
                      </Text>
                      <Text style={styles.teacherSub}>{t.subject}</Text>
                    </View>
                    {selected ? (
                      <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                    ) : null}
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.sectionTitle}>System</Text>
            <View style={styles.rows}>
              <SettingsRow
                icon="notifications-outline"
                label="Push Notifications"
                value={notifications}
                onToggle={setNotifications}
              />
              <SettingsRow
                icon="moon-outline"
                label="Dark Mode"
                value={darkMode}
                onToggle={setDarkMode}
              />
              <SettingsRow
                icon="language-outline"
                label="Language"
                value={undefined}
                onPress={() => {}}
                chevron
              />
              <SettingsRow
                icon="help-circle-outline"
                label="Help & Support"
                value={undefined}
                onPress={() => {}}
                chevron
              />
            </View>

            <Pressable style={styles.saveBtn} onPress={saveSettings}>
              <Text style={styles.saveText}>Save Settings</Text>
            </Pressable>
            <Pressable style={styles.logoutBtn} onPress={logout}>
              <Text style={styles.logoutText}>Log Out</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  centerText: { fontSize: 14, color: Colors.textSecondary, marginBottom: 16 },
  loginBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
  },
  loginText: { color: Colors.surface, fontWeight: '800', fontSize: 14 },
  scroll: { paddingBottom: 24 },
  hero: {
    paddingTop: 54,
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
  },
  nav: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  back: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: { color: Colors.surface, fontSize: 18, fontWeight: '800' },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    marginHorizontal: 16,
    marginTop: -24,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    marginTop: 8,
    marginBottom: 10,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 6 },
  teachers: { gap: 8, marginBottom: 8 },
  teacherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    padding: 12,
  },
  teacherCardActive: { borderColor: Colors.primary, backgroundColor: Colors.primarySoft },
  teacherIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teacherName: { fontSize: 14, fontWeight: '800', color: Colors.text },
  teacherNameActive: { color: Colors.primary },
  teacherSub: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  rows: { gap: 8, marginBottom: 16 },
  savedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.successSoft,
    borderRadius: Radius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  savedText: { color: Colors.success, fontWeight: '700', fontSize: 13 },
  saveBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveText: { color: Colors.surface, fontWeight: '800', fontSize: 15 },
  logoutBtn: { borderRadius: 999, paddingVertical: 14, alignItems: 'center' },
  logoutText: { color: Colors.danger, fontWeight: '800', fontSize: 15 },
});
