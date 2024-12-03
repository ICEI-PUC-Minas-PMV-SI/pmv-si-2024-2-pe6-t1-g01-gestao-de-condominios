import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type FileType = {
  uri: string;
  type: string;
  name: string;
};

type NewsType = {
  id: number;
  title: string;
  description: string;
  file?: FileType | null | undefined;
};

type EditNewsModalProps = {
  visible: boolean;
  onClose: () => void;
  news: NewsType | null;
  onSave: (updatedNews: { id: number; title: string; description: string; file?: File | null }) => void;
};

const EditNewsModal: React.FC<EditNewsModalProps> = ({ visible, onClose, news, onSave }) => {
  const [title, setTitle] = useState(news?.title || '');
  const [description, setDescription] = useState(news?.description || '');
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const handleFileSelection = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const handleSave = () => {
    if (!title || !description) {
      Alert.alert('Erro', 'Título e descrição são obrigatórios.');
      return;
    }

    if(news?.id) {
      onSave({ id: news.id, title, description, file: file?.file || null });
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <TextInput
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          multiline
        />
        <Button title="Selecionar Arquivo (Opcional)" onPress={handleFileSelection} />
        {file && <Button title="Arquivo Selecionado" disabled />}
        <View style={styles.buttonContainer}>
          <Button title="Cancelar" onPress={onClose} color="red" />
          <Button title="Salvar" onPress={handleSave} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});

export default EditNewsModal;
