import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { expand } from "dotenv-expand";
import path from "path";

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");
expand({
  parsed: env,
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const envWithExpand = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: parseInt(envWithExpand.VITE_FRONTEND_PORT || "5004"),
      host: true,
      strictPort: true,
      watch: {
        usePolling: true,
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
