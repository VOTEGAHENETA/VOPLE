echo "🔹 EC2에서 Git 리포지토리 업데이트 중..."
git pull origin master

# Docker Compose 실행
echo "🚀 Docker Compose 실행 중..."
docker compose up -d server client
