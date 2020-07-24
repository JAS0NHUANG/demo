const API_URL = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery'
const mainTag = document.querySelector('.lottery__main')
const formTag = document.querySelector('.lottery__form')
const lotteryInfo = document.querySelector('.lottery__info')

let first = 0
let second = 0
let third = 0
let none = 0
let error = 0

let total = 0
const request = new XMLHttpRequest()

request.onload = function () {
  let json
  try {
    json =JSON.parse(request.response)
  } catch (err) {
    error++
    alert('系統不穩定，請再試一次')
    console.log(err)
  }
  console.log(mainTag)
  switch(json.prize) {
    case 'FIRST':
      first++
      mainTag.classList = 'lottery__main lottery__firstImg'
      lotteryInfo.classList.add('lottery__prize')
      formTag.classList = 'lottery__form wide'
      lotteryInfo.innerHTML = "恭喜你中頭獎了！日本東京來回雙人遊！"
      break
    case 'SECOND':
      second++
      mainTag.classList = 'lottery__main lottery__secondImg'
      lotteryInfo.classList.add('lottery__prize')
      formTag.classList = 'lottery__form wide'
      lotteryInfo.innerHTML = "二獎！90 吋電視一台！"
      break
    case 'THIRD':
      third++
      mainTag.classList = 'lottery__main lottery__thirdImg'
      lotteryInfo.classList.add('lottery__prize')
      formTag.classList = 'lottery__form wide'
      lotteryInfo.innerHTML = "恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！"
      break
    case 'NONE':
      none++
      mainTag.classList = 'lottery__main lottery__mainImg'
      lotteryInfo.classList.add('lottery__prize')
      formTag.classList = 'lottery__form wide'
      lotteryInfo.innerHTML = "銘謝惠顧"
      break
    default:
      error++
  }
  console.log(first, second, third, none, error)
  total = first + second + third + none + error
  console.log(total)
}

document.querySelector('.lottery__submit').addEventListener('click', evt => {
  request.open('GET', API_URL, true)
  request.send()
  evt.preventDefault()
})
