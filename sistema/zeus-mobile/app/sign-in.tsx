import { useState } from 'react';
import { TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, Stack } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { login } from '@/services/zeus-backend';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const responseData = await login(email, password);

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
      console.error('Failed to sign in:', error);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Login' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">Entrar</ThemedText>
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
        <Button title="Entrar" onPress={handleSignIn} />
        <Link href="/sign-up" style={styles.link}>
          <ThemedText type="link">Não possui uma conta?</ThemedText>
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
