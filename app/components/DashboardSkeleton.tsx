import { ScrollView, View } from 'react-native';
import { Radius } from '../constants/theme';
import { useColors } from '../context/ColorSchemeContext';
import { Skeleton } from './ui/Skeleton';

export function DashboardSkeleton({ hideHeader = false }: { hideHeader?: boolean }) {
  const { colors: C } = useColors();
  return (
    <View style={{ flex: 1, backgroundColor: C.background }}>
      {!hideHeader ? (
        <View
          style={{
            backgroundColor: C.primary,
            paddingTop: 56,
            paddingHorizontal: 16,
            paddingBottom: 18,
            borderBottomLeftRadius: Radius.xl,
            borderBottomRightRadius: Radius.xl,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Skeleton
              width={44}
              height={44}
              borderRadius={22}
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            />
            <View style={{ flex: 1, gap: 4 }}>
              <Skeleton
                width={120}
                height={14}
                style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
              />
              <Skeleton
                width={160}
                height={16}
                style={{ backgroundColor: 'rgba(255,255,255,0.35)', marginTop: 6 }}
              />
            </View>
          </View>
          <Skeleton
            width="100%"
            height={48}
            borderRadius={Radius.pill}
            style={{ backgroundColor: 'rgba(255,255,255,0.22)', marginTop: 14 }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 }}>
            <Skeleton
              width="30%"
              height={58}
              borderRadius={Radius.md}
              style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
            />
            <Skeleton
              width="30%"
              height={58}
              borderRadius={Radius.md}
              style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
            />
            <Skeleton
              width="30%"
              height={58}
              borderRadius={Radius.md}
              style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
            />
          </View>
        </View>
      ) : null}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 8 }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            paddingHorizontal: 16,
            marginTop: 12,
            marginBottom: 4,
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} width={80} height={40} borderRadius={Radius.pill} />
          ))}
        </View>

        <Skeleton
          width="100%"
          height={96}
          borderRadius={Radius.lg}
          style={{ marginHorizontal: 16, marginTop: 16 }}
        />

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: 16,
            gap: 12,
            marginTop: 16,
          }}
        >
          <Skeleton width="48%" height={158} borderRadius={Radius.lg} />
          <Skeleton width="48%" height={158} borderRadius={Radius.lg} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: 16,
            gap: 12,
            marginTop: 20,
          }}
        >
          <Skeleton width="48%" height={120} borderRadius={Radius.md} />
          <Skeleton width="48%" height={120} borderRadius={Radius.md} />
        </View>

        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            width="100%"
            height={72}
            borderRadius={Radius.md}
            style={{ marginHorizontal: 16, marginTop: 10 }}
          />
        ))}

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

export function ContentSkeleton() {
  return (
    <View style={{ paddingBottom: 8 }}>
      <Skeleton
        width="100%"
        height={96}
        borderRadius={Radius.lg}
        style={{ marginHorizontal: 16, marginTop: 16 }}
      />

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingHorizontal: 16,
          gap: 12,
          marginTop: 16,
        }}
      >
        <Skeleton width="48%" height={158} borderRadius={Radius.lg} />
        <Skeleton width="48%" height={158} borderRadius={Radius.lg} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingHorizontal: 16,
          gap: 12,
          marginTop: 20,
        }}
      >
        <Skeleton width="48%" height={120} borderRadius={Radius.md} />
        <Skeleton width="48%" height={120} borderRadius={Radius.md} />
      </View>

      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton
          key={i}
          width="100%"
          height={72}
          borderRadius={Radius.md}
          style={{ marginHorizontal: 16, marginTop: 10 }}
        />
      ))}

      <View style={{ height: 120 }} />
    </View>
  );
}
