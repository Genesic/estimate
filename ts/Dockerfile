FROM node:22-alpine

WORKDIR /app

# 复制 package.json 和 package-lock.json 文件
COPY package*.json ./

RUN npm install --only=prod

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
