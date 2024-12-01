import { StyleSheet } from 'react-native';
import { Button, Card, Chip, Text } from 'react-native-paper';

type VisitCardProps = {
  visitorName: string;
  visitedAt: string;
  status: 'PENDING' | 'APPROVED' | 'DISAPPROVED';
  onApprove: () => void;
  onReject: () => void;
};

const StatusMapper = {
  PENDING: 'Pendente',
  APPROVED: 'Aprovado',
  DISAPPROVED: 'Rejeitado',
};

export const VisitCard = ({
  visitorName,
  visitedAt,
  status,
  onApprove,
  onReject,
}: VisitCardProps) => (
  <Card>
    <Card.Content>
      <Text variant="titleLarge">{visitorName}</Text>
      <Chip style={styles.chip}>{StatusMapper[status]}</Chip>
      <Text variant="titleSmall">
        Visitado em: {new Date(visitedAt).toLocaleDateString('pt-BR')}
      </Text>
    </Card.Content>
    {status === 'PENDING' && (
      <Card.Actions>
        <Button onPress={onReject}>Recusar</Button>
        <Button onPress={onApprove}>Aprovar</Button>
      </Card.Actions>
    )}
  </Card>
);

const styles = StyleSheet.create({
  chip: {
    width: 100,
  },
});
