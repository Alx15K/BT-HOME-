<?php

error_reporting(E_ALL);
ini_set('display_errors', 0);

$botToken = "8536281989:AAGifGVxDdg4-2vBxUNglagz67nf8as0CWo";
$chatId = "-5164623342";
$redirectUrl = "index.html";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Метод не разрешён');
}

$name = trim($_POST['name'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$material = trim($_POST['material'] ?? '');
$color = trim($_POST['color'] ?? '');
$count = trim($_POST['count'] ?? '');

if (empty($name) || empty($phone)) {
    http_response_code(400);
    exit('Заполните обязательные поля');
}

if (!preg_match('/^[0-9+\-\s\(\)]+$/', $phone)) {
    exit('Некорректный телефон');
}

$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$material = htmlspecialchars($material, ENT_QUOTES, 'UTF-8');
$color = htmlspecialchars($color, ENT_QUOTES, 'UTF-8');
$count = htmlspecialchars($count, ENT_QUOTES, 'UTF-8');

$message = "📥 <b>Новая заявка с сайта</b>\n\n";
$message .= "👤 <b>Имя:</b> {$name}\n";
$message .= "📞 <b>Телефон:</b> {$phone}\n";

if ($material) {
    $message .= "🧱 <b>Продукт:</b> {$material}\n";
}

if ($color) {
    $message .= "🎨 <b>Цвет:</b> {$color}\n";
}

if ($count) {
    $message .= "📦 <b>Количество:</b> {$count}\n";
}

$message .= "\n🌍 IP: " . $_SERVER['REMOTE_ADDR'];
$message .= "\n🕒 " . date('d.m.Y H:i:s');

$url = "https://api.telegram.org/bot{$botToken}/sendMessage";

$data = [
    'chat_id' => $chatId,
    'text' => $message,
    'parse_mode' => 'HTML'
];

$options = [
    'http' => [
        'header' => "Content-type: application/x-www-form-urlencoded\r\n",
        'method' => 'POST',
        'content' => http_build_query($data),
        'timeout' => 10
    ]
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

$response = json_decode($result, true);

if ($response && $response['ok']) {
    header("Location: {$redirectUrl}?status=success#feedback");
} else {
    header("Location: {$redirectUrl}?status=error");
}

exit;

