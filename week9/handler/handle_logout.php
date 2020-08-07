<?php
  if (isset($_COOKIE['username'])) {
    setcookie('username', '', time() - 100, '/');
    setcookie('user_id', '', time() - 100, '/');
  }
  header('Location: ../index.php');
?>
