export default interface User {
  role: 'MORADOR' | 'SINDICO' | 'PORTEIRO';
  email: string | null;
  password: string | null;
}