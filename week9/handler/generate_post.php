<?php
  // Generate single post
  function generatePost($user_id, $post_content, $created_at) {
    $postTemplate = sprintf(
      '<div class="main_post_container">
        <div class="main_post_nickname">%d</div>
        <div class="main_post_content">%s</div>
        <div class="main_post_created">%s</div>',
      $user_id,
      $post_content,
      $created_at
    );

    // If the user is logged in, show edit and delete option for their own posts.
    if ($user_id === $_COOKIE['user_id']) {
      $editAndDelete = sprintf(
        '<div class="main_post_delete-btn"></div>
        <div class="main_post_edit-btn"></div>
        </div>'
      );
    } else {
      $editAndDelete = sprintf('</div>');
    }
    return $postTemplate . $editAndDelete;
  }
?>
