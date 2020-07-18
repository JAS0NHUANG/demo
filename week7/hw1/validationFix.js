// 設定 form 與 requiredDiv 變數
const formElement = document.querySelector('form')
const requiredDiv = document.querySelectorAll('.required')

// 在 formElement 加上監聽器
formElement.addEventListener('submit', evt => {
  let submittedData = []
  let hasError = false

  for (let i in [...requiredDiv]) {
    const textInput = requiredDiv[i].querySelector('input[type=text]') 
    const emailInput = requiredDiv[i].querySelector('input[type=email]')
    const radioInput = [...requiredDiv[i].querySelectorAll('input[type=radio]')]

    const inputLabel = requiredDiv[i].querySelector('label')
    const warning = requiredDiv[i].querySelector('p')
    
    // 判斷不同輸入場景
    if (radioInput.length && radioInput.some(radio => radio.checked)) {
      let checkedRadioContent
      for(let i in radioInput) {
        if (radioInput[i].checked) {
          checkedRadioContent = radioInput[i].parentNode.querySelector('label').innerHTML
        }
      }
      warning.classList.add('hidden')
      submittedData.push(`${inputLabel.innerHTML}: ${checkedRadioContent} \n`)
    } else if (textInput && textInput.value !== '') {
      warning.classList.add('hidden')
      submittedData.push(`${inputLabel.innerHTML}: ${textInput.value}\n`)
    } else if (emailInput && emailInput.value !=='') {
      warning.classList.add('hidden')
      submittedData.push(`${inputLabel.innerHTML}: ${emailInput.value}\n`)
    } else {
      warning.classList.remove('hidden')
      hasError = true
    }
  }

  // 如果沒有 Error：
  if (!hasError) {
    const notRequired = document.querySelectorAll('.notRequired')
    for (let i in [...notRequired]) {
      console.log(notRequired[i])
      submittedData.push(
        `${notRequired[i].querySelector('label').innerHTML}: ${notRequired[i].querySelector('input').value}`
      )
    }
    alert(submittedData.join(''))
    return
  }

  evt.preventDefault()
})

