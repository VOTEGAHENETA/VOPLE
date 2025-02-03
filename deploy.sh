REPO_URL="https://lab.ssafy.com/s12-webmobile1-sub1/S12P11B102.git"
BRANCH="master"

echo "🔹 Git 사용자 설정"
git config user.email "hwgyuhyeon@gmail.com"
git config user.name "황규현"

echo "🔹 EC2에서 Git 리포지토리 업데이트 중..."
git pull origin $BRANCH

# Docker Compose 실행
echo "🚀 Docker Compose 실행 중..."
ls -al
ls -al client/
docker compose up -d server client
