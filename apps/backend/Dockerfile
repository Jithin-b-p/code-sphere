FROM node:lts-alpine3.17
WORKDIR /app
COPY apps/backend/package*.json ./
COPY apps/backend/tsconfig.json ./
RUN npm install
COPY prisma ./prisma
RUN npx prisma generate --schema=./prisma/schema.prisma
COPY apps/backend/src ./src
CMD ["npm", "run", "dev"]
