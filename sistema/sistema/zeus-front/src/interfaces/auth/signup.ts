import type UserDto from '../user/userDto';

export default interface SignupResponse {
  user: UserDto,
  accessToken: string
}