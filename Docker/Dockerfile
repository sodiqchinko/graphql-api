FROM node:13-alpine

ENV NODE_ENV=development

WORKDIR /usr/mainsrc/app

RUN apk update && apk add --update gnupg && apk add git

COPY ../package.json /usr/mainsrc/app/
RUN npm cache verify
RUN npm install --no-package-lock

COPY ../src /usr/mainsrc/app/
COPY .* /usr/mainsrc/app/
COPY ../server.js /usr/mainsrc/app/

CMD [ "npm","run", "start"]
