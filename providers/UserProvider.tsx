'use client';

import { MyUserContextProvider } from '@/hooks/useUser';

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  console.log('✅ UserProvider mounted');
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};

export default UserProvider;
