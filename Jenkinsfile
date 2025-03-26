pipeline {
    agent any
    environment {
        AWS_REGION = 'ap-south-1'
        ECR_REGISTRY = '630222198179.dkr.ecr.us-east-1.amazonaws.com'
        ECR_REPO = 'zyra-moments-api'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        ECS_CLUSTER = 'zyra-moments-cluster'
        ECS_SERVICE = 'zyra-moments-service'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/albin6/zyra-moments-api.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${ECR_REGISTRY}/${ECR_REPO}:${IMAGE_TAG}")
                }
            }
        }
        stage('Push to ECR') {
            steps {
                script {
                    sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}"
                    dockerImage.push()
                }
            }
        }
        stage('Deploy to ECS') {
            steps {
                script {
                    sh "aws ecs update-service --cluster ${ECS_CLUSTER} --service ${ECS_SERVICE} --force-new-deployment --region ${AWS_REGION}"
                }
            }
        }
    }
}