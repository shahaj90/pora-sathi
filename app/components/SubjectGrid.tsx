import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';
import type { Subject } from '../constants/data';
import { Radius, Shadow } from '../constants/theme';
import { useColors } from '../context/ColorSchemeContext';
import { ProgressBar } from './ui/ProgressBar';

export function SubjectGrid({
  subjects,
  onOpen,
  compact = false,
}: {
  subjects: Subject[];
  onOpen: (s: Subject) => void;
  /** 3-column compact mode for home; 2-column with stats otherwise */
  compact?: boolean;
}) {
  const { colors: C } = useColors();
  const { width } = useWindowDimensions();
  const gap = 12;
  const padding = 32; // 16 * 2
  const columns = compact ? 3 : 2;
  const totalGap = gap * (columns - 1);
  const cardWidth = (width - padding - totalGap) / columns;

  return (
    <View style={gridStyle}>
      {subjects.map((s) => (
        <Pressable
          key={s.id}
          onPress={() => onOpen(s)}
          style={({ pressed }) => [cardWrap, { width: cardWidth, opacity: pressed ? 0.92 : 1 }]}
        >
          <LinearGradient
            colors={s.color}
            style={[cardStyle, compact && cardCompact]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={iconRowStyle}>
              <View style={[iconBubbleStyle, compact && iconBubbleCompact]}>
                <Ionicons name={s.icon} size={compact ? 18 : 20} color={C.surface} />
              </View>
              {!compact ? <Text style={banglaStyle}>{s.bangla}</Text> : null}
            </View>
            <Text style={[nameStyle, compact && nameCompact]}>{s.name}</Text>
            {!compact ? (
              <>
                <Text style={metaStyle}>
                  {s.chapters} chapters · {s.notesCount} PDFs
                </Text>
                <View style={progressWrap}>
                  <ProgressBar
                    value={s.progress}
                    color={C.surface}
                    trackColor="rgba(255,255,255,0.3)"
                  />
                </View>
                <Text style={progressTextStyle}>{Math.round(s.progress * 100)}% done</Text>
              </>
            ) : null}
          </LinearGradient>
        </Pressable>
      ))}
    </View>
  );
}

// Static styles (no dynamic colors needed)
const gridStyle = {
  flexDirection: 'row' as const,
  flexWrap: 'wrap' as const,
  paddingHorizontal: 16,
  gap: 12,
};

const cardWrap = { borderRadius: Radius.lg };

const cardStyle = {
  borderRadius: Radius.lg,
  padding: 14,
  minHeight: 158,
  justifyContent: 'space-between' as const,
  ...Shadow.card,
};

const cardCompact = {
  padding: 12,
  minHeight: 112,
  justifyContent: 'flex-start' as const,
  gap: 8,
};

const iconRowStyle = {
  flexDirection: 'row' as const,
  justifyContent: 'space-between' as const,
  alignItems: 'center' as const,
};

const iconBubbleStyle = {
  width: 38,
  height: 38,
  borderRadius: 19,
  backgroundColor: 'rgba(255,255,255,0.25)',
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
};

const iconBubbleCompact = {
  width: 32,
  height: 32,
  borderRadius: 16,
};

const banglaStyle = { color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: '600' as const };

const nameStyle = { color: '#FFFFFF', fontSize: 16, fontWeight: '800' as const, marginTop: 12 };

const nameCompact = { color: '#FFFFFF', fontSize: 13, fontWeight: '800' as const, marginTop: 0 };

const metaStyle = { color: 'rgba(255,255,255,0.85)', fontSize: 11, marginTop: 2 };

const progressWrap = { marginTop: 10 };

const progressTextStyle = {
  color: '#FFFFFF',
  fontSize: 11,
  fontWeight: '700' as const,
  marginTop: 6,
};
