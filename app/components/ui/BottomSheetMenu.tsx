import { Modal, Pressable, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Radius, Shadow } from '../../constants/theme';
import { useColors } from '../../context/ColorSchemeContext';

export interface MenuItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

interface Props {
  visible: boolean;
  title: string;
  items: MenuItem[];
  onClose: () => void;
}

export function BottomSheetMenu({ visible, title, items, onClose }: Props) {
  const { colors: C } = useColors();
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1, backgroundColor: 'rgba(15,18,33,0.45)' }} />
      </TouchableWithoutFeedback>
      <View
        style={{
          backgroundColor: C.surface,
          borderTopLeftRadius: Radius.xl,
          borderTopRightRadius: Radius.xl,
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 32,
          ...Shadow.card,
        }}
      >
        <View
          style={{
            width: 40,
            height: 5,
            borderRadius: 3,
            backgroundColor: C.border,
            alignSelf: 'center',
            marginBottom: 12,
          }}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: '800',
            color: C.text,
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          {title}
        </Text>
        <ScrollView>
          {items.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  paddingVertical: 14,
                  borderBottomWidth: 1,
                  borderBottomColor: C.border,
                },
                pressed && { opacity: 0.7 },
              ]}
              onPress={() => {
                item.onPress();
                onClose();
              }}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: C.primarySoft,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name={item.icon} size={20} color={C.primary} />
              </View>
              <Text style={{ flex: 1, fontSize: 15, fontWeight: '700', color: C.text }}>
                {item.label}
              </Text>
              <Ionicons name="chevron-forward" size={18} color={C.muted} />
            </Pressable>
          ))}
        </ScrollView>
        <Pressable
          onPress={onClose}
          style={{
            marginTop: 12,
            backgroundColor: C.background,
            paddingVertical: 14,
            borderRadius: Radius.pill,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: '800', color: C.textSecondary }}>Cancel</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
