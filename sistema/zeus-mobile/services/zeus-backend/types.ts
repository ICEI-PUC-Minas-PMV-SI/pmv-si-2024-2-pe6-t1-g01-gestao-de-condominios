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

export type ApartmentDto = {
  id: number;
  number: number;
  block: string;
  residents: UserDto[];
  createdAt: Date;
  updatedAt: Date;
};

export type ResidentDto = {
  id: number;
  name: string;
  email: string;
  cellphone: string;
  cpf: string;
  role: string;
  apartmentId: number;
  apartment: ApartmentDto;
  createdAt: Date;
  updatedAt: Date;
};

export type VisitorDto = {
  id: number;
  name: string;
  cellphone: string;
  cpf: string;
  visits: VisitDto[];
  createdAt: Date;
  updatedAt: Date;
};

export type VisitDto = {
  id: number;
  visitor: VisitorDto;
  resident: ResidentDto;
  status: string;
  visitedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
