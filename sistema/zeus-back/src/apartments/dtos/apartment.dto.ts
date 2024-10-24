import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto';

export class ApartmentDto {
  @Expose()
  id: number;

  @Expose()
  number: number;

  @Expose()
  block: string;

  @Expose()
  @Type(() => UserDto)
  residents: UserDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
