<?php

header("Access-Control-Allow-Origin: http://budru.com.ru/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/database.php";
include_once "../objects/User.php";

$database = new DataBase();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

$user->email = $data->email;
$email_exists = $user->emailExists();
 
require "../libs/vendor/autoload.php";
include_once "../config/core.php";
use \Firebase\JWT\JWT;

if ($email_exists && password_verify($data->password, $user->password)) {
    $token = [
       "iss" => $iss, // адрес или имя удостоверяющего центра
       "aud" => $aud, // имя клиента для которого токен выпущен
       "iat" => $iat, // время, когда был выпущен JWT
       "nbf" => $nbf, // время, начиная с которого может быть использован (не раньше, чем)
       "data" => [
           "id" => $user->id,
           "email" => $user->email
       ]
    ];
    http_response_code(200);
 
    // Создание jwt
    $jwt = JWT::encode($token, $key, 'HS256');
    $res = [
        "status" => true,
        "jwt" => $jwt,
        "message" => "Успешный вход в систему"
    ];
    echo json_encode($res);
} else {
    http_response_code(401);
    $res = [
        "status" => false,
        "message" => "Ошибка входа"
    ];
    echo json_encode($res);
}
