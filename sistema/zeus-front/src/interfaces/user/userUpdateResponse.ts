export default interface UserUpdateResponse {
  id: number,
  name: string,
  email: string,
  cellphone: string,
  cpf: string,
  role: 'MORADOR' | 'SINDICO' | 'PORTEIRO',
  createdAt: Date,
  updatedAt: Date
}