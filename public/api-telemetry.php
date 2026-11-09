<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . "/telemetry.json";

$defaultTelemetry = [
    "waterTemp" => "26.0",
    "airTemp" => "27.5",
    "waterStatus" => "FINA takmi?arska norma",
    "airStatus" => "Klimatizovana dvorana",
    "lastUpdated" => "Danas u 07:00h",
    "updatedBy" => "Recepcija GOB"
];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);
    if ($data && is_array($data)) {
        $merged = array_merge($defaultTelemetry, $data);
        file_put_contents($dataFile, json_encode($merged, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
        echo json_encode(["status" => "success", "data" => $merged]);
        exit;
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid JSON payload"]);
        exit;
    }
} else {
    // GET request
    if (file_exists($dataFile)) {
        $content = file_get_contents($dataFile);
        echo $content;
    } else {
        echo json_encode($defaultTelemetry, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }
    exit;
}
