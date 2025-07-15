import { cookies } from "next/headers";

export const getAuthToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("strapi-jwt")?.value;
};
