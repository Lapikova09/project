FROM node:18-alpine AS build
WORKDIR /app

# Копируем зависимости
COPY package*.json ./
RUN npm install

# Копируем всё остальное и собираем
COPY . .
RUN npm run build --configuration=production

# Этап 2: Раздача через Nginx
FROM nginx:stable-alpine

# Мы используем путь /app/dist/*/browser
# Звездочка (*) сама найдет папку с любым названием проекта
COPY --from=build /app/dist/*/browser /usr/share/nginx/html

# Твой конфиг Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]