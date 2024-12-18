import { useState } from 'react';
import { TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, Stack } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { createUser } from '@/services/zeus-backend';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const responseData = await createUser(email, password);

      if (responseData) {
        await AsyncStorage.setItem(
          'zeus_accessToken',
          responseData.accessToken,
        );
        await AsyncStorage.setItem(
          'zeus_user',
          JSON.stringify(responseData.user),
        );
      }
    } catch (error) {
      console.error('Failed to sign up:', error);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Criar conta' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">Criar conta</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Registrar" onPress={handleSignUp} />
        <Link href="/sign-in" style={styles.link}>
          <ThemedText type="link">Já possui uma conta?</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  input: {
    width: '100%',
    height: 40,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: 'white',
  },
});
