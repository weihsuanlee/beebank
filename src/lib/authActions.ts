"use server";

import { strapiApi } from "@/lib/strapi";
import { cookies } from "next/headers";

export async function serverLogin(identifier: string, password: string) {
  const cookieStore = await cookies();
  try {
    const response = await strapiApi.login(identifier, password); // This call runs on the server!

    cookieStore.set("strapi-jwt", response.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
      sameSite: "lax",
    });

    return { success: true, user: response.user, jwt: response.jwt };
  } catch (error) {
    console.error("Server Action Login Error:", error);

    return { success: false, error: "An unexpected error occurred during login.", status: 500 };
  }
}

export async function serverRegister(username: string, email: string, password: string) {
  const cookieStore = await cookies();

  try {
    const response = await strapiApi.register(username, email, password); // This call runs on the server!

    cookieStore.set("strapi-jwt", response.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
    });

    return { success: true, user: response.user, jwt: response.jwt };
  } catch (error) {
    console.error("Server Action Register Error:", error);

    return { success: false, error: "An unexpected error occurred during registration.", status: 500 };
  }
}

export async function serverLogout() {
  const cookieStore = await cookies();

  cookieStore.delete("strapi-jwt");
  return { success: true };
}
