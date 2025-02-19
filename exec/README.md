# 포팅 매뉴얼

## 1️⃣ 개요 및 목적

중·고등학교 학생 임원 선거 플랫폼으로, 기존 수기 투표 방식의 불편함을 줄이고, 학생이 투표에 적극적으로 참여할 수 있는 환경을 제공합니다.

## 2️⃣ 시스템 아키텍처 및 구성요소

## 3️⃣ 환경 요구사항

### Frontend

| Skill | Version |
| --- | --- |
| Yarn Berry | 4.6.0 |
| React | 18.3.1 |
| TypeScript |  |
| Zustand | 5.0.3 |
| React-query | 5.63.0 |
| SCSS |  |
| Storybook | 3.2.3 |
| Axios | 1.7.9 |
| STOMP | 7.0.0 |
| sockjs-client | 1.5.4 |
| hls.js | 1.5.20 |

### Backend

| Skill | Version |
| --- | --- |
| Java | 17 |
| JPA | 3.0 |
| SpringBoot | 3.4.1 |
| SpringSecurity | 6 |
| stomp-websocket | 2.3.4 |
| FFmpeg | 4.4.1 |
| MySQL | 8.0.30 |
| Redis | 7.4.2 |
| zxing | 3.5.0 |

### INFRA

| Skill | Version |
| --- | --- |
| AWS EC2 | t2.xlarge |
| Docker | 27.5.1 |
| Docker-compose | 2.2.2 |
| Jenkins | 2.492.1 |
| NginX | 1.27.3 |

## 📌 EC2 포트 번호

| Skill | Port (External:Internal) |
| --- | --- |
| NGINX + Front-end build | 80:80/443 |
| SpringBoot | 8000:8080 |
| MySQL | 3307:3306 |
| Redis | 6379:6379 |
| RTMP | 1935:1935 |
| HLS | 8050:8050 |
| Jenkins | 9000:8080 |

## 📌환경 변수 - 설정 및 커스터마이징
### 카카오 OAuth 설정
- kakao developers에서 API 키 받아오고, client id와 secret을 추가
- redirect url 허용 ip에 본인의 컴퓨터 ip 추가

### `./server/src/resources/application-prod.yml` 생성
- EC2 프로덕션에서는 Jenkins credential 사용 중
```
spring:
  config:
    activate:
      on-profile: prod
      
  datasource:
    url: jdbc:mysql://db:3306/vople?serverTimezone=UTC&characterEncoding=UTF-8&autoReconnect=true&useSSL=false&allowPublicKeyRetrieval=true
    username: root
    password: 1234
    driver-class-name: com.mysql.cj.jdbc.Driver
    
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB

  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        show_sql: true
        format_sql: true
        dialect: org.hibernate.dialect.MySQLDialect
    defer-datasource-initialization: true

  sql:
    init:
      mode: never

  data:
    redis:
      host: redis
      port: 6379
    rtmp:
      host: rtmp://localhost:1935/live/
    hls:
      host-prefix: http://localhost:8050/hls/
      host-postfix: .m3u8
      
  security:
    oauth2:
      client:
        registration:
          kakao:
            client-id: {your_client_id}
            client-secret: {your-client-secret}
            redirect-uri: http://localhost/login/oauth2/code/kakao
            authorization-grant-type: authorization_code
            client-authentication-method: client_secret_post
            scope:
              - profile_nickname
            client-name: kakao

        provider:
          kakao:
            authorization-uri: https://kauth.kakao.com/oauth/authorize
            token-uri: https://kauth.kakao.com/oauth/token
            user-info-uri: https://kapi.kakao.com/v2/user/me
            user-name-attribute: id
springdoc:
  swagger-ui:
    path: /index.html
  api-docs:
    path: /v3/api-docs

base_url: http://localhost
kakao_login_url: http://localhost
```
### `./.env` docker-compose.yml에 적용할 환경 변수 파일 생성
```
DB_HOST=db
DB_PORT=3306
DB_NAME=vople
DB_USER=root
DB_PASSWORD=1234
SPRING_PROFILES_ACTIVE=prod
SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/vople?serverTimezone=UTC&characterEncoding=UTF-8&autoReconnect=true&useSSL=false&allowPublicKeyRetrieval=true
```

### `./client/Dockerfile` client의 Dockerfile을 override: 도메인 변경
```
FROM node:20.18.1-alpine AS build
WORKDIR /app

# 소스 복사 및 빌드
COPY . .

RUN printf "VITE_PUBLIC_API_URL=http://localhost/api\nVITE_PUBLIC_OAUTH_URL=http://localhost/oauth2\nVITE_PUBLIC_URL=http://localhost\nVITE_PUBLIC_SOCKET_URL=ws://localhost\n" > .env

RUN yarn install
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/dist /opt/app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### `./nginx/default.conf`
- http를 사용할 경우 `./nginx/default.conf`의 31번째 ~ 43번째 줄 삭제
- https를 사용할 경우 30번째, 37번째 줄의 server_name과 39, 40번째 줄의 certificate key 정보를 해당 서비스 도메인으로 변경

## 4️⃣설치 및 배포 절차

### AWS EC2 설정
- Docker 및 Docker-compose 설치 (Docker desktop 설치해도 무방)
```
# Docker 설치
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \ $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \ sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
docker --version

# Docker-compose 별도 설치
curl -L
"https://github.com/docker/compose/releases/download/v2.2.2/docker-compose-$(uname -s)-$(uname -m)"
-o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker compose --version
``` 

### Git pull 및 서비스 실행 (Jenkins 제외)
```        
git clone https://lab.ssafy.com/s12-webmobile1-sub1/S12P11B102.git
        
cd S12P11B102
sudo docker compose up -d redis db nginx-rtmp server
sudo docker compose up -d --build client
```