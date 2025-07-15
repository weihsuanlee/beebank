import type { NextConfig } from "next";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceDir = resolve(__dirname, "src");

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `@use "${sourceDir}/configs/style/global.scss" as *;`,
  },
};

export default nextConfig;
