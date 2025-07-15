"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { StrapiUser } from "@/lib/strapi";
import AuthContext from "./AuthContext";
import { serverLogin, serverRegister, serverLogout } from "@/lib/authActions";

const AuthProvider = ({ children, initialUser }: { children: ReactNode; initialUser: StrapiUser | null }) => {
  const [user, setUser] = useState<StrapiUser | null>(initialUser);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (identifier: string, password: string) => {
    setLoading(true);
    try {
      const result = await serverLogin(identifier, password);
      if (result.success && result.user) {
        setUser(result.user);
        setToken(result.jwt);
        router.push("/dashboard");
      } else {
        throw new Error(result.error || "Login failed.");
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setLoading(true);
    try {
      const result = await serverRegister(username, email, password);
      if (result.success && result.user) {
        setUser(result.user);
        setToken(result.jwt);
        router.push("/dashboard");
      } else {
        throw new Error(result.error || "Registration failed.");
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await serverLogout();
    setUser(null);
    setToken(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
