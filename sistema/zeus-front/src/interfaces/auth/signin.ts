import type UserDto from '../userDto';

export interface SigninForm {
  email: string | null,
  password: string | null
}

export interface SigninResponse {
  user: UserDto,
  accessToken: string
}