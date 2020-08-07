<?php
  require_once('conn.php');

  $username = $_POST['username'];
  $password = $_POST['password'];

  $sqlQuery = sprintf(
    'SELECT * FROM JAS0NHUANG_users where username="%s" AND password="%s";',
    $username,
    $password
  );

  $result = $conn->query($sqlQuery);

//  print_r($result);
//  print_r($conn);

  if ($result->num_rows === 0){
    header('Location: ../index.php?errorCode=0');
    exit();
  }

  $row = $result->fetch_assoc();
  $expires = time() + 3600 * 24;
  setcookie('username', $row['username'], $expires, '/');
  setcookie('user_id', $row['user_id'], $expires, '/');

  header('Location: ../index.php');

?>

