FROM node:20.18.1-alpine AS build
WORKDIR /app

# 소스 복사 및 빌드
COPY . .
RUN yarn install
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/dist /opt/app
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
