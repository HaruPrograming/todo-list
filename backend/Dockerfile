# PHPの公式イメージを基にする
FROM php:8.2-fpm

# PHP拡張のインストール
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libsqlite3-dev \
    zip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql pdo_sqlite

# Composerのインストール
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# 作業ディレクトリの作成
WORKDIR /var/www

# プロジェクトファイルをコンテナ内にコピー
COPY . .

# Composerで依存関係をインストール
RUN composer install --no-dev --optimize-autoloader

# .envファイルをコピー（オプション）
COPY .env .env

# ポート設定（デフォルトのポート: 8000）
EXPOSE 8000

# サーバー起動コマンド
CMD ["php-fpm"]

