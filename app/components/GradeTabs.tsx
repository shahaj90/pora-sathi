import { ScrollView, StyleSheet, View } from 'react-native';
import { type Grade, type GradeId } from '../constants/data';
import { Chip } from './ui/Chip';

interface Props {
  grades: Grade[];
  active: GradeId;
  onChange: (g: GradeId) => void;
}

export function GradeTabs({ grades, active, onChange }: Props) {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {grades.map((g) => (
          <Chip
            key={g.id}
            label={g.label}
            selected={g.id === active}
            onToggle={() => onChange(g.id)}
            role="tab"
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 4,
  },
});
