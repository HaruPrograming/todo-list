<?php

// config/cors.php

// return [
//     'paths' => ['api/*', 'sanctum/csrf-cookie', 'csrf-token'],  // API エンドポイントへのリクエストのみ許可
//     'allowed_methods' => ['*'],  // 任意の HTTP メソッドを許可
//     'allowed_origins' => ['http://localhost:5174'],  // React アプリケーションの URL（例: http://localhost:3000）
//     'allowed_headers' => ['*'],  // 任意の HTTP ヘッダーを許可
//     'exposed_headers' => [],
//     'max_age' => 0,
//     'supports_credentials' => true,
// ];

return [
  'paths' => ['api/*', 'sanctum/csrf-cookie'],
  'allowed_methods' => ['*'],
  'allowed_origins' => ['http://localhost:5174', 'http://<あなたのIP>:5174'],
  'allowed_headers' => ['*'],
  'supports_credentials' => true,
];
