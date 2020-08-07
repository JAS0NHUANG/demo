// Set the innerHTML and cover the page with it.
document.querySelector('.header_post-btn').addEventListener('click', event => {
  // Create new pageCover div
  let pageCover = document.createElement('div')
  pageCover.className = 'page-cover'

  pageCover.innerHTML =
    `<form class="form" method="POST" action="./handler/handle_add_post.php">
    <textarea class="form_textarea" name="content" placeholder="i love you!"></textarea><br>
    <p class="form_charCalc">200 characters left.</p>
    <input class="form_submit" type="submit" value="POST">
  </form>`
  document.querySelector('body').appendChild(pageCover)
})

// Listen to event 'click' on 'page-cover' and 'submit'
document.querySelector('body').addEventListener('click', event => {
  if (event.target.classList.contains('page-cover')) {
    event.target.remove();
  }
  if (event.target.classList.contains('form_submit')) {
   if (document.querySelector('.form_textarea').value === '') {
      document.querySelector('.form_textarea').placeholder = 'Please enter message.'
      event.preventDefault();
    }
  }
})

// Calculate the content length and show info to user. (not acurate number)
const maxContentLength = 200
document.querySelector('body').addEventListener('keydown', event => {
  if (event.target.className === 'form_textarea') {
    const enteredLength = charCalculator(event.target.value)
    let leftLength
    if (maxContentLength - enteredLength === 0 && event.keyCode !== 8) {
      event.preventDefault()
    }
    document.querySelector('.form_charCalc').innerHTML = `About ${maxContentLength - enteredLength} characters left`
  }
})
