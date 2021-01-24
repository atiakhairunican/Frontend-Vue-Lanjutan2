def dockerhub = "atiakhairunican/jenkinsfront"
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder

pipeline {
    agent any

    parameters {
        choice(
            choices: ['prod', 'dev'],
            description: '',
            name: 'REQUESTED_ACTION'
        )
    }

    stages {
        stage("Install dependencies") {
            steps {
                nodejs("node14") {
                    sh "npm install"
                }
            }
        }

        stage("Build docker") {
            steps {
                script {
                    builder = docker.build("${dockerhub}:${BRANCH_NAME}")
                }
            }
        }

        stage("Testing image") {
            steps {
                script {
                    builder.inside {
                        sh "echo passed"
                    }
                }
            }
        }

        stage("Push image") {
            steps {
                script {
                    builder.push()
                }
            }
        }

        stage("Production") {
            when {
                expression {
                    params.REQUESTED_ACTION == 'prod'
                }
            }
            steps {
                script {
                    sshPublisher {
                        publishers: [
                            sshPublisherDesc {
                                configName: 'prodserver',
                                verbose: true,
                                transfers: [
                                    sshTransfer {
                                        execCommand: "docker rmi ${image_name}; docker pull ${image_name}; cd /home/production/production; docker-compose down; docker-compose up -d",
                                        execTimeout: 1500000
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        }

        stage("Deployment") {
            when {
                expression {
                    params.REQUESTED_ACTION == 'dev'
                }
            }
            steps {
                script {
                    sshPublisher {
                        publishers: [
                            sshPublisherDesc {
                                configName: 'devserver',
                                verbose: true,
                                transfers: [
                                    sshTransfer {
                                        execCommand: "docker rmi ${image_name}; docker pull ${image_name}; cd /home/production/production; docker-compose down; docker-compose up -d",
                                        execTimeout: 1500000
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        }
    }
}