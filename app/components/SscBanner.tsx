import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { SscBanner } from '../constants/data';
import { Radius, Shadow } from '../constants/theme';
import { useColors } from '../context/ColorSchemeContext';

export function SscBannerCard({ banner, onPress }: { banner: SscBanner; onPress: () => void }) {
  const { colors: C } = useColors();
  const s = makeStyles(C);
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Resume SSC crash course"
      style={({ pressed }) => [s.wrap, pressed && s.pressed]}
    >
      <LinearGradient
        colors={[C.text, C.primaryDark]}
        style={s.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={s.fill}>
          <Text style={s.tag}>{banner.tag}</Text>
          <Text style={s.title}>{banner.title}</Text>
          <Text style={s.sub}>{banner.subtitle}</Text>
        </View>
        <View style={s.btn}>
          <Text style={s.btnText}>{banner.action}</Text>
          <Ionicons name="arrow-forward" size={16} color={C.text} />
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const makeStyles = (C: ReturnType<typeof useColors>['colors']) =>
  StyleSheet.create({
    wrap: { marginHorizontal: 16, marginTop: 12 },
    pressed: { opacity: 0.92 },
    fill: { flex: 1 },
    card: {
      borderRadius: Radius.lg,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      ...Shadow.card,
    },
    tag: { color: C.warning, fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
    title: { color: C.surface, fontSize: 16, fontWeight: '800', marginTop: 4 },
    sub: { color: 'rgba(255,255,255,0.72)', fontSize: 12, marginTop: 4 },
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: C.accent,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 999,
    },
    btnText: { fontWeight: '800', fontSize: 13, color: C.surface },
  });
