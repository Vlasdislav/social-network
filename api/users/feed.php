<?php

header("Access-Control-Allow-Origin: http://budru.com.ru/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require "../libs/vendor/autoload.php";
include_once "../config/core.php";
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key; 

// Получаем значение JWT
$data = json_decode(file_get_contents("php://input"));
$jwt = isset($data->jwt) ? $data->jwt : "";

if ($jwt) {
    try {
        $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
        http_response_code(200);
        $res = [
            "status" => true,
            "data" => $decoded->data,
            "message" => "Доступ разрешен"
        ];
        echo json_encode($res);
    } catch (Exception $e) {
        http_response_code(401);
        $res = [
            "status" => false,
            "error" => $e->getMessage(),
            "message" => "Доступ запрещен"
        ];
        echo json_encode($res);
    }
} else {
    throw Exception("unauthorize");
    http_response_code(401);
    $res = [
        "status" => false,
        "error" => "unauthorize",
        "message" => "Доступ запрещен"
    ];
    echo json_encode($res);
}
