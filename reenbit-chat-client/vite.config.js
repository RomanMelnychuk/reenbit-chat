import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/chatHub': {
                target: 'https://reenbit-chat-app-bgdpdrgzbhg3angb.westeurope-01.azurewebsites.net',
                changeOrigin: true,
                ws: true,
            }
        }
    },
    build: {
        outDir: '../ReenbitChat/wwwroot',
        emptyOutDir: true,
    }
})