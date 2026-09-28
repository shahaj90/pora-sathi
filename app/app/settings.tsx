import { Ionicons } from '@expo/vector-icons';
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
import {
  ScreenHeader,
  screenCard,
  screenSavedBanner,
  screenSavedText,
  screenSectionTitle,
} from '../components/Screen';
import { Chip } from '../components/ui/Chip';
import { SettingsRow } from '../components/ui/SettingsRow';
import { type Grade, type GradeId, type Teacher } from '../constants/data';
import { Radius } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import { useColors, type ThemePreference } from '../context/ColorSchemeContext';
import gradesJson from '../data/grades.json';
import teachersJson from '../data/teachers.json';

const GRADES = gradesJson as Grade[];
const TEACHERS = teachersJson as Teacher[];

const THEME_OPTIONS: {
  value: ThemePreference;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { value: 'system', label: 'System', icon: 'phone-portrait-outline' },
  { value: 'light', label: 'Light', icon: 'sunny-outline' },
  { value: 'dark', label: 'Dark', icon: 'moon-outline' },
];

export default function SettingsScreen() {
  const { colors: C, scheme, preference, setPreference } = useColors();
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
  const [saved, setSaved] = useState(false);

  const systemLabel = scheme === 'dark' ? 'currently dark' : 'currently light';

  const s = makeStyles(C);

  if (!user) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.center}>
          <Text style={s.centerText}>You are not signed in.</Text>
          <Pressable style={s.loginBtn} onPress={() => router.replace('/login')}>
            <Text style={s.loginText}>Go to Login</Text>
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
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView style={s.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          <ScreenHeader title="Settings" onBack={() => router.back()} />

          <View style={s.card}>
            {saved ? (
              <View style={s.savedBanner}>
                <Ionicons name="checkmark-circle" size={18} color={C.success} />
                <Text style={s.savedText}>Settings saved successfully</Text>
              </View>
            ) : null}

            <Text style={s.sectionTitle}>Your Classes</Text>
            <View style={s.chips}>
              {GRADES.map((g) => (
                <Chip
                  key={g.id}
                  label={g.label}
                  selected={gradeIds.includes(g.id)}
                  onToggle={() => toggleGrade(g.id)}
                />
              ))}
            </View>

            <Text style={s.sectionTitle}>Preferred Teacher</Text>
            <View style={s.teachers}>
              {TEACHERS.map((t) => {
                const selected = teacherId === t.id;
                return (
                  <Pressable
                    key={t.id}
                    onPress={() => setTeacherId(t.id)}
                    style={[s.teacherCard, selected && s.teacherCardActive]}
                  >
                    <View style={[s.teacherIcon, selected && { backgroundColor: C.primary }]}>
                      <Ionicons name="person" size={18} color={selected ? C.surface : C.primary} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[s.teacherName, selected && s.teacherNameActive]}>{t.name}</Text>
                      <Text style={s.teacherSub}>{t.subject}</Text>
                    </View>
                    {selected ? (
                      <Ionicons name="checkmark-circle" size={20} color={C.primary} />
                    ) : null}
                  </Pressable>
                );
              })}
            </View>

            <Text style={s.sectionTitle}>System</Text>
            <View style={s.rows}>
              <SettingsRow
                icon="notifications-outline"
                label="Push Notifications"
                value={notifications}
                onToggle={setNotifications}
              />
              <View style={s.themeBlock}>
                <View style={s.themeHeader}>
                  <Ionicons name="contrast-outline" size={18} color={C.primary} />
                  <Text style={s.themeTitle}>Appearance</Text>
                  <Text style={s.themeValue}>
                    {preference === 'system' ? 'System' : preference === 'dark' ? 'Dark' : 'Light'}
                  </Text>
                </View>
                <View style={s.themeOptions}>
                  {THEME_OPTIONS.map((opt) => {
                    const active = preference === opt.value;
                    return (
                      <Pressable
                        key={opt.value}
                        onPress={() => setPreference(opt.value)}
                        accessibilityRole="radio"
                        accessibilityState={{ selected: active }}
                        style={[
                          s.themeOption,
                          active && { backgroundColor: C.primary, borderColor: C.primary },
                        ]}
                      >
                        <Ionicons
                          name={opt.icon}
                          size={16}
                          color={active ? C.surface : C.textSecondary}
                        />
                        <Text
                          style={[
                            s.themeOptionText,
                            { color: active ? C.surface : C.textSecondary },
                          ]}
                        >
                          {opt.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
                {preference === 'system' ? (
                  <Text style={s.themeHint}>
                    Following your device setting{systemLabel ? ` (${systemLabel})` : ''}.
                  </Text>
                ) : null}
              </View>
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

            <Pressable style={s.saveBtn} onPress={saveSettings}>
              <Text style={s.saveText}>Save Settings</Text>
            </Pressable>
            <Pressable style={s.logoutBtn} onPress={logout}>
              <Text style={s.logoutText}>Log Out</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const makeStyles = (C: ReturnType<typeof useColors>['colors']) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.background },
    flex: { flex: 1 },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
    centerText: { fontSize: 14, color: C.textSecondary, marginBottom: 16 },
    loginBtn: {
      backgroundColor: C.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 999,
    },
    loginText: { color: C.surface, fontWeight: '800', fontSize: 14 },
    scroll: { paddingBottom: 24 },
    themeBlock: {
      backgroundColor: C.background,
      borderWidth: 1,
      borderColor: C.border,
      borderRadius: Radius.md,
      padding: 12,
      gap: 10,
    },
    themeHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    themeTitle: { flex: 1, fontSize: 14, fontWeight: '800', color: C.text },
    themeValue: { fontSize: 12, fontWeight: '700', color: C.textSecondary },
    themeOptions: { flexDirection: 'row', gap: 8 },
    themeOption: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      paddingVertical: 10,
      borderRadius: Radius.sm,
      borderWidth: 1,
      borderColor: C.border,
      backgroundColor: C.surface,
    },
    themeOptionText: { fontSize: 12, fontWeight: '700' },
    themeHint: { fontSize: 11, color: C.muted },
    card: screenCard(C),
    sectionTitle: screenSectionTitle(C),
    chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 6 },
    teachers: { gap: 8, marginBottom: 8 },
    teacherCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      backgroundColor: C.background,
      borderWidth: 1,
      borderColor: C.border,
      borderRadius: Radius.md,
      padding: 12,
    },
    teacherCardActive: { borderColor: C.primary, backgroundColor: C.primarySoft },
    teacherIcon: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: C.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    teacherName: { fontSize: 14, fontWeight: '800', color: C.text },
    teacherNameActive: { color: C.primary },
    teacherSub: { fontSize: 12, color: C.textSecondary, marginTop: 2 },
    rows: { gap: 8, marginBottom: 16 },
    savedBanner: screenSavedBanner(C),
    savedText: screenSavedText(C),
    saveBtn: {
      backgroundColor: C.primary,
      borderRadius: 999,
      paddingVertical: 14,
      alignItems: 'center',
      marginBottom: 10,
    },
    saveText: { color: C.surface, fontWeight: '800', fontSize: 15 },
    logoutBtn: { borderRadius: 999, paddingVertical: 14, alignItems: 'center' },
    logoutText: { color: C.danger, fontWeight: '800', fontSize: 15 },
  });
