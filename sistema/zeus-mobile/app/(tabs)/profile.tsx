import Ionicons from '@expo/vector-icons/Ionicons';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  View,
} from 'react-native';
import { router } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserData } from '@/hooks/useUserData';
import { Button, Text, TextInput } from 'react-native-paper';
import { useState } from 'react';
import { updateUser } from '@/services/zeus-backend';

export default function ProfileScreen() {
  const userData = useUserData();
  const [name, setName] = useState(userData?.name);
  const [email, setEmail] = useState(userData?.email);

  const [shouldShowEditProfile, setShouldShowEditProfile] = useState(false);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('zeus_accessToken');
    await AsyncStorage.removeItem('zeus_user');
    router.replace('/');
  };

  const handleChangeEmail = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => setEmail(e.nativeEvent.text);

  const handleChangeName = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => setName(e.nativeEvent.text);

  const handleEditProfile = () => setShouldShowEditProfile(true);

  const handleSaveProfile = async () => {
    setShouldShowEditProfile(false);
    const updatedUser = await updateUser({ ...userData, name, email });
    if (updatedUser) {
      await AsyncStorage.setItem('zeus_user', JSON.stringify(updatedUser));
    }
  };

  const handleCancelSaveProfile = () => {
    setShouldShowEditProfile(false);
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

      {!shouldShowEditProfile && (
        <>
          <Text>Nome: {userData?.name}</Text>
          <Text>Email: {userData?.email}</Text>
          <Button mode="outlined" onPress={handleEditProfile}>
            Editar perfil
          </Button>
          <Button mode="outlined" onPress={handleLogout}>
            Deslogar
          </Button>
        </>
      )}

      {shouldShowEditProfile && (
        <View>
          <View style={styles.inputContainer}>
            <TextInput label="Nome" value={name} onChange={handleChangeName} />
            <TextInput
              label="Email"
              value={email}
              onChange={handleChangeEmail}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              mode="outlined"
              onPress={handleSaveProfile}
            >
              Salvar
            </Button>
            <Button
              style={styles.button}
              mode="outlined"
              onPress={handleCancelSaveProfile}
            >
              Cancelar
            </Button>
          </View>
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
  inputContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    marginTop: 16,
  },
  button: {
    flex: 1,
  },
});
