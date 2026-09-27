import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/theme';

interface Props {
  title: string;
  bangla?: string;
  action?: string;
  onAction?: () => void;
}

/** Shared section heading with optional trailing link. */
export function SectionHeader({ title, bangla, action, onAction }: Props) {
  return (
    <View style={styles.wrap}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {bangla ? <Text style={styles.bangla}>{bangla}</Text> : null}
      </View>
      {action ? (
        <Pressable onPress={onAction} accessibilityRole="button" hitSlop={8}>
          <Text style={styles.action}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginTop: 22,
    marginBottom: 12,
  },
  title: { fontSize: 17, fontWeight: '800', color: Colors.text },
  bangla: { fontSize: 12, color: Colors.muted, marginTop: 2 },
  action: { fontSize: 13, fontWeight: '700', color: Colors.primary },
});
