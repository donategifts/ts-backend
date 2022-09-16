FROM node:18

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app
COPY yarn.lock /app
RUN yarn

# Bundle app source
COPY . /app
RUN npx prisma generate --schema=./prisma/schema.prisma

RUN yarn build

EXPOSE 8080
CMD [ "yarn run prisma:migrate-deploy; yarn start" ]
