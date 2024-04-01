#!/bin/bash

source .env

docker run -d --name mongo-db \
    -p 127.0.0.1:27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=fullstack \
    -e MONGO_INITDB_ROOT_PASSWORD="$DB_PASS" \
    --rm \
    mongo:7.0-rc

