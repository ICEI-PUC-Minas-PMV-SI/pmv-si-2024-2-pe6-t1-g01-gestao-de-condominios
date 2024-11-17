import { NewsFeedDto, AuthRequestResponse, UserRole } from './types';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return response.json() as Promise<AuthRequestResponse>;
};

export const createUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      role: UserRole.MORADOR,
    }),
  });
  return response.json() as Promise<AuthRequestResponse>;
};

export const getNewsFeed = async () => {
  const response = await fetch(`${API_URL}/feed`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.json() as Promise<NewsFeedDto[]>;
};
