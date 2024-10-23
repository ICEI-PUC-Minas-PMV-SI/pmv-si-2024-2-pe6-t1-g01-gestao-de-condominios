export default interface UserDto {
  id: number,
  email: string,
  role: 'MORADOR' | 'SINDICO' | 'PORTEIRO' | 'ADMIN',
  name: string,
  cellphone: string | null,
  cpf: string | null,
  createdAt: Date,
  updatedAt: Date
}