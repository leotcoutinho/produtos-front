# ─── Etapa 1: Build da aplicação React ───────────────────
FROM node:20-alpine AS build
WORKDIR /app

# Copia dependências e instala (cache eficiente)
COPY package*.json .
RUN npm ci

# Copia o código e gera o build de produção
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# ─── Etapa 2: Servir com Nginx ────────────────────────────
FROM nginx:alpine AS runtime
WORKDIR /usr/share/nginx/html

# Remove o site padrão do Nginx
RUN rm -rf ./*

# Copia o build gerado na etapa anterior
COPY --from=build /app/dist .

# Copia configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]