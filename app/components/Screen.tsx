import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Gradients, Radius, type ColorTokens } from '../constants/theme';
import { useColors } from '../context/ColorSchemeContext';

/**
 * Shared chrome for the full-screen pages (Profile, Settings, ...).
 *
 * Both the header and the content card are defined here so these screens
 * cannot drift apart visually — the same header height, the same back button,
 * the same card offset/padding/radius on every one of them.
 */

/** Gradient hero with a back button and a centred title. */
export function ScreenHeader({
  title,
  subtitle,
  onBack,
}: {
  title: string;
  subtitle?: string;
  onBack: () => void;
}) {
  const { colors: C } = useColors();
  return (
    <LinearGradient
      colors={Gradients.header}
      style={styles.hero}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.nav}>
        <Pressable
          onPress={onBack}
          style={styles.back}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={20} color={C.surface} />
        </Pressable>
        <View style={styles.titles}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {/* Balances the back button so the title stays optically centred. */}
        <View style={styles.navSpacer} />
      </View>
    </LinearGradient>
  );
}

export type ScreenTokens = ColorTokens;

/** Content card sitting below the hero. */
export const screenCard = (C: ScreenTokens) => ({
  backgroundColor: C.surface,
  borderRadius: Radius.lg,
  marginHorizontal: 16,
  marginTop: 16,
  padding: 18,
  borderWidth: 1,
  borderColor: C.border,
});

/** Section heading used inside the card. */
export const screenSectionTitle = (C: ScreenTokens) => ({
  fontSize: 16,
  fontWeight: '800' as const,
  color: C.text,
  marginTop: 8,
  marginBottom: 10,
});

/** "Saved successfully" confirmation strip. */
export const screenSavedBanner = (C: ScreenTokens) => ({
  flexDirection: 'row' as const,
  alignItems: 'center' as const,
  gap: 6,
  backgroundColor: C.successSoft,
  borderRadius: Radius.md,
  paddingHorizontal: 12,
  paddingVertical: 10,
  marginBottom: 14,
});

export const screenSavedText = (C: ScreenTokens) => ({
  color: C.success,
  fontWeight: '700' as const,
  fontSize: 13,
});

const styles = StyleSheet.create({
  hero: {
    paddingTop: 54,
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  back: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titles: { flex: 1, alignItems: 'center' },
  title: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  subtitle: { color: 'rgba(255,255,255,0.85)', fontSize: 12, marginTop: 2 },
  navSpacer: { width: 38 },
});
