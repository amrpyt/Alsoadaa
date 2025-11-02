import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

# Tag the image with v1
docker tag 00jimmy00/alsoadaa-website:latest 00jimmy00/alsoadaa-website:v1

# Then push both tags
docker push 00jimmy00/alsoadaa-website:latest
docker push 00jimmy00/alsoadaa-website:v1