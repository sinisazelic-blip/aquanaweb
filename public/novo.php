<?php
// Set unlock cookie for 30 days
setcookie("aquana_preview", "1", [
    'expires' => time() + 30 * 86400,
    'path' => '/',
    'secure' => false,
    'httponly' => false,
    'samesite' => 'Lax'
]);
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Location: /");
exit;
