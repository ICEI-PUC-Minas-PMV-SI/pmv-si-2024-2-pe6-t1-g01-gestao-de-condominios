import { Image, StyleSheet, Platform, View, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, Stack } from 'expo-router';

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Bem-vindo ao Zeus</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">
            Gerencie seu condomínio de forma eficiente e prática
          </ThemedText>
        </ThemedView>
        <View style={styles.buttonsContainer}>
          <Link href="/sign-up">
            <Button title="Criar conta" />
          </Link>

          <Link href="/sign-in">
            <Button title="Login" />
          </Link>
        </View>
      </ParallaxScrollView>
    </>
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
  buttonsContainer: {
    flexDirection: 'column',
    rowGap: 8,
  },
});
