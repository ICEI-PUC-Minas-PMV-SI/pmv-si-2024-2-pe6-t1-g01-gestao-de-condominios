import { IsEmail, IsString, IsOptional, IsNumber } from 'class-validator';
import { IsResident } from '../decorators/is-resident.decorator';
import { UserRole } from 'src/entities/user.entity';

export class CreateResidentDto {
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

  @IsResident({ message: 'O tipo de usuário deve ser "MORADOR".' })
  role: UserRole;

  @IsNumber()
  @IsOptional()
  apartmentId: number;
}
