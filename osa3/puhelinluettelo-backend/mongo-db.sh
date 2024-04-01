#!/bin/bash

source .env

docker run -d --name mongo-db \
    -p 127.0.0.1:27017:27017 \
    -e MONGO_INITDB_DATABASE="$MONGO_INITDB_DATABASE" \
    -e MONGO_INITDB_ROOT_USERNAME="$MONGO_INITDB_ROOT_USERNAME" \
    -e MONGO_INITDB_ROOT_PASSWORD="$MONGO_INITDB_ROOT_PASSWORD" \
    --name fullstack-3.12 \
    mongo:7.0-rc

