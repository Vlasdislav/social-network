<?php


class User {
    private $conn;
    private $table_name = "users";

    public $id;
    public $email;
    public $password;

    public function __construct($db) {
        $this->conn = $db;
    }

    function create() {
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    email    = :email,
                    password = :password";
        
        $stmt = $this->conn->prepare($query);

        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));

        $stmt->bindParam(":email", $this->email);

        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        $stmt->bindParam(":password", $password_hash);
        
        return $stmt->execute();
    }

    function emailExists() {
        $query = "SELECT id, password
                FROM " . $this->table_name . "
                WHERE email = ?
                LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        $this->email = htmlspecialchars(strip_tags($this->email));
        $stmt->bindParam(1, $this->email);
        $stmt->execute();
        $num = $stmt->rowCount();
    
        if ($num > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->id = $row["id"];
            $this->password = $row["password"];
            return true;
        }
        return false;
    }

    function checkPasswordStrength() {
        /* 
            Если пароль слабый возвращаем `false`,
            иначе строку -- статус пароля
        */
        if (strlen($this->password) < 8 ||
            isCommonPassword($this->conn, $this->password)) {
            return false;
        }
        
        $contains = [
            preg_match("/[A-Z]/", $this->password), // containsUpperCase
            preg_match("/[a-z]/", $this->password), // containsLowerCase
            preg_match("/[0-9]/", $this->password), // containsNumber
            preg_match("/[^a-zA-Z0-9]/", $this->password) // containsSpecialChar

        ];
    
        if ($contains[0] && $contains[1] && $contains[2] && $contains[3]) {
            return "perfect";
        } elseif ($contains[0] && $contains[1] && $contains[2] ||
                    $contains[0] && $contains[1] && $contains[3] ||
                    $contains[0] && $contains[2] && $contains[3] ||
                    $contains[1] && $contains[2] && $contains[3]) {
            return "good";
        } elseif ($contains[0] && $contains[1] ||
                    $contains[0] && $contains[2] ||
                    $contains[0] && $contains[3] ||
                    $contains[1] && $contains[2] ||
                    $contains[1] && $contains[3] ||
                    $contains[2] && $contains[3]) {
            return "almost_good";
        } else {
            return false;
        }
    }
}
