export default interface EmployeeForm {
  id: number | null;
  name: string | null;
  email: string | null;
  password: string | null;
  cellphone: string | null;
  cpf: string | null;
  role: 'PORTEIRO';
}
