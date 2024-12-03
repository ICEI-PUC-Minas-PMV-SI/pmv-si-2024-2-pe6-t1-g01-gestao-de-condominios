import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserData } from '@/hooks/useUserData';
import { Button, Text, TextInput } from 'react-native-paper';
import { useState } from 'react';

export default function ProfileScreen() {
  const userData = useUserData();
  const [shouldShowEditProfile, setShouldShowEditProfile] = useState(false);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('zeus_accessToken');
    await AsyncStorage.removeItem('zeus_user');
    router.replace('/');
  };

  const handleEditProfile = () => setShouldShowEditProfile(true);

  const handleSaveProfile = () => setShouldShowEditProfile(false);

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

      {!shouldShowEditProfile && (
        <>
          <Text>Nome: {userData?.name}</Text>
          <Text>Email: {userData?.email}</Text>
          <Button onPress={handleEditProfile}>Editar perfil</Button>
          <Button onPress={handleLogout}>Deslogar</Button>
        </>
      )}

      {shouldShowEditProfile && (
        <View>
          <TextInput label="Nome" />
          <TextInput label="Email" />
          <Button onPress={handleSaveProfile}>Salvar</Button>
        </View>
      )}
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
