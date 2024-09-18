import { IsEmail, IsString, IsOptional } from 'class-validator';
import { IsEmployee } from '../decorators/is-employee.decorator';
import { UserRole } from 'src/entities/user.entity';

export class CreateEmployeeDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  cellphone: string;

  @IsString()
  @IsOptional()
  cpf: string;

  @IsEmployee({ message: 'O tipo de usuário deve ser "PORTEIRO".' })
  role: UserRole;
}
