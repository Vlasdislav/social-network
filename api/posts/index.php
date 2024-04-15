<?php

header("Access-Control-Allow-Origin: http://budru.com.ru/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../config/database.php';
require '../objects/Post.php';

$method = $_SERVER['REQUEST_METHOD'];

$database = new DataBase();
$db = $database->getConnection();

$post = new Post($db);

$id = $_GET['q'] === "" ? NULL : $_GET['q']; // TODO: поправить

switch ($method) {
    case 'GET':
        if (isset($id)) {
            $post->get($id);
        } else {
            $post->gets();
        }
    break;
    case 'POST':
        $data = file_get_contents('php://input');
        $data = json_decode($data, true);
        $post->add($data);
    break;
    case 'PATCH':
        if (isset($id)) {
            $data = file_get_contents('php://input');
            $data = json_decode($data, true);
            $post->update($id, $data);
        }
    break;
    case 'DELETE':
        if (isset($id)) {
            $post->delete($id);
        }
    break;
}
