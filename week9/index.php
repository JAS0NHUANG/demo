<?php
  require_once('./handler/generate_post.php');
  require_once('./handler/conn.php');

  $sqlQuery = sprintf('SELECT * FROM JAS0NHUANG_posts ORDER BY created_at DESC;');

  $result = $conn->query($sqlQuery);
  if (!$result) {
    die($conn-error);
  }
?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta 
    name="viewport" 
    content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1"
  >
  <meta charset="UTF-8">
  <link rel="stylesheet" href="./style/index.css">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Aladin&display=swap" rel="stylesheet">
  <title>Lemon Wall</title>
</head>

<body>
  <!-- ------------------------------------ header ----------------------------------------->
  <header class="header">
    <h1 class="header_title">Lemon Wall</h1>
    <nav class="header_nav">
      <?php if (!$_COOKIE['username']) { ?>
        <button  class="header_login-btn">LOG IN</button>
        <button class="header_signup-btn">SIGN UP</button>
      <?php } ?>
      <?php if ($_COOKIE['username']) { ?>
        <button class="header_post-btn">POST</button>
        <button class="header_logout-btn">LOG OUT</button>
      <?php } ?>
    </nav>
    <?php 
      if (strval($_GET['errorCode']) === '1062') {
        echo '<div class="header_errorMsg">Username or Nickname already taken.</div>';
      } else if (strval($_GET['errorCode']) === '0') {
        echo '<div class="header_errorMsg">Invalid email or password</div>';
      }
      if ($_COOKIE['username']) {
        $greetingMsg = sprintf('<div class="header_greeting">Welcome! %s.</div>',
          $_COOKIE['username']
        );
        echo $greetingMsg;
      }
    ?>
  </header>
  <!-- ------------------------------------ main ----------------------------------------->
  <main class="main">
    <div class="main_posts">
      <?php
        while ($row = $result->fetch_assoc()) {
          $user_id = $row['user_id'];
          $post_content = $row['post_content'];
          $created_at = $row['created_at'];
          $postGenerated = generatePost($user_id, $post_content, $created_at);
          print_r($postGenerated);
        }
      ?>
      <div class="main_placeholder"></div>
      <div class="main_placeholder"></div>
      <div class="main_placeholder"></div>
      <div class="main_placeholder"></div>
    </div>
  </main>
  <!-- ------------------------------------ scripts ----------------------------------------->
  <script src="./javascript/index.js"></script>  
  <script src="./javascript/add_post.js"></script>
  <script src="./javascript/registration.js"></script>
</body>
</html>
