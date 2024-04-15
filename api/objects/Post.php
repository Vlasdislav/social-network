<?php

class Post {
    private $conn;
    private $table_name = "posts";

    public $id;
    public $text;
    public $img;
    public $date_created;
    public $likes_number;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                    SET
                        `text`         = :text,
                        `img`          = :img,
                        `date_created` = :date_created,
                        `likes_number` = :likes_number";
        
        $stmt = $this->conn->prepare($query);

        $this->text = htmlspecialchars(strip_tags($this->text));
        $this->img = htmlspecialchars(strip_tags($this->img));
        $this->date_created = htmlspecialchars(strip_tags($this->date_created));
        $this->likes_number = htmlspecialchars(strip_tags($this->likes_number));

        $stmt->bindParam(":text", $this->text);
        $stmt->bindParam(":img", $this->img);
        $stmt->bindParam(":date_created", $this->date_created);
        $stmt->bindParam(":likes_number", $this->likes_number);
        
        return $stmt->execute();
    }
    
    public function gets() {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $postList = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($postList);
    }

    public function get($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE `id`=:id";
        $stmt = $this->conn->prepare($query);
        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $post = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($post) {
            http_response_code(200);
            echo json_encode($post);
        } else {
            http_response_code(404);
            $res = [
                "status" => false,
                "message" => "Пост не найден"
            ];
            echo json_encode($res);
        }
    }

    public function add($data) {
        $text = $data['text'] ?? NULL;
        $img = $data['img'] ?? NULL;
        $query = "INSERT INTO " . $this->table_name . " (`id`, `text`, `img`, `date_created`, `likes_number`)
                  VALUES (NULL, :text, :img, NULL, 0)";
        $stmt = $this->conn->prepare($query);
        $this->text = htmlspecialchars(strip_tags($this->text));
        $this->img = htmlspecialchars(strip_tags($this->img));
        $stmt->bindParam(':text', $text);
        $stmt->bindParam(':img', $img);
        $stmt->execute();
        http_response_code(201);
        $res = [
            "status" => true,
            "post_id" => $this->conn->lastInsertId()
        ];
        echo json_encode($res);
    }
    
    public function update($id, $data) {
        $text = $data['text'];
        $img = $data['img'];
        $query = "UPDATE " . $this->table_name . "
                    SET 
                        `text`=:text, `img`=:img
                    WHERE
                        `posts`.`id`=:id";
        $stmt = $this->conn->prepare($query);
        $this->text = htmlspecialchars(strip_tags($this->text));
        $this->img = htmlspecialchars(strip_tags($this->img));
        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':text', $text);
        $stmt->bindParam(':img', $img);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        if ($stmt->rowCount() === 0) { // TODO: при НЕ изменении не валидная ошибка
            http_response_code(404);
            $res = [
                "status" => false,
                "message" => "Пост на найден"
            ];
        } else {
            http_response_code(200);
            $res = [
                "status" => true,
                "message" => "Пост обновлен"
            ];
        }
        echo json_encode($res);
    }
    
    public function delete($id) {
        $query = "DELETE FROM " . $this->table_name . " WHERE `id`=:id";
        $stmt = $this->conn->prepare($query);
        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        http_response_code(200);
        $res = [
            "status" => true,
            "message" => "Пост удален"
        ];
        echo json_encode($res);
    }
}
