pipeline {
    agent any
    
    environment {
        DB_CREDENTIALS = credentials('db-credentials')
        DB_HOST = credentials('db-host')
        SPRING_DATASOURCE_URL = "jdbc:mysql://${DB_CREDENTIALS_USR}:3306/vople?serverTimezone=UTC&characterEncoding=UTF-8&autoReconnect=true&useSSL=false&allowPublicKeyRetrieval=true"
        WEBHOOK_URL = "https://discord.com/api/webhooks/1334115054273957990/3Kr6TYIF1Bj_C1_syWRz6LabxzMrUGL6ZNAPUTPV2DZ_LvYrF8YxRGWuNUiG3Xg9yRqd"
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
                    // docker-compose.yml env
                    writeFile file: '.env', text: """
                        DB_HOST=${DB_HOST}
                        DB_PORT=3306
                        DB_NAME=vople
                        DB_USER=${DB_CREDENTIALS_USR}
                        DB_PASSWORD=${DB_CREDENTIALS_PSW}
                        SPRING_PROFILES_ACTIVE=prod
                        SPRING_DATASOURCE_URL=${SPRING_DATASOURCE_URL}
                    """
                    
                    // Spring application-prod.yml env
                    writeFile file: 'server/src/main/resources/application-prod.yml', text: """
                        spring:
                        datasource:
                            url: ${SPRING_DATASOURCE_URL}
                            username: ${DB_CREDENTIALS_USR}
                            password: ${DB_CREDENTIALS_PSW}
                    """
                }
            }
        }

        stage('Update Containers') {
            steps {
                script {
                    sh 'docker-compose up -d --build server client'
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        
        success {
            title: "VOPLE Jenkins",
            discordSend description: "Jenkins Build Alert",
            footer: "Build success.",
            webhookURL: "${WEBHOOK_URL}"
        }

        failure {
            title: "VOPLE Jenkins",
            discordSend description: "Jenkins Build Alert",
            footer: "Build failed.",
            webhookURL: "${WEBHOOK_URL}"
        }
    }
}