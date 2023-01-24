ARG NODE_IMAGE=node:lts-alpine

FROM $NODE_IMAGE AS init
    RUN mkdir -p /usr/src/app && chown node:node /usr/src/app
    WORKDIR /usr/src/app
    RUN mkdir -p dist && chown node:node dist
    RUN mkdir tmp
    USER node

FROM init AS dependencies
    COPY --chown=node:node ./package*.json ./
    RUN npm install
    COPY --chown=node:node . .

FROM dependencies AS build
    RUN npm config set unsafe-perm true
    RUN npm run build

FROM init AS production
    ENV NODE_ENV=production
    COPY --chown=node:node ./package*.json ./
    RUN npm ci
    COPY --chown=node:node --from=build /usr/src/app/dist .
    EXPOSE 3000
    CMD ["node", "main"]