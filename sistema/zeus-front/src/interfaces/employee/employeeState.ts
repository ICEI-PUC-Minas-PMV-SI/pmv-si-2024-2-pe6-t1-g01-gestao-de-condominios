import type EmployeeDto from './employeeDto';
import type EmployeeForm from './employeeForm';

export default interface EmployeeState {
  employees: EmployeeDto[];
  employee: EmployeeForm;
}
