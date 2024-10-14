import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: { port: 3000 },
    define: {
      REACT_APP_GRAPHQL_URI: JSON.stringify(env.REACT_APP_GRAPHQL_URI)
    }
  }
})
