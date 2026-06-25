# Etapa 1: Construcción (Build)
FROM node:18-alpine AS build
WORKDIR /app

# Copiar los archivos de dependencias de Node
COPY package*.json ./
RUN npm install

# Copiar el resto del código y construir la aplicación para producción
COPY . .
RUN npm run build

# Etapa 2: Distribución con Nginx
FROM nginx:alpine

# ¡CORRECCIÓN AQUÍ!: Copiar la carpeta 'dist' (donde Vite pone los archivos) en lugar de 'www'
COPY --from=build /app/dist /usr/share/nginx/html

# Configuración de Nginx para evitar fallas en el enrutamiento
RUN rm /etc/nginx/conf.d/default.conf
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html index.htm; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

# Exponer el puerto HTTP estándar
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
