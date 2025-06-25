import { Image } from 'expo-image';
import { BackHandler, Platform, StyleSheet, Text, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/auth/AuthContext';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';

export default function HomeScreen() {
  const { user, signOut } = useAuth()
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      signOut();
      router.replace('/login'); // Redirect to login screen after signing out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true; // Bloquea el back
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.addEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView>
        <View>
          <Text>
            {`Welcome, ${user?.names}!`}
          </Text>
          <Text>
            {`Email: ${user?.email}`}
          </Text>
          <Text>
            {`Process: ${user?.process}`}
          </Text>
        </View>


        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 4: Sign out</ThemedText>
        <ThemedText>
          {`You can sign out by pressing the button below. This will clear your session and redirect you to the login screen.`}
        </ThemedText>
        <ThemedText type="defaultSemiBold" onPress={handleSignOut} style={{ color: 'blue' }}>
          Sign Out
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
