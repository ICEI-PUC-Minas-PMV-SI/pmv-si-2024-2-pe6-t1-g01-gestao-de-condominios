import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { getVisits, updateVisit } from '@/services/zeus-backend';
import { VisitDto } from '@/services/zeus-backend/types';
import { VisitCard } from '@/components/VisitCard';

export default function VisitsScreen() {
  const [visistsData, setVisits] = useState<VisitDto[]>([]);

  useEffect(() => {
    const fetchVisits = async () => {
      const visitsResponse = await getVisits();
      setVisits(visitsResponse);
    };

    fetchVisits();
  }, []);

  const handleApproveVisit = async (id: number) => {
    const visit = visistsData.find((visit) => visit.id === id);
    if (!visit) return;

    await updateVisit({
      ...visit,
      status: 'APPROVED',
    });

    const visitsResponse = await getVisits();
    setVisits(visitsResponse);
  };

  const handleRejectVisist = async (id: number) => {
    const visit = visistsData.find((visit) => visit.id === id);
    if (!visit) return;

    await updateVisit({
      ...visit,
      status: 'DISAPPROVED',
    });

    const visitsResponse = await getVisits();
    setVisits(visitsResponse);
  };

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
          visitedAt={visit.visitedAt}
          status={visit.status}
          onApprove={() => handleApproveVisit(visit.id)}
          onReject={() => handleRejectVisist(visit.id)}
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
