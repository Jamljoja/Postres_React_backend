# Usa la versión de Node que tienes
FROM node:22-alpine

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install --production

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 5000

# Arrancar la app
CMD ["node", "index.js"]