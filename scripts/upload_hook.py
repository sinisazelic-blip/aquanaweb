import ftplib
import io

php_code = """<?php
// Secure Webhook Deployment for Aquana Web Portal
define('DEPLOY_TOKEN', 'aquana_secure_deploy_2026_blip_99');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['error' => 'Method Not Allowed']));
}

$token = $_POST['token'] ?? ($_SERVER['HTTP_X_DEPLOY_TOKEN'] ?? '');
if (!hash_equals(DEPLOY_TOKEN, $token)) {
    http_response_code(403);
    die(json_encode(['error' => 'Forbidden: Invalid Token']));
}

if (!isset($_FILES['package']) || $_FILES['package']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    die(json_encode(['error' => 'No package uploaded']));
}

$tmpFile = $_FILES['package']['tmp_name'];
$zip = new ZipArchive();
if ($zip->open($tmpFile) === TRUE) {
    $targetDir = __DIR__;
    $zip->extractTo($targetDir);
    $zip->close();
    header('Content-Type: application/json');
    echo json_encode(['status' => 'success', 'timestamp' => date('Y-m-d H:i:s')]);
} else {
    http_response_code(500);
    die(json_encode(['error' => 'Failed to extract zip archive']));
}
"""

ftp = ftplib.FTP('desavanja-aquana.com')
ftp.login('newhome@desavanja-aquana.com', 'Aquana01+')
bio = io.BytesIO(php_code.encode('utf-8'))
ftp.storbinary('STOR api-deploy-hook.php', bio)
ftp.quit()
print("SUCCESS: api-deploy-hook.php uploaded to server!")
