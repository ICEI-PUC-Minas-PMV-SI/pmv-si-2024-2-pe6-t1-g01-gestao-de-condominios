import type UserDto from '../user/userDto';

export default interface NewsFeedListItem {
  id: number,
  title: string,
  description: string,
  link: string | null,
  file: File | null,
  user: UserDto,
  editionIsActivated: boolean
}