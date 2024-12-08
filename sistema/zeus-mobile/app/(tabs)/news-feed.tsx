import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Button, Alert, Image, Modal, Text, TouchableOpacity } from 'react-native';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { AddNewsModal } from '@/components/feedNews/AddNewsModal';
import EditNewsModal from '@/components/feedNews/EditNewsModal';
import { getNewsFeed, updateNewsFeed, deleteNewsFeed } from '@/services/zeus-backend';
import { NewsFeedDto } from '@/services/zeus-backend/types';

export default function NewsFeedScreen() {
  const [newsFeedData, setNewsFeedData] = useState<NewsFeedDto[]>([]);
  const [isAddModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [selectedNews, setSelectedNews] = useState<NewsFeedDto | null>(null);
  const [isConfirmDeleteVisible, setConfirmDeleteVisible] = useState<boolean>(false);
  const [newsToDelete, setNewsToDelete] = useState<number | null>(null);

  // Abrir e fechar modal de criação
  const openAddModal = () => setAddModalVisible(true);
  const closeAddModal = () => setAddModalVisible(false);

  // Abrir e fechar modal de edição
  const openEditModal = (news: NewsFeedDto) => {
    setSelectedNews(news);
    setEditModalVisible(true);
  };
  const closeEditModal = () => {
    setSelectedNews(null);
    setEditModalVisible(false);
  };

  // Abrir e fechar modal de confirmação de exclusão
  const openConfirmDeleteModal = (id: number) => {
    setNewsToDelete(id);
    setConfirmDeleteVisible(true);
  };
  const closeConfirmDeleteModal = () => {
    setNewsToDelete(null);
    setConfirmDeleteVisible(false);
  };

  useEffect(() => {
    const fetchNewsFeed = async () => {
      const newsFeedResponse = await getNewsFeed();
      setNewsFeedData(newsFeedResponse);
    };

    fetchNewsFeed();
  }, []);

  const handleAddNews = (newNews: NewsFeedDto) => {
    setNewsFeedData((prevData) => [newNews, ...prevData]);
    closeAddModal();
  };

  const handleUpdate = async (updatedNews: { id: number; title: string; description: string; file?: File | null }) => {
    try {
      const existingNews = newsFeedData.find((news) => news.id === updatedNews.id);

      if (!existingNews) {
        throw new Error('Notícia não encontrada');
      }

      const updatedNewsFeed = {
        ...existingNews,
        ...updatedNews,
        link: existingNews.link ?? null,
        file: updatedNews.file ?? undefined,
      };

      const response = await updateNewsFeed(updatedNewsFeed.id, {
        title: updatedNewsFeed.title,
        description: updatedNewsFeed.description,
        file: updatedNewsFeed.file || undefined,
      });
      setNewsFeedData((prevData) =>
        prevData.map((news) => (news.id === updatedNewsFeed.id ? response : news))
      );
      closeEditModal();
      Alert.alert('Sucesso', 'Notícia atualizada com sucesso!');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao atualizar notícia');
    }
  };

  const handleConfirmDelete = async () => {
    if (newsToDelete === null) return;

    try {
      await deleteNewsFeed(newsToDelete);
      setNewsFeedData((prevData) => prevData.filter((news) => news.id !== newsToDelete));
      Alert.alert('Sucesso', 'Notícia excluída com sucesso!');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao excluir notícia');
    } finally {
      closeConfirmDeleteModal();
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="newspaper" style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Feed de notícias</ThemedText>
      </ThemedView>

      <Button title="Adicionar Notícia" onPress={openAddModal} />

      {!newsFeedData.length && <ThemedText>Nenhuma notícia publicada</ThemedText>}

      {newsFeedData.map((newsFeed) => (
        <View key={newsFeed.id} style={styles.newsContainer}>
          <ThemedText>{newsFeed.title}</ThemedText>
          <ThemedText>{newsFeed.description}</ThemedText>
          {newsFeed.link && (
            <Image source={{ uri: newsFeed.link }} style={{ width: 200, height: 200 }} />
          )}
          <View style={styles.buttonsContainer}>
            <Button title="Editar" onPress={() => openEditModal(newsFeed)} />
            <Button title="Excluir" onPress={() => openConfirmDeleteModal(newsFeed.id)} />
          </View>
        </View>
      ))}

      <AddNewsModal
        visible={isAddModalVisible}
        onClose={closeAddModal}
        onAdd={handleAddNews}
      />

      <EditNewsModal
        visible={isEditModalVisible}
        onClose={closeEditModal}
        news={selectedNews}
        onSave={handleUpdate}
      />

      <Modal visible={isConfirmDeleteVisible} transparent={true} animationType="fade">
        <View style={styles.confirmModal}>
          <Text style={styles.confirmText}>Tem certeza que deseja excluir esta notícia?</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={closeConfirmDeleteModal} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirmDelete} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Sim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  newsContainer: {
    marginBottom: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  buttonsContainer: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 10,
  },
  confirmModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  confirmText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
