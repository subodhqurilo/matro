'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  profileImage: string | File | null;
  setProfileImage: (image: string | File | null) => void;
}

const UserContext = createContext<UserContextType>({
  profileImage: null,
  setProfileImage: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profileImage, setProfileImage] = useState<string | File | null>(null);

  return (
    <UserContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ You MUST export this so other files can import it
export const useUser = () => useContext(UserContext);
