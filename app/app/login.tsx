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
import { Colors, Gradients, Radius } from '../constants/theme';
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
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

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
    timer.current = setTimeout(() => {
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
            colors={Gradients.header}
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

          <Card radius={Radius.lg} padding={18} style={styles.card}>
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

            <Button
              title={loading ? 'Logging in…' : 'Log In'}
              onPress={submit}
              loading={loading}
              icon="arrow-forward"
              style={styles.submit}
            />

            <Button
              title="Use demo account"
              onPress={fillDemo}
              variant="soft"
              icon="sparkles-outline"
            />

            <View style={styles.switchRow}>
              <Text style={styles.switchText}>New here? </Text>
              <Pressable onPress={() => router.push('/signup')}>
                <Text style={styles.switchLink}>Create an account</Text>
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
  submit: { marginTop: 6 },
  formError: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.dangerSoft,
    borderRadius: Radius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  formErrorText: { flex: 1, fontSize: 12.5, color: Colors.dangerText, fontWeight: '600' },
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
