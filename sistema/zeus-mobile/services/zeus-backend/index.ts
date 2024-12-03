import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewsFeedDto, AuthRequestResponse, UserRole, VisitDto } from './types';

type FileType = {
  uri: string;
  type: string;
  name: string;
};

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

export const createNewsFeed = async ({
  title,
  description,
  file,
}: {
  title: string;
  description: string;
  file?: File;
}) => {
  const token = await AsyncStorage.getItem('zeus_accessToken');

  const formData = new FormData();
  if (title) formData.append('title', title);
  if (description) formData.append('description', description);

  if (file) {
    formData.append('file', file as File);
  }

  const response = await fetch(`${API_URL}/feed`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: formData,
  });

  return response.json() as Promise<NewsFeedDto>;
};

export const updateNewsFeed = async (
  id: number,
  data: { title: string; description: string; file?: File }
) => {
  const token = await AsyncStorage.getItem('zeus_accessToken');
  
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  
  if (data.file) {
    formData.append('file', data.file);
  }

  const response = await fetch(`${API_URL}/feed/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao atualizar notícia');
  }

  return response.json();
};

export const deleteNewsFeed = async (id) => {
  const response = await fetch(`${API_URL}/news/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const getVisits = async () => {
  const token = await AsyncStorage.getItem('zeus_accessToken');

  const response = await fetch(`${API_URL}/visit`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json() as Promise<VisitDto[]>;
};

export const updateVisit = async (data: VisitDto) => {
  const token = await AsyncStorage.getItem('zeus_accessToken');

  const updateVisitData = {
    visitorId: data.visitor.id,
    userId: data.resident.id,
    status: data.status,
    visitedAt: data.visitedAt,
  };

  const response = await fetch(`${API_URL}/visit/${data.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateVisitData),
  });

  return response.json() as Promise<VisitDto[]>;
};
