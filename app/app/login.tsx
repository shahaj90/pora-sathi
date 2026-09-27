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
import { DEMO_USER } from '../constants/demoUser';
import { useAuth } from '../context/AuthContext';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);

  const fillDemo = () => {
    setEmail(DEMO_USER.email);
    setPassword(DEMO_USER.password);
    setErrors({});
  };

  const submit = () => {
    const next: typeof errors = {};
    if (!EMAIL_RE.test(email.trim())) next.email = 'Enter a valid email address';
    if (password.length < 6) next.password = 'Password must be at least 6 characters';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    // Simulated network delay — login() checks the demo credentials.
    setTimeout(() => {
      const formError = login(email, password);
      setLoading(false);
      if (formError) {
        setErrors({ form: formError });
        return;
      }
      router.replace('/');
    }, 600);
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
            colors={['#6C3CE0', '#8B5CF6', '#B794FF']}
            style={styles.hero}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.logo}>
              <Ionicons name="school" size={28} color={Colors.primary} />
            </View>
            <Text style={styles.heroTitle}>Welcome back!</Text>
            <Text style={styles.heroSub}>Log in to continue learning with Pora Sathi</Text>
          </LinearGradient>

          <View style={styles.card}>
            <AuthField
              label="Email"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                setErrors((e) => ({ ...e, email: undefined }));
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
                setErrors((e) => ({ ...e, password: undefined }));
              }}
              placeholder="••••••••"
              icon="lock-closed-outline"
              error={errors.password}
              secure
            />

            {errors.form ? (
              <View style={styles.formError}>
                <Ionicons name="alert-circle-outline" size={16} color="#FF5C5C" />
                <Text style={styles.formErrorText}>{errors.form}</Text>
              </View>
            ) : null}

            <Pressable
              onPress={submit}
              disabled={loading}
              style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
            >
              <Text style={styles.btnText}>{loading ? 'Logging in…' : 'Log In'}</Text>
              {!loading ? <Ionicons name="arrow-forward" size={18} color="#fff" /> : null}
            </Pressable>

            <Pressable onPress={fillDemo} style={styles.demoBtn}>
              <Ionicons name="sparkles-outline" size={16} color={Colors.primary} />
              <Text style={styles.demoText}>Use demo account ({DEMO_USER.email})</Text>
            </Pressable>

            <View style={styles.switchRow}>
              <Text style={styles.switchText}>New here? </Text>
              <Pressable onPress={() => router.push('/signup')}>
                <Text style={styles.switchLink}>Create an account</Text>
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
  safe: { flex: 1, backgroundColor: '#6C3CE0' },
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
  heroSub: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 4, textAlign: 'center' },
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
  formError: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFEDED',
    borderRadius: Radius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  formErrorText: { flex: 1, fontSize: 12.5, color: '#C81E1E', fontWeight: '600' },
  demoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.violetLight,
    borderRadius: 999,
    paddingVertical: 12,
    marginTop: 10,
  },
  demoText: { color: Colors.primary, fontSize: 13, fontWeight: '800' },
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
