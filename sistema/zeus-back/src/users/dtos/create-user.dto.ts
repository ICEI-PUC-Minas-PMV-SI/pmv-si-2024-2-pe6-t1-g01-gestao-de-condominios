import { IsEmail, IsString } from 'class-validator';
import { UserRole } from 'src/entities/user.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: UserRole;
}
