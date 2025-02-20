# 포팅 매뉴얼

## 1️⃣ 개요 및 목적

중·고등학교 학생 임원 선거 플랫폼으로, 기존 수기 투표 방식의 불편함을 줄이고, 학생이 투표에 적극적으로 참여할 수 있는 환경을 제공합니다.

## 2️⃣ 시스템 아키텍처 및 구성요소
![System-architecture](/uploads/74610721fc49b01d44153d3f6c6db0a0/image.png)

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
### 1. 카카오 OAuth 설정하기
- kakao developers에서 API 키 받아오고, client id와 secret을 추가
- redirect url 허용 ip에 본인의 컴퓨터 ip 추가

### 2. ./exec/config에 존재하는 설정 파일을 프로젝트 루트 폴더에 덮어쓰기 (기존 도메인은 i12b102.p.ssafy.io) - exec의 설정은 http://localhost 기준입니다.

#### `./server/src/resources/application-prod.yml` Spring Boot 설정 파일
- config 폴더 아래에 존재함
- 36, 38, 48, 67, 68번째 줄의 URL을 도메인에 맞게 수정
- 46, 47번째줄의 kakao client id와 secret을 kakao developers에서 받아온 것들로 변경
- Jenkins를 사용할 경우 이 파일은 Jenkins가 생성합니다

#### `./.env` docker-compose.yml에 적용할 환경 변수 파일
- config 폴더 아래에 존재함
- 추가 수정 필요 X
- Jenkins를 사용할 경우 이 파일은 Jenkins가 생성합니다

#### `./client/Dockerfile` React에 적용하는 환경 변수 파일
- config 폴더 아래에 존재함
- 7번째 줄 env의 URL을 도메인에 맞게 수정

#### `./nginx/default.conf` NginX 설정 파일
- config 폴더 아래에 존재함
- http를 사용할 경우 exec 폴더 아래의 default.conf를 그대로 사용
- https를 사용할 경우 30번째, 37번째 줄의 server_name과 39, 40번째 줄의 certificate key 정보를 해당 서비스 도메인으로 변경 및 파일명을 `default-https.conf`에서 `default.conf`로 변경

## 4️⃣설치 및 배포 절차

### AWS EC2 설정
#### 1. Docker 및 Docker-compose 설치 (Docker desktop 설치해도 무방)
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

#### 2. Git pull 및 서비스 실행 (Jenkins 제외)
```        
git clone https://lab.ssafy.com/s12-webmobile1-sub1/S12P11B102.git
        
cd S12P11B102
sudo docker compose up -d redis db nginx-rtmp server
sudo docker compose up -d --build client
```