// Render the main page.
// Random color for each post and adjust font size according to content length.
const postContainers = [...document.querySelectorAll('.main_post_container')]
const backgroundColor = ['blue', 'yellow', 'grass', 'pink', 'orange']

// Calculate the content length:
// Latin letters * 1, non Latin characters * 3
function charCalculator (contentStr) {
  const nonLatinChar = contentStr.match(/[^ -˚]/g)
  let contentLength = contentStr.length
  if (nonLatinChar !== null) {
    contentLength += nonLatinChar.length * 2
  }
  return contentLength
}

// Give each post their class for color and font size.
for (const i in postContainers) {
  const postContent = postContainers[i].querySelector('.main_post_content')
  const randomColor = backgroundColor[Math.floor(Math.random() * 5)]
  postContainers[i].classList.add(`background_${randomColor}`)
  const postContentLength = charCalculator(postContent.innerHTML)
  if (postContentLength <= 11) {
    postContent.classList.add('font_size_xl')
  } else if ( postContentLength > 11 && postContentLength <= 40) {
    postContent.classList.add('font_size_l')
  } else if ( postContentLength > 40 && postContentLength <= 140) {
    postContent.classList.add('font_size_m')
  } else {
    postContent.classList.add('font_size_s')
  }
}



