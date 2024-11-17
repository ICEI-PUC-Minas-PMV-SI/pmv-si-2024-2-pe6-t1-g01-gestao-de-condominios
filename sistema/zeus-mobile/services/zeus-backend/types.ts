export enum UserRole {
  ADMIN = 'ADMIN',
  SINDICO = 'SINDICO',
  MORADOR = 'MORADOR',
  PORTEIRO = 'PORTEIRO',
}

export type UserDto = {
  id: number;
  email: string;
  role: UserRole;
  name: string;
  cellphone: string | null;
  cpf: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type NewsFeedDto = {
  id: number;
  title: string;
  description: string;
  link: string | null;
  user: UserDto;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthRequestResponse = {
  user: UserDto;
  accessToken: string;
};
