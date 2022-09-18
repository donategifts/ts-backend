FROM node:18
# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
COPY prisma ./prisma
RUN ls -la
RUN yarn install
RUN npx prisma generate --schema=./prisma/schema.prisma
RUN yarn build

# only run production files
FROM node:18
WORKDIR /app
COPY package.json ./
COPY prisma ./prisma
RUN yarn install --prod
RUN npx prisma generate --schema=./prisma/schema.prisma
COPY --from=0 /app/dist .
EXPOSE 8080
CMD ["yarn", "deploy:start"]
