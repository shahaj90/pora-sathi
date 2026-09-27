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
import { AuthField } from '../components/AuthField';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Chip } from '../components/ui/Chip';
import { Colors, Gradients, Radius } from '../constants/theme';
import { type Grade, type GradeId } from '../constants/data';
import { useAuth } from '../context/AuthContext';
import gradesJson from '../data/grades.json';

const GRADES = gradesJson as Grade[];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Signup() {
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

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <LinearGradient
            colors={Gradients.sunset}
            style={styles.hero}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.logo}>
              <Ionicons name="person-add" size={28} color={Colors.pink} />
            </View>
            <Text style={styles.heroTitle}>Join Pora Sathi</Text>
            <Text style={styles.heroSub}>Create an account for Classes 5–10 + SSC prep</Text>
          </LinearGradient>

          <Card radius={Radius.lg} padding={18} style={styles.card}>
            <AuthField
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
            />
            <AuthField
              label="Password"
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                clear('password');
              }}
              placeholder="Min. 6 characters"
              icon="lock-closed-outline"
              error={errors.password}
              secure
            />
            <AuthField
              label="Confirm password"
              value={confirm}
              onChangeText={(t) => {
                setConfirm(t);
                clear('confirm');
              }}
              placeholder="Repeat your password"
              icon="checkmark-circle-outline"
              error={errors.confirm}
              secure
            />

            <View style={styles.gradeWrap}>
              <Text style={styles.gradeLabel}>Class (select one or more)</Text>
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
              {errors.grades ? <Text style={styles.error}>{errors.grades}</Text> : null}
            </View>

            <Button
              title={loading ? 'Creating account…' : 'Sign Up'}
              onPress={submit}
              loading={loading}
              icon="arrow-forward"
              style={styles.submit}
            />

            <View style={styles.switchRow}>
              <Text style={styles.switchText}>Already have an account? </Text>
              <Pressable onPress={() => router.push('/login')}>
                <Text style={styles.switchLink}>Log in</Text>
              </Pressable>
            </View>

            <Pressable onPress={() => router.replace('/')} style={styles.guest}>
              <Text style={styles.guestText}>Continue as guest</Text>
            </Pressable>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, backgroundColor: Colors.background },
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
  heroTitle: { color: Colors.surface, fontSize: 26, fontWeight: '900' },
  heroSub: { color: 'rgba(255,255,255,0.82)', fontSize: 13, marginTop: 6, textAlign: 'center' },
  card: {
    marginHorizontal: 16,
    marginTop: -36,
  },
  gradeWrap: { marginBottom: 14 },
  gradeLabel: { fontSize: 13, fontWeight: '700', color: Colors.text, marginBottom: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  submit: { marginTop: 6 },
  error: { fontSize: 12, color: Colors.danger, marginTop: 6, fontWeight: '600' },
  switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  switchText: { color: Colors.textSecondary, fontSize: 13 },
  switchLink: { color: Colors.primary, fontSize: 13, fontWeight: '800' },
  guest: { alignItems: 'center', marginTop: 12, paddingVertical: 6 },
  guestText: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
