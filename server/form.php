<?php
/**
 * Kurucu Bilişim — form işleyici (iletişim, başvuru, iş ortaklığı, hizmet başvuruları)
 * Gereksinim: PHP 7.4+, sunucuda mail() aktif olmalı.
 * Hostinger, sitenin gönderdiği e-postalarda gönderen adresinin (MAIL_FROM) alan adında GERÇEKTEN VAR OLAN
 * bir e-posta hesabı olmasını ister; aksi halde mail() "gönderildi" der ama e-posta teslim edilmez.
 */
declare(strict_types=1);

const MAIL_TO   = 'info@kurucubilisim.com';
const MAIL_FROM = 'info@kurucubilisim.com'; // Var olan bir hesap olmalı (Hostinger + SPF)
const RATE_DIR  = __DIR__ . '/.form-rate';  // .htaccess ile web erişimine kapalıdır
const RATE_MAX  = 5;                        // IP başına 10 dakikada en fazla gönderim

$forms = [
    'iletisim'       => ['subject' => 'Web Sitesi İletişim Formu',         'thanks' => '/iletisim-tesekkurler/'],
    'basvuru'        => ['subject' => 'Web Sitesi Hizmet Başvurusu',       'thanks' => '/talep-formu-tesekkurler/'],
    'is-ortagi'      => ['subject' => 'Web Sitesi İş Ortaklığı Başvurusu', 'thanks' => '/is-ortakligi-talep-tesekkurler/'],
    // Hizmet sayfalarındaki başvuru formları (e-imza, mali mühür, e-fatura): yanıt Google Form'a da kaydedilir,
    // buradan ise ekibe e-posta bildirimi gider. Alanlar "alanlar" içinde [etiket, değer] listesi olarak gelir.
    'hizmet-basvuru' => ['subject' => 'Online Hizmet Başvurusu',           'thanks' => '/talep-formu-tesekkurler/'],
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

function clean(string $v, int $max): string {
    $v = trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '');
    return mb_substr($v, 0, $max);
}

function field(string $k, int $max = 200): string {
    $v = $_POST[$k] ?? '';
    return is_string($v) ? clean($v, $max) : '';
}

// Biçimi doğru ve alan adı e-posta alabilen (MX ya da A kaydı olan) adresleri kabul eder.
// ali@gmial.com gibi yazım hatalı alan adları burada elenir.
function validEmail(string $email): bool {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) return false;
    $domain = substr(strrchr($email, '@') ?: '', 1);
    if ($domain === '' || strpos($domain, '.') === false) return false;
    if (!function_exists('checkdnsrr')) return true;
    $ascii = function_exists('idn_to_ascii') ? (idn_to_ascii($domain) ?: $domain) : $domain;
    return checkdnsrr($ascii, 'MX') || checkdnsrr($ascii, 'A');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') respond(false, 'Geçersiz istek');

$type = field('form', 20);
if (!isset($forms[$type])) respond(false, 'Geçersiz form');

// Bot koruması: gizli alan dolu ise veya form 3 saniyeden kısa sürede gönderildiyse sessizce kabul et
if (field('website_url') !== '' || (time() - (int) field('ts', 12)) < 3) respond(true, '', $forms[$type]['thanks']);

$name    = field('ad', 80);
$surname = field('soyad', 80);
$email   = field('eposta', 120);
$phone   = field('telefon', 30);
$message = field('mesaj', 4000);

// Doğrulama (gönderim sayacından önce: hatalı denemeler kullanıcının hakkını yemesin)
if ($type !== 'hizmet-basvuru' && $name === '') respond(false, 'Lütfen adınızı yazın');
if (!validEmail($email)) respond(false, 'E-posta adresiniz geçersiz görünüyor. Lütfen kontrol edip yeniden yazın');
if ($phone !== '' && !preg_match('/^[0-9 +()\-]{7,30}$/', $phone)) respond(false, 'Telefon numarası geçersiz');
if (field('kvkk') !== 'evet') respond(false, 'Lütfen KVKK aydınlatma metnini onaylayın');
if ($type === 'iletisim' && $message === '') respond(false, 'Lütfen mesajınızı yazın');

// Hizmet başvurusu alanları: [[etiket, değer], ...] (en fazla 80 alan)
$extra = [];
if ($type === 'hizmet-basvuru') {
    $raw = json_decode((string) ($_POST['alanlar'] ?? ''), true);
    if (!is_array($raw) || !$raw) respond(false, 'Başvuru bilgileri okunamadı');
    foreach (array_slice($raw, 0, 80) as $row) {
        if (!is_array($row) || count($row) !== 2 || !is_string($row[0]) || !is_string($row[1])) continue;
        $label = clean($row[0], 120);
        $value = clean(str_replace(["\r\n", "\r"], "\n", $row[1]), 1500);
        if ($label !== '' && $value !== '') $extra[$label] = $value;
    }
    if (!$extra) respond(false, 'Başvuru bilgileri okunamadı');
}

// Gönderim sıklığı sınırı
$ip = $_SERVER['REMOTE_ADDR'] ?? '0';
if (!is_dir(RATE_DIR)) @mkdir(RATE_DIR, 0700, true);
$rf = RATE_DIR . '/' . hash('sha256', $ip) . '.json';
$hits = is_file($rf) ? (json_decode((string) file_get_contents($rf), true) ?: []) : [];
$hits = array_values(array_filter($hits, fn($t) => $t > time() - 600));
if (count($hits) >= RATE_MAX) respond(false, 'Çok fazla deneme yaptınız, lütfen birkaç dakika sonra tekrar deneyin');
$hits[] = time();
@file_put_contents($rf, json_encode($hits), LOCK_EX);

$services = [];
foreach ((array) ($_POST['hizmet'] ?? []) as $s) {
    if (is_string($s)) $services[] = mb_substr(trim($s), 0, 60);
}

$subjectLine = $forms[$type]['subject'];
if ($type === 'hizmet-basvuru') $subjectLine .= ' (' . field('hizmet_adi', 60) . ')';

$rows = [
    'Form'           => $subjectLine,
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
];

$body = '';
foreach ($rows as $k => $v) if ($v !== '') $body .= "$k: $v\n";
if ($extra) {
    $body .= "\n--- Başvuru bilgileri ---\n";
    foreach ($extra as $k => $v) $body .= "$k: " . str_replace("\n", "\n  ", $v) . "\n";
    $body .= "\n(Bu başvuru Google Form yanıt tablosuna da kaydedilmiştir.)\n";
}
$body .= "\nSayfa: " . field('sayfa', 200) . "\nTarih: " . date('d.m.Y H:i') . "\nIP: $ip\n";

$who = trim("$name $surname") ?: $email;
$subject = '=?UTF-8?B?' . base64_encode($subjectLine . ' - ' . $who) . '?=';
$headers = implode("\r\n", [
    'From: =?UTF-8?B?' . base64_encode('Kurucu Bilişim Web') . '?= <' . MAIL_FROM . '>',
    'Reply-To: ' . str_replace(["\r", "\n"], '', $email),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

// SMTP ile gönderim (Hostinger e-posta sunucusu, DKIM imzalı → spam'e düşmez).
// Ayar dosyası web klasörünün DIŞINDA durur: public_html'in bir üstündeki form-smtp.php
//   <?php return ['host' => 'smtp.hostinger.com', 'port' => 465, 'user' => 'info@kurucubilisim.com', 'pass' => '...'];
// Dosya yoksa veya SMTP başarısız olursa eski mail() yöntemine düşülür (başvuru kaybolmasın).
function smtpConfig(): ?array {
    foreach ([dirname(__DIR__) . '/form-smtp.php', __DIR__ . '/.form-smtp.php'] as $f) {
        if (is_file($f)) { $c = include $f; if (is_array($c) && !empty($c['pass']) && $c['pass'] !== 'SIFREYI_BURAYA_YAZIN') return $c; }
    }
    return null;
}

function smtpSend(array $c, string $to, string $subject, string $body, string $replyTo): bool {
    $host = $c['host'] ?? 'smtp.hostinger.com';
    $port = (int) ($c['port'] ?? 465);
    $user = (string) $c['user'];
    $fp = @stream_socket_client(($port === 465 ? 'ssl://' : 'tcp://') . "$host:$port", $errno, $errstr, 15);
    if (!$fp) return false;
    stream_set_timeout($fp, 15);
    $read = function () use ($fp): string {
        $out = '';
        while (($line = fgets($fp, 1024)) !== false) { $out .= $line; if (isset($line[3]) && $line[3] === ' ') break; }
        return $out;
    };
    $cmd = function (string $line, array $ok) use ($fp, $read): bool {
        if ($line !== '') fwrite($fp, $line . "\r\n");
        return in_array((int) substr($read(), 0, 3), $ok, true);
    };
    $domain = substr(strrchr($user, '@') ?: '@localhost', 1);
    $msg = implode("\r\n", [
        'Date: ' . date('r'),
        'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . $domain . '>',
        'From: =?UTF-8?B?' . base64_encode('Kurucu Bilişim Web') . '?= <' . $user . '>',
        'To: <' . $to . '>',
        'Reply-To: ' . str_replace(["\r", "\n"], '', $replyTo),
        'Subject: ' . $subject,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        '',
        rtrim(chunk_split(base64_encode($body), 76, "\r\n")),
    ]);
    $ok = $cmd('', [220])
        && $cmd('EHLO ' . $domain, [250])
        && ($port === 465 || ($cmd('STARTTLS', [220]) && stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT) && $cmd('EHLO ' . $domain, [250])))
        && $cmd('AUTH LOGIN', [334])
        && $cmd(base64_encode($user), [334])
        && $cmd(base64_encode((string) $c['pass']), [235])
        && $cmd('MAIL FROM:<' . $user . '>', [250])
        && $cmd('RCPT TO:<' . $to . '>', [250, 251])
        && $cmd('DATA', [354])
        && $cmd($msg . "\r\n.", [250]);
    @fwrite($fp, "QUIT\r\n");
    fclose($fp);
    return $ok;
}

$smtp = smtpConfig();
$sent = $smtp && smtpSend($smtp, MAIL_TO, $subject, $body, $email);
if (!$sent) $sent = @mail(MAIL_TO, $subject, $body, $headers, '-f' . MAIL_FROM);
if (!$sent) respond(false, 'Mesajınız şu anda gönderilemedi');

respond(true, '', $forms[$type]['thanks']);
