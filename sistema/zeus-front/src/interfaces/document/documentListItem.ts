import type UserDto from '../user/userDto';

export default interface DocumentListItem {
  id: number,
  name: string,
  description: string,
  link: string,
  file: File | null,
  user: UserDto,
  createdAt: Date,
  updatedAt: Date,
  editionIsActivated: boolean
}