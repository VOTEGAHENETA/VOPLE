pipeline {
    agent any
    
    environment {
        DB_CREDENTIALS = credentials('db-credentials')
        DB_HOST = credentials('db-host')
        SPRING_DATASOURCE_URL = "jdbc:mysql://${DB_CREDENTIALS_USR}:3306/vople?serverTimezone=UTC&characterEncoding=UTF-8&autoReconnect=true&useSSL=false&allowPublicKeyRetrieval=true"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Environment') {
            steps {
                script {
                    // docker-compose용 .env
                    sh """
                        echo "DB_HOST=${DB_HOST}" > .env
                        echo "DB_PORT=3306" >> .env
                        echo "DB_NAME=vople" >> .env
                        echo "DB_USER=${DB_CREDENTIALS_USR}" >> .env
                        echo "DB_PASSWORD=${DB_CREDENTIALS_PSW}" >> .env
                        echo "SPRING_PROFILES_ACTIVE=prod" >> .env
                        echo "SPRING_DATASOURCE_URL=${SPRING_DATASOURCE_URL}" >> .env
                    """
                    
                    // Spring application-prod.yml 환경변수
                    dir('server/src/main/resources') {
                        sh """
                            echo "spring:" > application-prod.yml
                            echo "  datasource:" >> application-prod.yml
                            echo "    url: ${SPRING_DATASOURCE_URL}" >> application-prod.yml
                            echo "    username: ${DB_CREDENTIALS_USR}" >> application-prod.yml
                            echo "    password: ${DB_CREDENTIALS_PSW}" >> application-prod.yml
                        """
                    }
                }
            }
        }

        stage('Update Containers') {
            steps {
                script {
                    sh 'docker-compose up -d --build server client nginx-rtmp'
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        // 여기에 디코/mm 알람 추가 가능
    }
}