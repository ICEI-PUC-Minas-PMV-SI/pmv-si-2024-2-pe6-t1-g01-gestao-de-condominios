import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { getVisits } from '@/services/zeus-backend';
import { VisitDto } from '@/services/zeus-backend/types';
import { VisitCard } from '@/components/VisitCard';

export default function VisitsScreen() {
  const [visistsData, setVisits] = useState<VisitDto[]>([]);

  useEffect(() => {
    const fetchvisists = async () => {
      const visitsResponse = await getVisits();
      setVisits(visitsResponse);
    };

    fetchvisists();
  }, []);

  const handleApproveVisit = () => {};

  const handleRejectVisist = () => {};

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Ionicons size={310} name="person" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Visitas</ThemedText>
      </ThemedView>

      {!visistsData.length && <ThemedText>Nenhum visita</ThemedText>}

      {visistsData.map((visit) => (
        <VisitCard
          key={visit.id}
          visitorName={visit.visitor.name}
          status={visit.status}
        />
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
