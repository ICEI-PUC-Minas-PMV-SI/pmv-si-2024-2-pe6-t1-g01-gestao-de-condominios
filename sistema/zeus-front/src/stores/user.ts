import type UserDto from '@/interfaces/user/userDto'
import type UserState from '@/interfaces/user/userState'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: (JSON.parse(localStorage.getItem('zeus_user') || 'null') as UserDto | null),
    isAuthenticated: !!localStorage.getItem('zeus_accessToken')
  }),
  actions: {
    setIsAutenticated(value: boolean) {
      this.isAuthenticated = value
      if (!value) {
        localStorage.removeItem('zeus_accessToken');
        localStorage.removeItem('zeus_user');
      }
    },
    setUser(value: UserDto) {
      this.user = value
      localStorage.setItem('zeus_user', JSON.stringify(value))
    }
  }
})
