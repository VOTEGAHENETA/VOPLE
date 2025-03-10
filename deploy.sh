echo "🔹 EC2에서 Git 리포지토리 업데이트 중..."
git pull origin master

# Docker Compose 실행
echo "🚀 Docker Compose 실행 중..."
docker compose down client server --volumes
docker compose up -d --build client
docker compose up -d server

echo "서비스 시작 대기 중..."
sleep 90
for i in {1..3}; do
    if curl -f https://${EC2_URL}; then
        break
    fi
    if [ $i -eq 3 ]; then
        echo "클라이언트가 응답하지 않습니다."
        docker logs client
        exit 1
    fi
    echo "클라이언트 health check 재시도 중... ($i/3)"
    sleep 10
done

for i in {1..3}; do
    if curl -f https://${EC2_URL}/api/test; then
        break
    fi
    if [ $i -eq 3 ]; then
        echo "서버가 응답하지 않습니다."
        docker logs server
        exit 1
    fi
    echo "서버 health check 재시도 중... ($i/3)"
    sleep 10
done


rm .env
rm ./server/src/main/resources/application-prod.yml

