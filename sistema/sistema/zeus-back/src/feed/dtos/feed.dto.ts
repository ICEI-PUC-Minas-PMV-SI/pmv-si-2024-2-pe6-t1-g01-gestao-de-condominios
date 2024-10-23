import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto';

export class FeedDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  link: string;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}