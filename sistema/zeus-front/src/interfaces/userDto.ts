export default interface UserDto {
  email: string,
  role: 'MORADOR' | 'SINDICO' | 'PORTEIRO',
  name: string,
  cellphone: string,
  cpf: string,
  id: number,
  createdAt: Date,
  updatedAt: Date
}