import type { UserDto } from '@/services/zeus-backend/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export const useUserData = () => {
  const [user, setUser] = useState<UserDto | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = await AsyncStorage.getItem('zeus_user');
      if (user) {
        setUser(JSON.parse(user));
      }
    };

    fetchUserInfo();
  }, []);

  return user;
};
