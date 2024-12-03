import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal, Alert, GestureResponderEvent } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { createNewsFeed } from '@/services/zeus-backend/index';
import { NewsFeedDto } from '@/services/zeus-backend/types';

interface AddNewsModalProps {
  visible: boolean;
  onClose: (event?: GestureResponderEvent) => void;
  onAdd: (newNews: NewsFeedDto) => void;
}

export const AddNewsModal: React.FC<AddNewsModalProps> = ({
  visible,
  onClose,
  onAdd,
}) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const handleSelectFile = async () => {

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!title || !description) {
        Alert.alert('Erro', 'Preencha todos os campos!');
        return;
      }

      const newNews = await createNewsFeed({
        title,
        description,
        file: file ? file.file : undefined,
      });
  
      onAdd(newNews);
      onClose();
    } catch (error: any) {
      Alert.alert('Erro ao criar notícia', error.message);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
        />
        <Button title="Selecionar Arquivo" onPress={handleSelectFile} />
        {file && <Button title="Arquivo Selecionado" disabled />}
        <View style={styles.buttonContainer}>
          <Button title="Cancelar" onPress={onClose} />
          <Button title="Adicionar" onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});
