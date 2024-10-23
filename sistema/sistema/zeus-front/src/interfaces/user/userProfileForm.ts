export default interface UserProfileForm {
  role: 'MORADOR' | 'SINDICO' | 'PORTEIRO',
  name: string | null,
  email: string | null,
  cellphone: string | null,
  cpf: string | null,
  password: string | null
}