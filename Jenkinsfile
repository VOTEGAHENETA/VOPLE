pipeline {
    agent any

    environment {
        DB_HOST = credentials('db-host')
        SPRING_PROFILES_ACTIVE = 'prod'
        WEBHOOK_URL = credentials('discord-webhook')
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
                    withCredentials([usernamePassword(credentialsId: 'db-credentials', usernameVariable: 'DB_CREDENTIALS_USR', passwordVariable: 'DB_CREDENTIALS_PSW')]) {
                        // docker-compose.yml env
                        writeFile file: '.env', text: """
                            DB_HOST=${DB_HOST}
                            DB_PORT=3306
                            DB_NAME=vople
                            DB_USER=${DB_CREDENTIALS_USR}
                            DB_PASSWORD=${DB_CREDENTIALS_PSW}
                            SPRING_PROFILES_ACTIVE=prod
                            SPRING_DATASOURCE_URL=jdbc:mysql://${DB_HOST}:3306/vople?serverTimezone=UTC&characterEncoding=UTF-8&autoReconnect=true&useSSL=false&allowPublicKeyRetrieval=true
                        """

                        // Spring application-prod.yml env
                        writeFile file: 'server/src/main/resources/application-prod.yml', text: """
                            spring:
                            datasource:
                                url: jdbc:mysql://${DB_HOST}:3306/vople?serverTimezone=UTC&characterEncoding=UTF-8&autoReconnect=true&useSSL=false&allowPublicKeyRetrieval=true
                                username: ${DB_CREDENTIALS_USR}
                                password: ${DB_CREDENTIALS_PSW}
                        """
                    }
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
	    sh 'rm -f .env'
        }

        success {
            discordSend description: "Jenkins Build Alert",
                        footer: "Build success.",
                        webhookURL: "${WEBHOOK_URL}"
        }

        failure {
            discordSend description: "Jenkins Build Alert",
                        footer: "Build failed.",
                        webhookURL: "${WEBHOOK_URL}"
        }
    }
}

