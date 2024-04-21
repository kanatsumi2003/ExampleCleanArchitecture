FROM node:18.2.0
WORKDIR /app
COPY package.json /.
COPY yarn.lock /.
RUN yarn --force
RUN yarn global add nodemon
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]