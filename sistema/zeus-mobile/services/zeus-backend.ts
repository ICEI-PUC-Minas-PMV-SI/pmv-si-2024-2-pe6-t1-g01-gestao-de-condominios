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
  return response.json();
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
      role: 'MORADOR',
    }),
  });
  return response.json();
};
