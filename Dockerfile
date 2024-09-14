FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN yarn run build

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/app.js"]
