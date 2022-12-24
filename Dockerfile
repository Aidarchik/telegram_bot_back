FROM node:16

workdir /app


COPY ./package.json .

RUN npm install

EXPOSE 5000

COPY . .

CMD [ "npm", "start" ]

