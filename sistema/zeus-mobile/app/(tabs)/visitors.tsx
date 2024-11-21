import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { getVisitors } from '@/services/zeus-backend';
import { VisitorDto } from '@/services/zeus-backend/types';

export default function VisitorsScreen() {
  const [visitorsData, setVisitors] = useState<VisitorDto[]>([]);

  useEffect(() => {
    const fetchVisitors = async () => {
      const visitorsResponse = await getVisitors();
      setVisitors(visitorsResponse);
    };

    fetchVisitors();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={
            <Ionicons size={310} name="person" style={styles.headerImage} />
        }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Visitantes cadastrados</ThemedText>
      </ThemedView>

      {!visitorsData.length && (
        <ThemedText>Nenhum visitante cadastrado</ThemedText>
      )}

      {visitorsData.map((visitorsData) => (
        <View key={visitorsData.id}>
          <ThemedText>{visitorsData.name}</ThemedText>
          <ThemedText>{visitorsData.cellphone}</ThemedText>
          <ThemedText>{visitorsData.cpf}</ThemedText>
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
