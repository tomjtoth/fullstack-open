FROM node AS frontend

WORKDIR /usr/src/app

COPY osa2/puhelinluettelo/ .

RUN npm install
RUN npm run build



FROM node:alpine

WORKDIR /usr/src/app

COPY osa3/puhelinluettelo-backend . 

COPY --from=frontend /usr/src/app/dist /usr/src/app/dist

RUN npm install

# add the non-root user
RUN adduser --no-create-home --disabled-password --gecos "" dummy

USER dummy

ENV PORT=80

CMD [ "node", "index.js" ]

EXPOSE 80
