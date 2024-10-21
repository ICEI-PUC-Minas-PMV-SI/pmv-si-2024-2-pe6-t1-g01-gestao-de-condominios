import type UserDto from '../user/userDto';

export default interface NewsFeedDto {
  id: number,
  title: string,
  description: string,
  link: string | null,
  user: UserDto
}

