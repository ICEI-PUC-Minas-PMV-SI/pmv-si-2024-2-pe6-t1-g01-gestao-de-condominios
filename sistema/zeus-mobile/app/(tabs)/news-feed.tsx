import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Button, Alert } from 'react-native';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { AddNewsModal } from '@/components/feedNews/AddNewsModal';
import { getNewsFeed, updateNewsFeed, deleteNewsFeed } from '@/services/zeus-backend';
import { NewsFeedDto } from '@/services/zeus-backend/types';
import { Image } from 'react-native';

export default function NewsFeedScreen() {
  const [newsFeedData, setNewsFeedData] = useState<NewsFeedDto[]>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchNewsFeed = async () => {
      const newsFeedResponse = await getNewsFeed();
      setNewsFeedData(newsFeedResponse);
    };

    fetchNewsFeed();
  }, []);

  const handleAddNews = (newNews: NewsFeedDto) => {
    setNewsFeedData((prevData) => [newNews, ...prevData]);
  };

  const handleUpdate = (id: number) => {
    const updatedNews = { title: 'Notícia Atualizada', description: 'Descrição atualizada' }; // Exemplo de dados
    updateNewsFeed(id, updatedNews).then((response) => {
      setNewsFeedData((prevData) =>
        prevData.map((news) => (news.id === id ? response : news))
      );
    });
  };

  const handleDelete = (id: number) => {
    Alert.alert('Confirmar exclusão', 'Tem certeza que deseja excluir esta notícia?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Confirmar', onPress: () => {
        deleteNewsFeed(id).then(() => {
          setNewsFeedData((prevData) => prevData.filter((news) => news.id !== id));
        });
      }},
    ]);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="newspaper" style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Feed de notícias</ThemedText>
      </ThemedView>

      <Button title="Adicionar Notícia" onPress={() => setModalVisible(true)} />

      {!newsFeedData.length && <ThemedText>Nenhuma notícia publicada</ThemedText>}

      {newsFeedData.map((newsFeed) => (
        <View key={newsFeed.id} style={styles.newsContainer}>
          <ThemedText>{newsFeed.title}</ThemedText>
          <ThemedText>{newsFeed.description}</ThemedText>
          {newsFeed.link && (
            <Image source={{ uri: newsFeed.link }} style={{ width: 200, height: 200 }} />
          )}
          <View style={styles.buttonsContainer}>
            <Button title="Editar" onPress={() => handleUpdate(newsFeed.id)} />
            <Button title="Excluir" onPress={() => handleDelete(newsFeed.id)} />
          </View>
        </View>
      ))}

      <AddNewsModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddNews}
      />
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
});
