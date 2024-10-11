export default interface UserDto {
  id: number,
  email: string,
  role: 'MORADOR' | 'SINDICO' | 'PORTEIRO',
  name: string,
  cellphone: string,
  cpf: string,
  createdAt: Date,
  updatedAt: Date
}