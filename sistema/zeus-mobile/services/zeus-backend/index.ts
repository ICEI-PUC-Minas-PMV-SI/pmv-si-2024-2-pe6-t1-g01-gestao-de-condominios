import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewsFeedDto, AuthRequestResponse, UserRole, VisitorDto } from './types';

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
  const token = await AsyncStorage.getItem('zeus_accessToken');

  const response = await fetch(`${API_URL}/feed`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json() as Promise<NewsFeedDto[]>;
};

export const createNewsFeedPost = async ({
  title,
  description,
  file,
}: {
  title: string;
  description: string;
  file: File;
}) => {
  const token = await AsyncStorage.getItem('zeus_accessToken');

  const formData = new FormData();

  if (title) formData.append('title', title);
  if (description) formData.append('description', description);
  if (file) formData.append('file', file);

  const response = await fetch(`${API_URL}/feed`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return response.json() as Promise<NewsFeedDto>;
};

export const getVisitors = async () => {
  const token = await AsyncStorage.getItem('zeus_accessToken');

  const response = await fetch(`${API_URL}/visitor`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json() as Promise<VisitorDto[]>;
};

export const createVisitors = async (name: string, cellphone: string, cpf: string) => {
  const token = await AsyncStorage.getItem('zeus_accessToken');

  const response = await fetch(`${API_URL}/visitor`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      cellphone,
      cpf,
    }),
  });

  return response.json() as Promise<VisitorDto[]>;
};

export const updateVisitors = async (name: string, cellphone: string, cpf: string, id: number) => {
  const token = await AsyncStorage.getItem('zeus_accessToken');

  const response = await fetch(`${API_URL}/visitor/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      cellphone,
      cpf,
    }),
  });

  return response.json() as Promise<VisitorDto[]>;
};

export const deleteVisitors = async (id: number) => {
  const token = await AsyncStorage.getItem('zeus_accessToken');

  const response = await fetch(`${API_URL}/visitor/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json() as Promise<VisitorDto[]>;
};