import type UserDto from '../user/userDto';

export default interface DocumentDto {
  id: number,
  name: string,
  description: string,
  link: string,
  user: UserDto,
  createdAt: Date,
  updatedAt: Date
}

