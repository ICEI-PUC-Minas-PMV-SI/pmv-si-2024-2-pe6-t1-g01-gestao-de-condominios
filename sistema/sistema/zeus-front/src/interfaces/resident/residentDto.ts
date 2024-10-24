export default interface ResidentDto {
  id: number,
  name: string | null,
  email: string,
  cellphone: string | null,
  cpf: string | null,
  role: 'MORADOR',
  apartment: {
    id: number,
    number: number,
    block: string | null,
    createdAt: Date,
    updatedAt: Date
  } | null,
  createdAt: Date,
  updatedAt: Date
}