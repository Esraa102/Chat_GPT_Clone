import { createContext, ReactNode, useContext, useState } from "react";

type CurrentUser = {
  username: string;
  email: string;
  imgProfile?: string;
};

type AuthUser = {
  isLoggedIn: boolean;
  user: CurrentUser | null;
  logIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    username: string,
    imgProfile?: string
  ) => Promise<void>;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthUser | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setiIsLoggedIn] = useState(false);
  const signUp = async (
    email: string,
    password: string,
    username: string,
    imgProfile?: string
  ) => {};
  const logIn = async (email: string, password: string) => {};
  const logOut = async () => {};
  return (
    <AuthContext.Provider value={{ user, isLoggedIn, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuthContext = () => useContext(AuthContext);
