import type UserDto from '../user/userDto'

export default interface VisitDto {
  id: number,
  visitor: {
    id: number,
    name: string,
    cellphone: string,
    cpf: string,
    createdAt: Date,
    updatedAt: Date
  },
  resident: UserDto,
  status: 'APPROVED' | 'DISAPPROVED' | 'PENDING',
  visitedAt: Date,
  createdAt: Date,
  updatedAt: Date
}