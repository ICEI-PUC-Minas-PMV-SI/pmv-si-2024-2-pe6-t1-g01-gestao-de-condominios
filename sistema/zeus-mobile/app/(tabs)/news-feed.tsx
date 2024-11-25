import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';

import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { getNewsFeed } from '@/services/zeus-backend';
import { NewsFeedDto } from '@/services/zeus-backend/types';

export default function NewsFeedScreen() {
  const [newsFeedData, setNewsFeedData] = useState<NewsFeedDto[]>([]);

  useEffect(() => {
    const fetchNewsFeed = async () => {
      const newsFeedResponse = await getNewsFeed();
      setNewsFeedData(newsFeedResponse);
    };

    fetchNewsFeed();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Ionicons size={310} name="newspaper" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Feed de notícias</ThemedText>
      </ThemedView>

      {!newsFeedData.length && (
        <ThemedText>Nenhuma notícia publicada</ThemedText>
      )}

      {newsFeedData.map((newsFeed) => (
        <View key={newsFeed.id}>
          <ThemedText>{newsFeed.title}</ThemedText>
          <ThemedText>{newsFeed.description}</ThemedText>
          {newsFeed.link && (
            <ExternalLink href={newsFeed.link}>
              <ThemedText type="link">Ver mais</ThemedText>
            </ExternalLink>
          )}
        </View>
      ))}
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
