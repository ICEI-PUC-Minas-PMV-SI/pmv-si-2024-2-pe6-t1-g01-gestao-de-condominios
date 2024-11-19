import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserData } from '@/hooks/useUserData';

export default function ProfileScreen() {
  const userData = useUserData();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('zeus_accessToken');
    await AsyncStorage.removeItem('zeus_user');
    router.replace('/');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Ionicons size={310} name="person" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Perfil</ThemedText>
      </ThemedView>

      <View>
        <ThemedText>Página de perfil</ThemedText>
      </View>
      <ThemedText>Nome: {userData?.name}</ThemedText>
      <ThemedText>Email: {userData?.email}</ThemedText>
      <Pressable onPress={handleLogout}>
        <ThemedText type="link">Deslogar</ThemedText>
      </Pressable>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
