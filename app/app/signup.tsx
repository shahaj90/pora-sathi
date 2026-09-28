import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Chip } from '../components/ui/Chip';
import { FormField } from '../components/ui/FormField';
import { Gradients, Radius } from '../constants/theme';
import { type Grade, type GradeId } from '../constants/data';
import { useAuth } from '../context/AuthContext';
import { useColors } from '../context/ColorSchemeContext';
import gradesJson from '../data/grades.json';

const GRADES = gradesJson as Grade[];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Signup() {
  const { colors: C } = useColors();
  const router = useRouter();
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [gradeIds, setGradeIds] = useState<GradeId[]>(['c10']);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirm?: string;
    grades?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const clear = (key: keyof typeof errors) => setErrors((e) => ({ ...e, [key]: undefined }));

  const toggleGrade = (id: GradeId) => {
    setGradeIds((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]));
    clear('grades');
  };

  const submit = () => {
    const next: typeof errors = {};
    if (!EMAIL_RE.test(email.trim())) next.email = 'Enter a valid email address';
    if (password.length < 6) next.password = 'Password must be at least 6 characters';
    if (confirm !== password) next.confirm = 'Passwords do not match';
    if (gradeIds.length === 0) next.grades = 'Select at least one class';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // Mock signup — register() creates a local session.
    setLoading(true);
    timer.current = setTimeout(() => {
      register(email, gradeIds);
      setLoading(false);
      router.replace('/');
    }, 900);
  };

  const s = makeStyles(C);

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView style={s.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={s.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <LinearGradient
            colors={Gradients.sunset}
            style={s.hero}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={s.logo}>
              <Ionicons name="person-add" size={28} color={C.pink} />
            </View>
            <Text style={s.heroTitle}>Join Pora Sathi</Text>
            <Text style={s.heroSub}>Create an account for Classes 5–10 + SSC prep</Text>
          </LinearGradient>

          <Card radius={Radius.lg} padding={18} style={s.card}>
            <FormField
              label="Email"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                clear('email');
              }}
              placeholder="you@example.com"
              icon="mail-outline"
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <FormField
              label="Password"
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                clear('password');
              }}
              placeholder="Min. 6 characters"
              icon="lock-closed-outline"
              error={errors.password}
              secureTextEntry
            />
            <FormField
              label="Confirm password"
              value={confirm}
              onChangeText={(t) => {
                setConfirm(t);
                clear('confirm');
              }}
              placeholder="Repeat your password"
              icon="checkmark-circle-outline"
              error={errors.confirm}
              secureTextEntry
            />

            <View style={s.gradeWrap}>
              <Text style={s.gradeLabel}>Class (select one or more)</Text>
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
              {errors.grades ? <Text style={s.error}>{errors.grades}</Text> : null}
            </View>

            <Button
              title={loading ? 'Creating account…' : 'Sign Up'}
              onPress={submit}
              loading={loading}
              icon="arrow-forward"
              style={s.submit}
            />

            <View style={s.switchRow}>
              <Text style={s.switchText}>Already have an account? </Text>
              <Pressable onPress={() => router.push('/login')}>
                <Text style={s.switchLink}>Log in</Text>
              </Pressable>
            </View>

            <Pressable onPress={() => router.replace('/')} style={s.guest}>
              <Text style={s.guestText}>Continue as guest</Text>
            </Pressable>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const makeStyles = (C: ReturnType<typeof useColors>['colors']) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.background },
    flex: { flex: 1 },
    scroll: { flexGrow: 1, backgroundColor: C.background },
    hero: {
      paddingTop: 48,
      paddingBottom: 64,
      paddingHorizontal: 24,
      borderBottomLeftRadius: Radius.xl,
      borderBottomRightRadius: Radius.xl,
      alignItems: 'center',
    },
    logo: {
      width: 68,
      height: 68,
      borderRadius: 22,
      backgroundColor: 'rgba(255,255,255,0.18)',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.3)',
    },
    heroTitle: { color: C.surface, fontSize: 26, fontWeight: '900' },
    heroSub: { color: 'rgba(255,255,255,0.82)', fontSize: 13, marginTop: 6, textAlign: 'center' },
    card: {
      marginHorizontal: 16,
      marginTop: -36,
    },
    gradeWrap: { marginBottom: 14 },
    gradeLabel: { fontSize: 13, fontWeight: '700', color: C.text, marginBottom: 8 },
    chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    submit: { marginTop: 6 },
    error: { fontSize: 12, color: C.danger, marginTop: 6, fontWeight: '600' },
    switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
    switchText: { color: C.textSecondary, fontSize: 13 },
    switchLink: { color: C.primary, fontSize: 13, fontWeight: '800' },
    guest: { alignItems: 'center', marginTop: 12, paddingVertical: 6 },
    guestText: {
      color: C.textSecondary,
      fontSize: 13,
      fontWeight: '700',
      textDecorationLine: 'underline',
    },
  });
