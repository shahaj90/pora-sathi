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
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from '../components/ui/Avatar';
import { BottomSheetMenu, type MenuItem } from '../components/ui/BottomSheetMenu';
import { Button } from '../components/ui/Button';
import { FormField } from '../components/ui/FormField';
import { Colors, Gradients, Radius } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

const NAME_RE = /^[a-zA-Z\s'-]{2,40}$/;
const PHONE_RE = /^[\d+\-()\s]{10,20}$/;

export default function ProfileScreen() {
  const router = useRouter();
  const { user, updateUser, logout } = useAuth();

  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [avatar, setAvatar] = useState(user?.avatar ?? null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [saved, setSaved] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  if (!user) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.centerText}>You are not signed in.</Text>
          <Button title="Go to Login" onPress={() => router.replace('/login')} />
        </View>
      </SafeAreaView>
    );
  }

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0]?.uri) {
      setAvatar(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return;
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0]?.uri) {
      setAvatar(result.assets[0].uri);
    }
  };

  const clearAvatar = () => setAvatar(null);

  const menuItems: MenuItem[] = [
    { id: 'gallery', label: 'Choose from Gallery', icon: 'images-outline', onPress: pickImage },
    { id: 'camera', label: 'Take Photo', icon: 'camera-outline', onPress: takePhoto },
    ...(avatar
      ? ([
          { id: 'remove', label: 'Remove Photo', icon: 'trash-outline', onPress: clearAvatar },
        ] as MenuItem[])
      : []),
  ];

  const saveProfile = () => {
    const next: Record<string, string> = {};
    if (!NAME_RE.test(name.trim())) next.name = 'Enter a valid name';
    if (phone && !PHONE_RE.test(phone.trim())) next.phone = 'Enter a valid phone number';
    if (newPassword || confirmPassword || currentPassword) {
      if (currentPassword.length < 6) next.currentPassword = 'Current password is required';
      if (newPassword.length < 6) next.newPassword = 'Min. 6 characters';
      if (newPassword !== confirmPassword) next.confirmPassword = 'Passwords do not match';
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    updateUser({ name: name.trim(), phone: phone.trim(), avatar: avatar ?? undefined });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);

    // Password update is mocked: reset fields after.
    if (newPassword) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
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
              <Text style={styles.heroTitle}>My Profile</Text>
              <View style={{ width: 38 }} />
            </View>

            <View style={styles.avatarWrap}>
              <Avatar
                uri={avatar}
                name={name}
                size={96}
                onPress={() => setMenuVisible(true)}
                editable
              />
              <Text style={styles.email}>{user.email}</Text>
              <Text style={styles.grade}>{user.grades.join(', ')}</Text>
            </View>
          </LinearGradient>

          <View style={styles.card}>
            {saved ? (
              <View style={styles.savedBanner}>
                <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
                <Text style={styles.savedText}>Profile updated successfully</Text>
              </View>
            ) : null}

            <FormField
              label="Full Name"
              icon="person-outline"
              value={name}
              onChangeText={(t) => {
                setName(t);
                setErrors((e) => ({ ...e, name: undefined }));
              }}
              error={errors.name ?? ''}
              autoCapitalize="words"
            />
            <FormField
              label="Email"
              icon="mail-outline"
              value={user.email}
              editable={false}
              selectTextOnFocus={false}
            />
            <FormField
              label="Phone Number"
              icon="call-outline"
              value={phone}
              onChangeText={(t) => {
                setPhone(t);
                setErrors((e) => ({ ...e, phone: undefined }));
              }}
              error={errors.phone ?? ''}
              keyboardType="phone-pad"
            />

            <Text style={styles.sectionTitle}>Change Password</Text>
            <FormField
              label="Current Password"
              icon="lock-closed-outline"
              value={currentPassword}
              onChangeText={(t) => {
                setCurrentPassword(t);
                setErrors((e) => ({ ...e, currentPassword: undefined }));
              }}
              error={errors.currentPassword ?? ''}
              secureTextEntry
            />
            <FormField
              label="New Password"
              icon="key-outline"
              value={newPassword}
              onChangeText={(t) => {
                setNewPassword(t);
                setErrors((e) => ({ ...e, newPassword: undefined }));
              }}
              error={errors.newPassword ?? ''}
              secureTextEntry
            />
            <FormField
              label="Confirm New Password"
              icon="checkmark-circle-outline"
              value={confirmPassword}
              onChangeText={(t) => {
                setConfirmPassword(t);
                setErrors((e) => ({ ...e, confirmPassword: undefined }));
              }}
              error={errors.confirmPassword ?? ''}
              secureTextEntry
            />

            <Button
              title="Save Changes"
              onPress={saveProfile}
              icon="save-outline"
              style={styles.saveBtn}
            />
            <Button title="Log Out" onPress={logout} variant="ghost" icon="log-out-outline" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomSheetMenu
        visible={menuVisible}
        title="Update Profile Photo"
        items={menuItems}
        onClose={() => setMenuVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  centerText: { fontSize: 14, color: Colors.textSecondary, marginBottom: 16 },
  scroll: { paddingBottom: 24 },
  hero: {
    paddingTop: 54,
    paddingHorizontal: 16,
    paddingBottom: 28,
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
    alignItems: 'center',
  },
  nav: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  avatarWrap: { alignItems: 'center' },
  email: { color: Colors.surface, fontSize: 15, fontWeight: '700', marginTop: 12 },
  grade: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 2 },
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
    marginBottom: 6,
  },
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
  saveBtn: { marginTop: 6, marginBottom: 8 },
});
