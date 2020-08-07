<?php
  if (empty($_POST['content'])) {
    die('Please enter message.');
  }
  require_once('./conn.php');

  $user_id = $_COOKIE['user_id'];
  $post_content = $_POST['content'];

  $sqlQuery = sprintf(
    'INSERT INTO JAS0NHUANG_posts(user_id, post_content) VALUES(%d, "%s");',
    $user_id,
    $post_content
  );
  echo $sqlQuery;

  $result = $conn->query($sqlQuery);

  print_r($result);
  if (!$result) {
    die($conn->error);
  }

  header('Location: ../index.php');
?>
