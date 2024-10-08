import type UserDto from '../user/userDto';

export interface SigninForm {
  email: string | null,
  password: string | null
}

export interface SigninResponse {
  user: UserDto,
  accessToken: string
}