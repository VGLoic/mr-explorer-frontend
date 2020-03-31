FROM node:12 as builder

COPY package.json .
COPY yarn.lock .

RUN yarn install; \
    yarn global add serve

COPY . . 
RUN yarn build

ENV NODE_ENV=production

EXPOSE 3000
CMD serve -p 3000 -s build
