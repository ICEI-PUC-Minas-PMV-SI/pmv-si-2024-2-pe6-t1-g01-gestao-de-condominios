import type UserDto from '../userDto';

export default interface SignupResponse {
  user: UserDto,
  accessToken: string
}