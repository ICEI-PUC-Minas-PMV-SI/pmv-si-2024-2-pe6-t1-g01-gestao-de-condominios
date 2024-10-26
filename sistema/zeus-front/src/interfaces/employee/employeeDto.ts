export default interface ResidentDto {
  id: number;
  name: string | null;
  email: string;
  cellphone: string | null;
  cpf: string | null;
  role: 'PORTEIRO';
  createdAt: Date;
  updatedAt: Date;
}