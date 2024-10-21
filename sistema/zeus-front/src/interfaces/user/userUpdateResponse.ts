export default interface UserUpdateResponse {
  id: number,
  name: string,
  email: string,
  cellphone: string | null,
  cpf: string | null,
  role: 'MORADOR' | 'SINDICO' | 'PORTEIRO' | 'ADMIN',
  createdAt: Date,
  updatedAt: Date
}