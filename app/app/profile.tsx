import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
  ScreenHeader,
  screenCard,
  screenSavedBanner,
  screenSavedText,
  screenSectionTitle,
} from '../components/Screen';
import { Avatar } from '../components/ui/Avatar';
import { BottomSheetMenu, type MenuItem } from '../components/ui/BottomSheetMenu';
import { Button } from '../components/ui/Button';
import { FormField } from '../components/ui/FormField';
import { useAuth } from '../context/AuthContext';
import { useColors } from '../context/ColorSchemeContext';

const NAME_RE = /^[a-zA-Z\s'-]{2,40}$/;
const PHONE_RE = /^[\d+\-()\s]{10,20}$/;

export default function ProfileScreen() {
  const { colors: C } = useColors();
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

  const s = makeStyles(C);

  if (!user) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.center}>
          <Text style={s.centerText}>You are not signed in.</Text>
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
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView style={s.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          <ScreenHeader title="My Profile" subtitle={user.email} onBack={() => router.back()} />

          <View style={s.card}>
            <View style={s.identity}>
              <Avatar
                uri={avatar}
                name={name}
                size={80}
                onPress={() => setMenuVisible(true)}
                editable
              />
              <Text style={s.identityName} numberOfLines={1}>
                {name || 'Your Name'}
              </Text>
              <Text style={s.identityGrade} numberOfLines={1}>
                {user.grades.join(', ')}
              </Text>
            </View>

            {saved ? (
              <View style={s.savedBanner}>
                <Ionicons name="checkmark-circle" size={18} color={C.success} />
                <Text style={s.savedText}>Profile updated successfully</Text>
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

            <Text style={s.sectionTitle}>Change Password</Text>
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
              style={s.saveBtn}
            />
            <Button
              title="Settings"
              onPress={() => router.push('/settings')}
              variant="soft"
              icon="settings-outline"
              style={s.settingsBtn}
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

const makeStyles = (C: ReturnType<typeof useColors>['colors']) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.background },
    flex: { flex: 1 },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
    centerText: { fontSize: 14, color: C.textSecondary, marginBottom: 16 },
    scroll: { paddingBottom: 24 },
    identity: { alignItems: 'center', marginBottom: 18 },
    identityName: { fontSize: 17, fontWeight: '800', color: C.text, marginTop: 12 },
    identityGrade: { fontSize: 13, color: C.textSecondary, marginTop: 2 },
    card: screenCard(C),
    sectionTitle: screenSectionTitle(C),
    savedBanner: screenSavedBanner(C),
    savedText: screenSavedText(C),
    saveBtn: { marginTop: 6, marginBottom: 8 },
    settingsBtn: { marginBottom: 8 },
  });
