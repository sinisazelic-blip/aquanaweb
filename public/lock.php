<?php
// Delete unlock cookie
setcookie("aquana_preview", "", [
    'expires' => time() - 3600,
    'path' => '/',
    'secure' => false,
    'httponly' => false,
    'samesite' => 'Lax'
]);
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Location: /");
exit;
