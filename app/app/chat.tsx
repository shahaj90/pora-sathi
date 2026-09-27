import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Radius } from '../constants/theme';

interface Msg {
  id: string;
  role: 'ai' | 'user';
  text: string;
}

const SUGGESTIONS = [
  'Quadratic equation বুঝিয়ে দাও',
  "Newton's 2nd law example দাও",
  'SSC English paragraph format',
  'Photosynthesis quiz নাও',
];

export default function ChatScreen() {
  const router = useRouter();
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: '1',
      role: 'ai',
      text: 'Assalamu Alaikum! আমি পড়া সাথী 👋\nClass 10-এর কোন topic-এ help লাগবে? Math, Physics, Chemistry, Biology, English — যেকোনো প্রশ্ন করো, বাংলায় বা English-এ।',
    },
  ]);
  const [input, setInput] = useState('');

  const send = (text?: string) => {
    const value = (text ?? input).trim();
    if (!value) return;
    const userMsg: Msg = { id: Date.now().toString(), role: 'user', text: value };
    const aiMsg: Msg = {
      id: (Date.now() + 1).toString(),
      role: 'ai',
      text: `ভালো প্রশ্ন! "${value}" — এটা আমি step-by-step বুঝিয়ে দিচ্ছি।\n\n1️⃣ প্রথমে মূল concept\n2️⃣ তারপর উদাহরণ\n3️⃣ শেষে একটা mini-quiz\n\n(ডেমো UI — backend যুক্ত করলে এখানে আসল AI উত্তর আসবে।)`,
    };
    setMsgs((m) => [...m, userMsg, aiMsg]);
    setInput('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <LinearGradient colors={['#6C3CE0', '#8B5CF6']} style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.back}>
            <Ionicons name="arrow-back" size={20} color={Colors.surface} />
          </Pressable>
          <View style={styles.botAvatar}>
            <Ionicons name="sparkles" size={20} color={Colors.surface} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.title}>Pora Sathi AI</Text>
            <Text style={styles.online}>● Online · Class 10 tutor</Text>
          </View>
          <Ionicons name="ellipsis-vertical" size={18} color={Colors.surface} />
        </LinearGradient>

        <FlatList
          data={msgs}
          keyExtractor={(m) => m.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={[styles.bubble, item.role === 'user' ? styles.user : styles.ai]}>
              <Text style={[styles.msgText, item.role === 'user' && styles.userText]}>
                {item.text}
              </Text>
            </View>
          )}
          ListHeaderComponent={
            <View style={styles.chips}>
              {SUGGESTIONS.map((s) => (
                <Pressable key={s} style={styles.chip} onPress={() => send(s)}>
                  <Text style={styles.chipText}>{s}</Text>
                </Pressable>
              ))}
            </View>
          }
        />

        <View style={styles.inputRow}>
          <Pressable style={styles.attach}>
            <Ionicons name="add" size={22} color={Colors.primary} />
          </Pressable>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask anything… যেকোনো প্রশ্ন করো"
            style={styles.input}
            multiline
            onSubmitEditing={() => send()}
          />
          <Pressable style={styles.send} onPress={() => send()}>
            <Ionicons name="send" size={18} color={Colors.surface} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.surface },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 54,
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  back: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  title: { color: Colors.surface, fontWeight: '800', fontSize: 16 },
  online: { color: 'rgba(255,255,255,0.85)', fontSize: 12 },
  list: { padding: 16, gap: 10, paddingBottom: 24 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  chip: {
    backgroundColor: Colors.violetLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  chipText: { color: Colors.primary, fontSize: 12, fontWeight: '700' },
  bubble: { maxWidth: '82%', padding: 12, borderRadius: Radius.md },
  ai: { backgroundColor: Colors.bubble, alignSelf: 'flex-start', borderBottomLeftRadius: 4 },
  user: { backgroundColor: Colors.primary, alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  msgText: { fontSize: 13.5, lineHeight: 19, color: Colors.text },
  userText: { color: Colors.surface },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  attach: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.violetLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    maxHeight: 100,
  },
  send: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
