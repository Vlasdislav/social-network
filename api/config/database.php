<?php

class DataBase {
    private $host = "h807240245.mysql";
    private $db_name = "h807240245_social_network";
    private $username = "h807240245_mysql";
    private $password = "MpSPkb:6";

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        } catch (PDOExeption $exeption) {
            echo "Ошибка соеденения с БД: " . $exeption->getMessage();
        }
        return $this->conn;
    }
}
