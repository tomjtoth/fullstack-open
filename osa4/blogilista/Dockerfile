# create the SECRET_KEY in .env
FROM alpine:latest as secret_generator
RUN apk add --no-cache util-linux
RUN echo "SECRET=$(uuidgen)" > .env



FROM node:20-alpine

WORKDIR /usr/src/app

COPY . .

# move over the .env file
COPY --from=secret_generator /.env /usr/src/app

RUN npm ci

CMD [ "npm", "start" ]
