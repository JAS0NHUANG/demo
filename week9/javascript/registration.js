// Set the innerHTML and cover the page with it.
document.querySelector('.header_nav').addEventListener('click', event => {
  // Create new pageCover div
  const pageCover = document.createElement('div')
  pageCover.className = 'page-cover'

  // When LOG OUT clicked
  if (event.target.classList.contains('header_logout-btn')) {
    pageCover.innerHTML =
     `<form class="form" action="./handler/handle_logout.php">
      <div>Logout?</div>
      <input class="form_submit" type="submit" value="LOG OUT">
      </form>`
    document.querySelector('body').appendChild(pageCover)
  }

  // When LOG IN clicked
  if (event.target.classList.contains('header_login-btn')) {
   pageCover.innerHTML =
     `<form class="signup form" method="POST" action="./handler/handle_login.php">
    <label for="username">Username:</label>
    <input class="form_input username" type="text" name="username" placeholder="Username"></input>
    <label for="password1">Password:</label>
    <input class="form_input password" type="password" name="password" placeholder="Password"></input>
    <input class="form_submit" type="submit" value="LOG IN">
  </form>`
 
  document.querySelector('body').appendChild(pageCover)
  }
   
  // When SIGN UP clicked
  if (event.target.classList.contains('header_signup-btn')) {
  pageCover.innerHTML =
     `<form class="signup form" method="POST" action="./handler/handle_signup.php">
    <label for="username">Username:</label>
    <input class="form_input username" type="text" name="username" placeholder="Username"></input>
    <label for="nickname">Nickname:</label>
    <input class="form_input nickname" type="text" name="nickname" placeholder="Nickname"></input>
    <label for="password">Password:</label>
    <input class="form_input password" type="password" name="password" placeholder="Password"></input>
    <p class="signup_warning">
      This site is under construction and unsecured. 
      Do not sign up using real-life username or password.
    </p>
    <input class="form_submit" type="submit" value="SIGN UP">
  </form>`
 
  document.querySelector('body').appendChild(pageCover)
  }
})

// Listen to event 'click' on 'page-cover' and 'submit'
document.querySelector('body').addEventListener('click', event => {
  // Remove form when user click outside the form.
  if (event.target.classList.contains('page-cover')) {
    event.target.remove();
  }

  // Check if information entered.
  if (event.target.classList.contains('form_submit')) {
   if (document.querySelector('.username').value === '') {
      document.querySelector('.username').placeholder = 'Please enter username.'
      event.preventDefault();
    }
   if (document.querySelector('.password').value === '') {
      document.querySelector('.password').placeholder = 'Please enter password.'
      event.preventDefault();
    }
   if (document.querySelector('.nickname').value === '') {
      document.querySelector('.nickname').placeholder = 'Please enter nickname.'
      event.preventDefault();
    }
  }
})
