pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/albin6/zyra-moments-api.git', branch: 'main'
            }
        }
        stage('Build and Deploy') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose build'
                sh 'docker-compose up -d'
            }
        }
    }
    post {
        always {
            sh 'docker system prune -f'
        }
    }
}