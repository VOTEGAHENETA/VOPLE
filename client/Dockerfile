FROM node:20.18.1-alpine AS build
WORKDIR /app

# 소스 복사 및 빌드
COPY . .

RUN echo "VITE_PUBLIC_API_URL=https://i12b102.p.ssafy.io/api" > .env

RUN yarn install
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/dist /opt/app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
