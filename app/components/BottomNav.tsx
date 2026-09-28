import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { useColors } from '../context/ColorSchemeContext';

export type BottomTabId = 'home' | 'notes' | 'quiz' | 'progress';

interface Tab {
  id: BottomTabId;
  icon: keyof typeof Ionicons.glyphMap;
  iconOutline: keyof typeof Ionicons.glyphMap;
  label: string;
}

const TABS: Tab[] = [
  { id: 'home', icon: 'home', iconOutline: 'home-outline', label: 'Home' },
  { id: 'notes', icon: 'document-text', iconOutline: 'document-text-outline', label: 'Notes' },
  { id: 'quiz', icon: 'help-circle', iconOutline: 'help-circle-outline', label: 'Quiz' },
  { id: 'progress', icon: 'stats-chart', iconOutline: 'stats-chart-outline', label: 'Progress' },
];

export function BottomNav({
  active,
  onChange,
}: {
  active: BottomTabId;
  onChange: (t: BottomTabId) => void;
}) {
  const { colors: C } = useColors();
  return (
    <View style={[wrapStyle, { backgroundColor: C.surface, borderTopColor: C.border }]}>
      {TABS.map((t) => {
        const selected = t.id === active;
        return (
          <Pressable
            key={t.id}
            onPress={() => onChange(t.id)}
            style={tabStyle}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
          >
            <Ionicons
              name={selected ? t.icon : t.iconOutline}
              size={22}
              color={selected ? C.primary : C.textSecondary}
            />
            <Text
              style={[
                labelStyle,
                { color: C.textSecondary, fontWeight: selected ? '800' : '600' },
                selected && { color: C.primary },
              ]}
            >
              {t.label}
            </Text>
            {selected ? <View style={[pillStyle, { backgroundColor: C.primary }]} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const wrapStyle = {
  position: 'absolute' as const,
  left: 0,
  right: 0,
  bottom: 0,
  flexDirection: 'row' as const,
  borderTopWidth: 1,
  paddingBottom: 22,
  paddingTop: 10,
  paddingHorizontal: 8,
};

const tabStyle = { flex: 1, alignItems: 'center' as const, gap: 3 };

const labelStyle = { fontSize: 11 };

const pillStyle = { width: 20, height: 3, borderRadius: 2, marginTop: 2 };
