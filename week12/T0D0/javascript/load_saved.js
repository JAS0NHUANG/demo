/* eslint no-unused-vars: 'off', no-undef: 'off', camelcase: 'off' */
let list_id = null
$(document).ready(() => {
  const pageUrl = window.location.href
  const searchParams = new URLSearchParams(pageUrl)
  if (searchParams.get(`${t0d0_URL}?list_id`) !== null) {
    list_id = searchParams.get(`${t0d0_URL}?list_id`)
    $.get(
      `${t0d0_api_URL}get_T0D0_api.php?list_id=${list_id}`,
      data => {
        console.log(list_id)
        $('.todo').append(data.todos.list_content)
      })
  }
})
