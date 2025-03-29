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
                sh 'docker-compose down' // Stop existing containers
                sh 'docker-compose build' // Build images
                sh 'docker-compose up -d' // Start containers
            }
        }
    }
    post {
        always {
            sh 'docker system prune -f' // Clean up unused Docker objects
        }
    }
}