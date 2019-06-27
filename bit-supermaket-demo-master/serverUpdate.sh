#!/bin/bash

if [ -z "$1" ]
  then
    echo "Pem path must be sent as first argument. exiting."
    exit 1
fi

if [ -z "$2" ]
  then
    echo "PAY_TO must be sent as second argument. exiting."
    exit 1
fi

PEM_FILE=$1

REMOTE_BUILD_FOLDER=/home/ec2-user/bit-demo-build
REMOTE_RUN_FOLDER=/home/ec2-user/bit-demo
PAY_TO=$2

BASEDIR=$(dirname "$0")
cd "$BASEDIR"
tar -zcvf bit-demo-build.tar.gz client .dockerignore .gitignore Dockerfile package.json package-lock.json server.js
scp -i  "$PEM_FILE" bit-demo-build.tar.gz ec2-user@18.195.215.88:/home/ec2-user/
ssh -i  "$PEM_FILE" ec2-user@18.195.215.88 "rm -rf $REMOTE_BUILD_FOLDER/*"
ssh -i  "$PEM_FILE" ec2-user@18.195.215.88 "tar -C $REMOTE_BUILD_FOLDER -xvf /home/ec2-user/bit-demo-build.tar.gz"
ssh -i  "$PEM_FILE" ec2-user@18.195.215.88 "sed -i 's/.*PAY_TO.*/    - PAY_TO=$PAY_TO/' $REMOTE_RUN_FOLDER/docker-compose.yml"
ssh -i  "$PEM_FILE" ec2-user@18.195.215.88 "cd $REMOTE_RUN_FOLDER && ./updateDocker.sh"
ssh -i  "$PEM_FILE" ec2-user@18.195.215.88 "rm -rf /home/ec2-user/bit-demo-build.tar.gz"
rm - rf bit-demo-build.tar.gz

