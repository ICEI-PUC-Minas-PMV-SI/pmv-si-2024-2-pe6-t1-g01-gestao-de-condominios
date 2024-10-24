export default interface ResidentRelationship {
  id: number,
  name: string | null,
  email: string,
  cellphone: string | null,
  cpf: string | null,
  role: 'MORADOR',
  createdAt: Date,
  updatedAt: Date
}