<?php

defined('BASEPATH') or exit('No direct script access allowed');

/*
Module Name: Kurucu Tema
Description: CRM'e kurucubilisim.com ile aynı görünümü uygular (renkler, yazı tipi, butonlar, kartlar). CRM dosyalarını değiştirmez; modül devre dışı bırakılınca eski görünüme döner.
Version: 1.0.0
Requires at least: 3.0.*
Author: Kurucu Bilişim
*/

define('KURUCU_TEMA_VERSION', '1.0.0');

// Yönetim paneli, giriş/şifre sıfırlama sayfaları ve müşteri portalı
hooks()->add_action('app_admin_head', 'kurucu_tema_head');
hooks()->add_action('app_admin_authentication_head', 'kurucu_tema_head');
hooks()->add_action('app_customers_head', 'kurucu_tema_head');

function kurucu_tema_head()
{
    echo '<link rel="stylesheet" type="text/css" id="kurucu-tema-css" href="'
        . module_dir_url('kurucu_tema', 'assets/kurucu.css') . '?v=' . KURUCU_TEMA_VERSION . '">' . PHP_EOL;
}
