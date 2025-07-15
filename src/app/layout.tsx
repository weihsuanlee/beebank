import type { Metadata, Viewport } from "next";
import { noto_sans } from "@/configs/font.config";
import "@/configs/style/base.scss";

import AuthProvider from "@/contexts/AuthProvider/AuthProvider";
import MUIThemeProvider from "@/contexts/MUIThemeProvider/MUIThemeProvider";
import { getAuthToken } from "@/lib/authUtils";
import { StrapiUser, strapiApi } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "BeeBank",
  description: "Banking Dashboard Web App",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getAuthToken();
  let initialUser: StrapiUser | null = null;

  if (token) {
    try {
      initialUser = await strapiApi.getMe(token);
    } catch (error) {
      console.error("Server-side initial user fetch failed:", error);
      initialUser = null;
    }
  }

  return (
    <html lang="en">
      <body className={noto_sans.className}>
        <MUIThemeProvider>
          <AuthProvider initialUser={initialUser}>{children}</AuthProvider>
        </MUIThemeProvider>
      </body>
    </html>
  );
}
