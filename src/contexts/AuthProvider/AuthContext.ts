"use client";
import { createContext } from "react";
import { StrapiUser } from "@/lib/strapi";

interface AuthContextType {
  user: StrapiUser | null;
  token: string | null;
  login: (identifier: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>({
  user: null,
  token: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  loading: false,
});

export default AuthContext;
