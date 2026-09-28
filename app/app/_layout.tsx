import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { AuthProvider } from '../context/AuthContext';
import { ColorSchemeProvider, useColors } from '../context/ColorSchemeContext';
import { GradeProvider } from '../context/GradeContext';
import { QueryProvider } from '../context/QueryProvider';

/**
 * Themed shell: paints the root background with the active scheme so there is
 * no white flash / gap behind the stack (overscroll, tab bar, modals).
 */
function ThemedRoot({ children }: { children: React.ReactNode }) {
  const { colors, scheme } = useColors();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      {children}
    </View>
  );
}

export default function RootLayout() {
  return (
    <QueryProvider>
      <ColorSchemeProvider>
        <GradeProvider>
          <ThemedRoot>
            <AuthProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: 'slide_from_right',
                  contentStyle: { backgroundColor: 'transparent' },
                }}
              >
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="login" />
                <Stack.Screen name="signup" />
                <Stack.Screen name="chat" options={{ presentation: 'modal' }} />
                <Stack.Screen name="subject/[id]" />
                <Stack.Screen name="profile" />
                <Stack.Screen name="settings" />
              </Stack>
            </AuthProvider>
          </ThemedRoot>
        </GradeProvider>
      </ColorSchemeProvider>
    </QueryProvider>
  );
}
