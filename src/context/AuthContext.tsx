import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useRef,
  type Ref,
} from "react";
import {
  whoami,
  login,
  register,
  logout,
  updatePassword,
} from "../services/urls/auth";

import type { User } from "@/types";
import { useLocation, useNavigate } from "react-router";
import { axiosClient } from "../services/axiosClient";

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean | undefined>>;
  authToken?: string | null;
  setAuthToken: Dispatch<SetStateAction<string | null | undefined>>;

  signin: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
    facility: string,
  ) => Promise<void>;
  signout: () => Promise<void>;
  changePassword: (
    email: string,
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;
  previousPathRef: Ref<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>();
  const navigate = useNavigate();
  const location = useLocation();
  const previousPathRef = useRef(location.pathname);
  // do not try to authenticate on the following paths

  useEffect(() => {
    const skipPaths = [
      "/auth/register",
      "/password/recover",
      "/password/reset/(.*)/(.*)",
    ];
    // Check if we have a session cookie
    const fetchData = async () => {
      try {
        // Update the ref with the current path
        // previousPathRef.current = location.pathname;
        const data = await whoami();
        setUser(data.user);
        setIsAuthenticated(true);
        if (previousPathRef.current !== location.pathname) {
          await navigate(previousPathRef.current);
        } else {
          if (previousPathRef.current === "/auth/login") {
            await navigate("/home");
          }
        }

        // Update the ref with the current path
        previousPathRef.current = location.pathname;
      } catch (error) {
        console.error("Signin error:", (error as Error).message);
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    if (
      isAuthenticated === undefined &&
      !matchInArray(location.pathname, skipPaths)
    )
      fetchData().catch((error) => {
        throw new Error((error as Error).message);
      });
  }, [isAuthenticated, location.pathname, navigate]);

  const matchInArray = (str: string, expressions: string[]) => {
    const isMatch = expressions.some((rx) => new RegExp(rx).test(str));

    if (isMatch) {
      const matchingRegex = expressions.find((rx) => new RegExp(rx).test(str));
      return matchingRegex; // This will output the matching regex
    }
    return "";
  };

  const signin = async (email: string, password: string) => {
    try {
      const data = await login({ email, password });
      setUser(data.user);
      setIsAuthenticated(true);
      setAuthToken(data.accessToken);
      // this way no need to wait for interceptor to set the token
      axiosClient.defaults.headers.common["Authorization"] =
        `Bearer ${data.accessToken}`;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const changePassword = async (
    email: string,
    currentPassword: string,
    newPassword: string,
  ) => {
    try {
      await updatePassword({ email, currentPassword, newPassword });
      // setUser(null);
      // setIsAuthenticated(false);
      // setAuthToken(null);
      // await navigate("/auth/login");
    } catch (error) {
      console.log("ChangePassword error:", (error as Error).message);
      throw new Error((error as Error).message);
    }
  };

  const signout = async () => {
    try {
      let response = await logout();
      console.log("Signout", response.message);
    } catch (error) {
      console.log("Signout error:", (error as Error).message);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setAuthToken(null);
      await navigate("/auth/login");
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
    facility: string,
  ) => {
    try {
      const data = await register({
        name,
        email,
        password,
        passwordConfirm,
        facility,
      });
      console.log("Signup successful!", data.user);
    } catch (error) {
      console.error("Signup error:", (error as Error).message);
      throw new Error((error as Error).message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authToken,
        setAuthToken,
        isAuthenticated: isAuthenticated ?? false,
        setIsAuthenticated,
        signin,
        signout,
        signup,
        changePassword,
        previousPathRef,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
