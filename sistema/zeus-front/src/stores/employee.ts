import type EmployeeDto from '@/interfaces/employee/employeeDto';
import type EmployeeState from '@/interfaces/employee/employeeState';
import { defineStore } from 'pinia';
export const useEmployeeStore = defineStore('employee', {
  state: (): EmployeeState => ({
    employees: [],
    employee: {
      id: null,
      name: null,
      email: null,
      password: null,
      cellphone: null,
      cpf: null,
      role: 'PORTEIRO',
    },
  }),
  actions: {
    setEmployees(value: EmployeeDto[]) {
      this.employees = value;
    },
    setEmployee(value: EmployeeDto) {
      this.employee.id = value.id;
      this.employee.name = value.name;
      this.employee.email = value.email;
      this.employee.password = null;
      this.employee.cellphone = value.cellphone;
      this.employee.cpf = value.cpf;
      this.employee.role = 'PORTEIRO';
    },
    resetEmployee() {
      this.employee = {
        id: null,
        name: null,
        email: null,
        password: null,
        cellphone: null,
        cpf: null,
        role: 'PORTEIRO'
      };
    },
    addEmployee(value: EmployeeDto) {
      this.employees.push(value);
    },
    updateEmployee(value: EmployeeDto) {
      const employee = this.employees.find((x) => x.id === value.id);
      if (employee) {
        const index = this.employees.indexOf(employee);
        this.employees.splice(index, 1, value);
      }
    },
    deleteEmployee(value: EmployeeDto) {
      this.employees = this.employees.filter((x) => x.id !== value.id);
    },
  },
});