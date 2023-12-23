FROM node:20
WORKDIR /app
COPY ./src /app/src/
COPY ./package.json /app/package.json
COPY ./.env /app/.env

EXPOSE 7474

RUN npm i

CMD ["node", "/app/src/app.js"]

