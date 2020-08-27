/* eslint no-unused-vars: 'off', no-undef: 'off', camelcase: 'off' */
$(document).ready(() => {
  const navBar = $('.todo__options')

  // add selected class when div clicked
  navBar.delegate('div', 'click', event => {
    $('.selected').removeClass('selected')
    $(event.target).addClass('selected')
  })

  // different behavior for different div
  navBar.delegate('.todo__all', 'click', event => {
    $('.todo__wrapper').removeClass('hide')
  })
  navBar.delegate('.todo__active', 'click', event => {
    $('.completed').addClass('hide')
    $('.todo__wrapper').not('.completed').removeClass('hide')
  })
  navBar.delegate('.todo__completed', 'click', event => {
    $('.completed').removeClass('hide')
    $('.todo__wrapper').not('.completed').addClass('hide')
  })
  navBar.delegate('.todo__clear', 'click', event => {
    $('.completed').remove()
  })

  navBar.delegate('.todo__save', 'click', event => {
    const todoArray = [...$('.todo__wrapper')]
    let todos = ''
    for (const i in todoArray) {
      todos += $('.todo__wrapper')[i].outerHTML
    }
    console.log(todos)
    $.ajax({
      method: 'POST',
      url: `${t0d0_api_URL}save_T0D0_api.php`,
      data: { list_id: list_id, list_content: todos }
    })
      .done(data => {
        const message = `Your will be redirected to your list link:\n ${t0d0_URL}?list_id=${data}`
        alert(message)
        window.location.href = `${t0d0_URL}?list_id=${data}`
      })
  })
})
