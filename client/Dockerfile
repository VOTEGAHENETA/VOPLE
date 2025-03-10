FROM node:20.18.1-alpine AS build
WORKDIR /app

# 소스 복사 및 빌드
COPY . .

RUN printf "VITE_PUBLIC_URL=http://localhost\nVITE_PUBLIC_API_URL=http://localhost/api\nVITE_PUBLIC_OAUTH_URL=http://localhost/oauth2\nVITE_PUBLIC_URL=http://localhost\nVITE_PUBLIC_SOCKET_URL=ws://localhost\n" > .env

RUN yarn install
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/dist /opt/app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
