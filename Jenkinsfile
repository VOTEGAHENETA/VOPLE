pipeline {
    agent any

    environment {
        DB_HOST = credentials('db-host')
        DB_PORT = credentials('db-port')
        REDIS_HOST = credentials('redis-host')
        KAKAO_CLIENT_ID = credentials('kakao-client-id')
        KAKAO_CLIENT_SECRET = credentials('kakao-client-secret')
        EC2_IP = credentials('ec2-ip')
        SPRING_PROFILES_ACTIVE = 'prod'
        WEBHOOK_URL = credentials('discord-webhook')
    }

    stages {
        stage('Build Started') {
            steps {
                withCredentials([string(credentialsId: 'discord-webhook', variable: 'DISCORD_WEBHOOK')]) {
                    discordSend description: '🚀 Jenkins Build Started!', 
                              footer: 'Build is starting...',
                              title: 'Jenkins Build Alert', 
                              result: 'UNSTABLE',
                              webhookURL: DISCORD_WEBHOOK
                }
            }
        }
        
        stage('Setup Environment') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'db-credentials', usernameVariable: 'DB_CREDENTIALS_USR', passwordVariable: 'DB_CREDENTIALS_PSW')]) {
                        // docker-compose.yml env
                        writeFile file: '.env', text: """\
DB_HOST=${DB_HOST}
DB_PORT=${DB_PORT}
DB_NAME=vople
DB_USER=${DB_CREDENTIALS_USR}
DB_PASSWORD=${DB_CREDENTIALS_PSW}
SPRING_PROFILES_ACTIVE=prod
SPRING_DATASOURCE_URL=jdbc:mysql://${DB_HOST}:${DB_PORT}/vople?serverTimezone=UTC&characterEncoding=UTF-8&autoReconnect=true&useSSL=false&allowPublicKeyRetrieval=true
                        """

                        // Spring application-prod.yml env
                        writeFile file: 'application-prod.yml', text: """\
spring:
  config:
    activate:
      on-profile: prod
  datasource:
    url: jdbc:mysql://${DB_HOST}:${DB_PORT}/vople?serverTimezone=UTC&characterEncoding=UTF-8&autoReconnect=true&useSSL=false&allowPublicKeyRetrieval=true
    username: ${DB_CREDENTIALS_USR}
    password: ${DB_CREDENTIALS_PSW}
    driver-class-name: com.mysql.cj.jdbc.Driver

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
      host: ${REDIS_HOST}
      port: 6379
    rtmp:
      host: rtmp://i12b102.p.ssafy.io:1935/live/
    hls:
      host-prefix: https://i12b102.p.ssafy.io/hls/
      host-postfix: .m3u8
      
  security:
    oauth2:
      client:
        registration:
          kakao:
            client-id: ${KAKAO_CLIENT_ID}
            client-secret: ${KAKAO_CLIENT_SECRET}
            redirect-uri: https://i12b102.p.ssafy.io/login/oauth2/code/kakao
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

base_url: https://i12b102.p.ssafy.io
media_url: https://i12b102.p.ssafy.io
kakao_login_url: http://localhost:5173
"""
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'vople-ssh', keyFileVariable: 'SSH_KEY')]) {
                    script {
                        sh "mkdir -p ~/.ssh"
                        sh "ssh-keyscan -H ${EC2_IP} >> ~/.ssh/known_hosts"
                        sshagent(['vople-ssh']) {
                            sh "scp -o StrictHostKeyChecking=no .env ubuntu@${EC2_IP}:/home/ubuntu/opt/.env"
                            sh "scp -o StrictHostKeyChecking=no application-prod.yml ubuntu@${EC2_IP}:/home/ubuntu/opt/server/src/main/resources/application-prod.yml"
                            sh """
                                ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} '
                                chmod +x /home/ubuntu/opt/deploy.sh &&
                                cd /home/ubuntu/opt &&
                                ./deploy.sh
                                '
                            """
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            sh 'rm -f .env'
            sh 'rm -f application-prod.yml'
        }
    
        success {
            withCredentials([string(credentialsId: 'discord-webhook', variable: 'DISCORD_WEBHOOK')]) {
                discordSend description: '✅ Jenkins Build Success!', 
                          footer: 'Build was successful!',
                          title: 'Jenkins Build Alert',
                          result: currentBuild.currentResult,
                          webhookURL: DISCORD_WEBHOOK
            }
        }
    
        failure {
            withCredentials([string(credentialsId: 'discord-webhook', variable: 'DISCORD_WEBHOOK')]) {
                discordSend description: '❌ Jenkins Build Failed!', 
                          footer: 'Build failed.',
                          title: 'Jenkins Build Alert', 
                          result: currentBuild.currentResult,
                          webhookURL: DISCORD_WEBHOOK
            }
        }
    }
}