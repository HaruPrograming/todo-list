# Node.jsの公式イメージを使用
FROM node:latest

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package.json package-lock.json ./

# npm install を実行
RUN npm install

# アプリのソースコードをコピー
COPY . .

# アプリを起動
CMD ["npm", "run", "dev"]
