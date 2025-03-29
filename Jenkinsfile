pipeline {
    agent any
    environment {
        AWS_REGION = 'ap-south-1'
        ECR_REGISTRY = '630222198179.dkr.ecr.ap-south-1.amazonaws.com'
        ECR_REPO = 'zyra-moments-api'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        ECS_CLUSTER = 'new-zyra-moments-cluster'
        ECS_SERVICE = 'new-zyra-moments-service'
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
                    // Define dockerImage globally to ensure scope carries over
                    dockerImage = docker.build("${ECR_REGISTRY}/${ECR_REPO}:${IMAGE_TAG}")
                }
            }
        }
        stage('Push to ECR') {
            steps {
                script {
                    // Use withDockerRegistry to handle ECR login
                    withDockerRegistry(
                        credentialsId: 'ecr:ap-south-1:aws-cred-id', // Replace with your AWS creds ID
                        url: "https://${ECR_REGISTRY}"
                    ) {
                        dockerImage.push("${IMAGE_TAG}")
                        dockerImage.push("latest")
                    }
                }
            }
        }
        stage('Deploy to ECS') {
            steps {
                script {
                    // Use withAWS for ECS deployment
                    withAWS(credentials: 'aws-cred-id', region: "${AWS_REGION}") {
                        sh "aws ecs update-service --cluster ${ECS_CLUSTER} --service ${ECS_SERVICE} --force-new-deployment"
                    }
                }
            }
        }
    }
}