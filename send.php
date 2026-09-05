<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$botToken = ${{ secrets.BOT_TOKEN }};
$chatId   = ${{ secrets.CHAT_ID }};
$redirectUrl = "index.html";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Метод не разрешён');
}

$name     = trim($_POST['name'] ?? '');
$phone    = trim($_POST['phone'] ?? '');
$material = trim($_POST['material'] ?? '');
$color = trim($_POST['color'] ?? '');
$count = trim($_POST['count'] ?? '');

if (empty($name) || empty($phone)) {
    http_response_code(400);
    exit('Заполните обязательные поля');
}

$name     = htmlspecialchars($name);
$phone    = htmlspecialchars($phone);
$material = htmlspecialchars($material);
$color = htmlspecialchars($color);
$count  = htmlspecialchars($count);

$message  = "📥 <b>Новая заявка с сайта</b>\n\n";
$message .= "👤 <b>Имя:</b> {$name}\n";
$message .= "📞 <b>Телефон:</b> {$phone}\n";

if (!empty($material)) {
    $message .= "🧱 <b>Продукт:</b> {$material}\n";
}

if (!empty($color)) {
    $message .= "🧱 <b>Цвет:</b> {$color}\n";
}

if (!empty($count)) {
    $message .= "🧱 <b>Количество:</b> {$count}\n";
}

$message .= "\n🌍 IP: " . $_SERVER['REMOTE_ADDR'];
$message .= "\n🕒 " . date("d.m.Y H:i:s");

$url = "https://api.telegram.org/bot{$botToken}/sendMessage";

$data = [
    'chat_id' => $chatId,
    'text' => $message,
    'parse_mode' => 'HTML'
];

$options = [
    'http' => [
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data),
        'timeout' => 10 
    ]
];
 
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result) {
    header("Location: {$redirectUrl}?status=success#feedback");
} else {
    header("Location: {$redirectUrl}?status=error");
}

exit;

