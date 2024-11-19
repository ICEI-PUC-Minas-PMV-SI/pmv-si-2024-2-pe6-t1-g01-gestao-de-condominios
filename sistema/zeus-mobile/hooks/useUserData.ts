import type { UserDto } from '@/services/zeus-backend/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export const useUserData = () => {
  const [user, setUser] = useState<UserDto | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('zeus_user').then((user) => {
      if (user) {
        setUser(JSON.parse(user));
      }
    });
  }, []);

  return user;
};
