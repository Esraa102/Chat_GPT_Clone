/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  checkAuthStatus,
  logInUser,
  logOutUser,
  registerUser,
} from "../helpers/api-communicators";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "../components";
type CurrentUser = {
  username: string;
  email: string;
  imgProfile?: string;
};

export type AuthUser = {
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
  loading: boolean;
};

const AuthContext = createContext<AuthUser | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkStatus() {
      setLoading(true);
      try {
        const data = await checkAuthStatus();
        if (data.userData) {
          setUser(data.userData);
          setIsLoggedIn(true);
          navigate("/");
        }
      } catch (error: unknown) {
        console.log(error);
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
    checkStatus();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    username: string,
    imgProfile?: string
  ) => {
    setLoading(true);
    try {
      const data = await registerUser(username, email, password, imgProfile);
      if (data.userData) {
        setUser(data.userData);
        setIsLoggedIn(true);
        toast.success("User has been created successfully");
        navigate("/");
      }
    } catch (error: unknown) {
      console.log(error);
      setUser(null);
      setIsLoggedIn(false);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const logIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await logInUser(email, password);
      if (data.userData) {
        setUser(data.userData);
        setIsLoggedIn(true);
        toast.success("User Logged in successfully");
        navigate("/");
      }
    } catch (error: unknown) {
      console.log(error);
      setUser(null);
      setIsLoggedIn(false);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      const data = await logOutUser();
      if (data.status === "OK") {
        setUser(null);
        setIsLoggedIn(false);
        toast.success(data.message);
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, signUp, logIn, logOut, loading }}
    >
      {loading ? <Loader miniLoad={false} /> : children}
    </AuthContext.Provider>
  );
};

export const UseAuthContext = () => useContext(AuthContext);
