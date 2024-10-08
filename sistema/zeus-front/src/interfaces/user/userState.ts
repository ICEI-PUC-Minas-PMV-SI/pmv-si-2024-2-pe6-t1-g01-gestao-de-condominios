import type UserDto from './userDto';

export default interface UserState {
  user: UserDto | null;
  isAuthenticated: boolean;
}