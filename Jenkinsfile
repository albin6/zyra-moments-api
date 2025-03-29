pipeline {
    agent none // No default agent; define per stage
    environment {
        AWS_REGION = 'ap-south-1'
        ECR_REGISTRY = '630222198179.dkr.ecr.ap-south-1.amazonaws.com'
        ECR_REPO = 'zyra-moments-api'
        ECS_CLUSTER = 'new-zyra-moments-cluster'
        ECS_SERVICE = 'new-zyra-moments-service'
    }
    stages {
        stage('Checkout') {
            agent { label 'master' } // Or any node with Git installed
            steps {
                git branch: 'main', url: 'https://github.com/albin6/zyra-moments-api.git'
            }
        }
        stage('Set Image Tag') {
            agent { label 'master' } // Minimal resources needed here
            steps {
                script {
                    env.IMAGE_TAG = env.BUILD_NUMBER
                }
            }
        }
        stage('Build Docker Image') {
            agent {
                docker { 
                    image 'docker:latest' 
                    args '-v /var/run/docker.sock:/var/run/docker.sock' // Access to Docker daemon
                }
            }
            steps {
                script {
                    sh "docker build -t ${ECR_REGISTRY}/${ECR_REPO}:${env.IMAGE_TAG} ."
                }
            }
        }
        stage('Push to ECR') {
            agent {
                docker { 
                    image 'amazon/aws-cli:latest' // AWS CLI for ECR login
                    args '-v /var/run/docker.sock:/var/run/docker.sock' // Still need Docker
                }
            }
            steps {
                script {
                    sh """
                    aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}
                    docker push ${ECR_REGISTRY}/${ECR_REPO}:${env.IMAGE_TAG}
                    docker tag ${ECR_REGISTRY}/${ECR_REPO}:${env.IMAGE_TAG} ${ECR_REGISTRY}/${ECR_REPO}:latest
                    docker push ${ECR_REGISTRY}/${ECR_REPO}:latest
                    """
                }
            }
        }
        stage('Deploy to ECS') {
            agent {
                docker { 
                    image 'amazon/aws-cli:latest' // AWS CLI for ECS deployment
                }
            }
            steps {
                script {
                    sh "aws ecs update-service --cluster ${ECS_CLUSTER} --service ${ECS_SERVICE} --force-new-deployment --region ${AWS_REGION}"
                }
            }
        }
    }
}