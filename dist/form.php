<?php
/**
 * Kurucu Bilişim — form işleyici (iletişim, başvuru, iş ortaklığı)
 * Gereksinim: PHP 7.4+, sunucuda mail() aktif olmalı. SMTP gerekiyorsa MAIL_* ayarlarını hosting paneline göre düzenleyin.
 */
declare(strict_types=1);

const MAIL_TO   = 'info@kurucubilisim.com';
const MAIL_FROM = 'form@kurucubilisim.com'; // Alan adınızda var olan bir adres olmalı (SPF uyumu için)
const RATE_DIR  = __DIR__ . '/.form-rate';  // .htaccess ile web erişimine kapalıdır
const RATE_MAX  = 5;                        // IP başına 10 dakikada en fazla gönderim

$forms = [
    'iletisim'   => ['subject' => 'Web Sitesi İletişim Formu',       'thanks' => '/iletisim-tesekkurler/'],
    'basvuru'    => ['subject' => 'Web Sitesi Hizmet Başvurusu',     'thanks' => '/talep-formu-tesekkurler/'],
    'is-ortagi'  => ['subject' => 'Web Sitesi İş Ortaklığı Başvurusu', 'thanks' => '/is-ortakligi-talep-tesekkurler/'],
];

$wantsJson = stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;

function respond(bool $ok, string $error = '', string $redirect = '/'): void {
    global $wantsJson;
    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        if (!$ok) http_response_code(422);
        echo json_encode(['ok' => $ok, 'error' => $error], JSON_UNESCAPED_UNICODE);
    } else {
        if ($ok) { header('Location: ' . $redirect, true, 303); }
        else { header('Content-Type: text/html; charset=utf-8'); http_response_code(422);
            echo '<!doctype html><meta charset="utf-8"><p>' . htmlspecialchars($error) . '</p><p><a href="javascript:history.back()">Geri dön</a></p>'; }
    }
    exit;
}

function field(string $k, int $max = 200): string {
    $v = $_POST[$k] ?? '';
    if (!is_string($v)) return '';
    $v = trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '');
    return mb_substr($v, 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') respond(false, 'Geçersiz istek');

$type = field('form', 20);
if (!isset($forms[$type])) respond(false, 'Geçersiz form');

// Bot koruması: gizli alan dolu ise veya form 3 saniyeden kısa sürede gönderildiyse sessizce kabul et
if (field('website_url') !== '' || (time() - (int) field('ts', 12)) < 3) respond(true, '', $forms[$type]['thanks']);

// Gönderim sıklığı sınırı
$ip = $_SERVER['REMOTE_ADDR'] ?? '0';
if (!is_dir(RATE_DIR)) @mkdir(RATE_DIR, 0700, true);
$rf = RATE_DIR . '/' . hash('sha256', $ip) . '.json';
$hits = is_file($rf) ? (json_decode((string) file_get_contents($rf), true) ?: []) : [];
$hits = array_values(array_filter($hits, fn($t) => $t > time() - 600));
if (count($hits) >= RATE_MAX) respond(false, 'Çok fazla deneme yaptınız, lütfen birkaç dakika sonra tekrar deneyin');
$hits[] = time();
@file_put_contents($rf, json_encode($hits), LOCK_EX);

$name    = field('ad', 80);
$surname = field('soyad', 80);
$email   = field('eposta', 120);
$phone   = field('telefon', 30);
$message = field('mesaj', 4000);

if ($name === '') respond(false, 'Lütfen adınızı yazın');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) respond(false, 'Lütfen geçerli bir e-posta adresi yazın');
if ($phone !== '' && !preg_match('/^[0-9 +()\-]{7,30}$/', $phone)) respond(false, 'Telefon numarası geçersiz');
if (field('kvkk') !== 'evet') respond(false, 'Lütfen KVKK aydınlatma metnini onaylayın');
if ($type === 'iletisim' && $message === '') respond(false, 'Lütfen mesajınızı yazın');

$services = [];
foreach ((array) ($_POST['hizmet'] ?? []) as $s) {
    if (is_string($s)) $services[] = mb_substr(trim($s), 0, 60);
}

$rows = [
    'Form'           => $forms[$type]['subject'],
    'Ad Soyad'       => trim("$name $surname"),
    'E-posta'        => $email,
    'Telefon'        => $phone,
    'Firma'          => field('firma', 120),
    'İl'             => field('il', 40),
    'Web sitesi'     => field('web', 200),
    'Konu'           => field('konu', 120),
    'Hizmetler'      => implode(', ', array_slice($services, 0, 20)),
    'Ortaklık türü'  => field('ortaklik', 60),
    'Kullandığı program' => field('program', 120),
    'Mesaj'          => $message,
    'Sayfa'          => field('sayfa', 200),
    'Tarih'          => date('d.m.Y H:i'),
    'IP'             => $ip,
];

$body = '';
foreach ($rows as $k => $v) if ($v !== '') $body .= "$k: $v\n";

$subject = '=?UTF-8?B?' . base64_encode($forms[$type]['subject'] . ' - ' . trim("$name $surname")) . '?=';
$headers = implode("\r\n", [
    'From: Kurucu Bilisim Web <' . MAIL_FROM . '>',
    'Reply-To: ' . str_replace(["\r", "\n"], '', $email),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

$sent = @mail(MAIL_TO, $subject, $body, $headers, '-f' . MAIL_FROM);
if (!$sent) respond(false, 'Mesajınız şu anda gönderilemedi');

respond(true, '', $forms[$type]['thanks']);
