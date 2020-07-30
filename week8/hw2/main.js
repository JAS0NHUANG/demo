// global variables
const API_URL = 'https://api.twitch.tv/kraken'
const clientId = 'ucau5lz6swwaed1ecwemy0ewrcvjva'
const request = new XMLHttpRequest()

// selectors
const mainGames = document.querySelector('.main__games')

// other variables
let topGameOffset = 0
let streamNum
let streamOffset = 0
let lastSelected
let selectedGameTitle

// escape html
function escapeHtml (unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

sendRequest(`${API_URL}/games/top?limit=6&offset=${topGameOffset}`)

// send request function
function sendRequest (requestUrl, selectedGameTitle) {
  request.open('GET', requestUrl, true)
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.setRequestHeader('Client-ID', clientId)
  request.onerror = () => console.log('error')
  if (requestUrl === `${API_URL}/games/top?limit=6&offset=${topGameOffset}`) {
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        getTopGames(request.response)
      }
    }
  }
  if (selectedGameTitle) {
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        showStreams(request.response)
      }
    }
  }
  request.send()
}

// top game section
function getTopGames (responseData) {
  let json
  try {
    json = JSON.parse(responseData)
  } catch (err) {
    console.log(err)
    return
  }
  if (document.querySelector('.placeholder__selected')) {
    document.querySelector('.placeholder__selected').classList.remove('placeholder__selected')
    lastSelected = ''
    selectedGameTitle = ''
  }
  for (let i = 0; i < 5; i++) {
    const gameNum = mainGames.querySelector(`.main__top${Number(i) + 1}`)
    gameNum.querySelector(
      '.placeholder'
    ).style.background = `url(${json.top[i].game.box.large}) center/cover no-repeat`
    gameNum.querySelector('.title').innerHTML = json.top[i].game.name
  }
  topGameOffset += 5
}

function clearPreview () {
  for (let i = 0; i < 5; i++) {
    const gameNum = mainGames.querySelector(`.main__top${Number(i) + 1}`)
    gameNum.querySelector(
      '.placeholder'
    ).style.background = ''
    gameNum.querySelector('.title').innerHTML = ''
  }
}

mainGames.addEventListener('click', evt => {
  // when left/right clicked
  if (evt.target.classList.contains('main__games__carousel')) {
    if (evt.target.classList.contains('left')) {
      if (topGameOffset <= 5) return
      clearPreview()
      topGameOffset -= 10
      sendRequest(`${API_URL}/games/top?limit=6&offset=${topGameOffset}`)
    } else {
      clearPreview()
      sendRequest(`${API_URL}/games/top?limit=6&offset=${topGameOffset}`)
    }
  }

  if (evt.target.classList.contains('placeholder')) {
    if (!lastSelected || lastSelected !== evt.target) {
      document.querySelector('.main__streams').innerHTML = ''
      streamOffset = 0
      evt.target.classList.add('placeholder__selected')
      if (lastSelected) {
        lastSelected.classList.remove('placeholder__selected')
      }
      lastSelected = evt.target
      console.log(lastSelected)
      selectedGameTitle = evt.target.nextElementSibling.innerHTML
    }
    createDivs()
    sendRequest(
      `${API_URL}/streams/?game=${selectedGameTitle.replace(/&amp;/g, '%26')}&limit=20&offset=${streamOffset}`
      , selectedGameTitle)
  }
})

// Search for game
document.querySelector('.search__btn').addEventListener('click', evt => {
  evt.preventDefault()
  const searchedGame = escapeHtml(evt.target.parentNode.querySelector('.search__input').value)
  document.querySelector('.main__streams').innerHTML = ''
  streamOffset = 0
  if (lastSelected) {
    lastSelected.classList.remove('placeholder__selected')
  }
  selectedGameTitle = searchedGame
  evt.target.parentNode.querySelector('.search__input').value = ''
  createDivs()
  sendRequest(
      `${API_URL}/streams/?game=${selectedGameTitle.replace(/&amp;/g, '%26')}&limit=20&offset=${streamOffset}`
      , selectedGameTitle)
})

// create new empty stream divs
function createDivs () {
  if (streamOffset === -1) return
  const mainStreamsDiv = document.querySelector('.main__streams')
  if (!mainStreamsDiv.querySelector('h1')) {
    const gameTitleH1 = document.createElement('h1')
    mainStreamsDiv.appendChild(gameTitleH1)
  }
  const afterStreams =
    `<div class="empty"></div>
    <div class="empty"></div>
    <div class="linebreaker"></div>
    <button class="load__more">Load More</button>`

  if (document.querySelectorAll('.empty').length > 0) {
    const removeAfterStreams = document.querySelector('.main__streams').innerHTML.replace(afterStreams, '')
    document.querySelector('.main__streams').innerHTML = removeAfterStreams
  }
  for (let i = 0; i < 20; i++) {
    streamNum = `stream__${streamOffset + 1}`
    const streamDiv = document.createElement('div')
    streamDiv.classList = 'stream__container'
    streamDiv.innerHTML =
      `<a href="" target="_blank">
        <div class="stream__preview">
        </div>
        <div class="stream__info">
          <div class="stream__avatar">
          </div>
          <div class="stream__title">
          </div>
        </div>
      </a>`
    streamDiv.classList.add(streamNum)
    document.querySelector('.main__streams').appendChild(streamDiv)
    streamOffset += 1
  }
  document.querySelector('.main__streams').innerHTML += afterStreams
}

// streams
function showStreams (responseData) {
  let streamData
  try {
    streamData = JSON.parse(responseData)
  } catch (err) {
    console.log(err)
    return
  }
  document.querySelector('.main__streams').querySelector('h1').innerHTML = selectedGameTitle
  if ((streamData.streams.length % 20) !== 0 || streamData.streams.length === 0) {
    const streamOffsetHolder = streamOffset
    for (let i = streamOffset - 20 + streamData.streams.length + 1; i <= streamOffsetHolder; i++) {
      const uselessDiv = document.querySelector(`.stream__${i}`)
      const streamsDiv = document.querySelector('.main__streams')
      streamsDiv.removeChild(uselessDiv)
      streamOffset -= 1
    }
  }
  let newOffsetNum
  for (const i in streamData.streams) {
    const streamDataI = streamData.streams[i]
    newOffsetNum = streamOffset - streamData.streams.length + Number(i)
    const container = document.querySelector(`.stream__${newOffsetNum + 1}`)
    container.querySelector('a').href = streamDataI.channel.url
    container.querySelector('.stream__preview').style.background =
      `url(${streamDataI.preview.medium}) center/cover no-repeat`
    container.querySelector('.stream__avatar').style.background =
      `url(${streamDataI.channel.logo}) center/cover no-repeat`
    container.querySelector('.stream__title').innerHTML =
      `<p>${streamDataI.channel.description.length ? streamDataI.channel.description : '<br>'}</p>
      <p>${streamData.streams[i].channel.display_name}</p>`
  }
  if (streamOffset % 20 !== 0 || newOffsetNum === streamOffset || streamData.streams.length === 0) {
    streamOffset = -1
    document.querySelector('.load__more').classList.add('hide')
  }
}

document.querySelector('.main__streams').addEventListener('click', evt => {
  if (evt.target.innerHTML === 'Load More') {
    createDivs()
    sendRequest(
      `${API_URL}/streams/?game=${selectedGameTitle.replace(/&amp;/g, '%26')}&limit=20&offset=${streamOffset}`
      , selectedGameTitle)
  }
})

document.querySelector('.back-to-top').addEventListener('click', evt => {
  window.scrollTo(0, 0)
})
