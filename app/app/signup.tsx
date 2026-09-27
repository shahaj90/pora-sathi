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
import { AuthField } from '../components/AuthField';
import { Colors, Radius } from '../constants/theme';
import { GRADES, type GradeId } from '../constants/data';
import { useAuth } from '../context/AuthContext';

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
    setTimeout(() => {
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
            colors={['#FF5C8A', '#FF8A3D']}
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

          <View style={styles.card}>
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
                {GRADES.map((g) => {
                  const selected = gradeIds.includes(g.id);
                  return (
                    <Pressable
                      key={g.id}
                      onPress={() => toggleGrade(g.id)}
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked: selected }}
                      style={[styles.chip, selected && styles.chipActive]}
                    >
                      {selected ? <Ionicons name="checkmark" size={14} color="#fff" /> : null}
                      <Text style={[styles.chipText, selected && styles.chipTextActive]}>
                        {g.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              {errors.grades ? <Text style={styles.error}>{errors.grades}</Text> : null}
            </View>

            <Pressable
              onPress={submit}
              disabled={loading}
              style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
            >
              <Text style={styles.btnText}>{loading ? 'Creating account…' : 'Sign Up'}</Text>
              {!loading ? <Ionicons name="arrow-forward" size={18} color="#fff" /> : null}
            </Pressable>

            <View style={styles.switchRow}>
              <Text style={styles.switchText}>Already have an account? </Text>
              <Pressable onPress={() => router.push('/login')}>
                <Text style={styles.switchLink}>Log in</Text>
              </Pressable>
            </View>

            <Pressable onPress={() => router.replace('/')} style={styles.guest}>
              <Text style={styles.guestText}>Continue as guest</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FF5C8A' },
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
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  heroTitle: { color: '#fff', fontSize: 24, fontWeight: '900' },
  heroSub: { color: 'rgba(255,255,255,0.9)', fontSize: 13, marginTop: 4, textAlign: 'center' },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    marginHorizontal: 16,
    marginTop: -36,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 999,
    paddingVertical: 14,
    marginTop: 6,
  },
  btnPressed: { opacity: 0.85 },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '800' },
  gradeWrap: { marginBottom: 14 },
  gradeLabel: { fontSize: 13, fontWeight: '700', color: Colors.text, marginBottom: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 13, fontWeight: '700', color: Colors.muted },
  chipTextActive: { color: '#fff' },
  error: { fontSize: 12, color: '#FF5C5C', marginTop: 6, fontWeight: '600' },
  switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  switchText: { color: Colors.muted, fontSize: 13 },
  switchLink: { color: Colors.primary, fontSize: 13, fontWeight: '800' },
  guest: { alignItems: 'center', marginTop: 12, paddingVertical: 6 },
  guestText: {
    color: Colors.muted,
    fontSize: 13,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
