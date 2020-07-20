// 設定 form 與 requiredDiv 變數
const formElement = document.querySelector('form')
const requiredDiv = document.querySelectorAll('.required')

// 在 formElement 加上監聽器
formElement.addEventListener('submit', evt => {
  let submittedData = []
  let hasError = false

  for (let i in [...requiredDiv]) {
    // 不同輸入欄位傳給對應的變數
    const textInput = requiredDiv[i].querySelector('input[type=text]') 
    const emailInput = requiredDiv[i].querySelector('input[type=email]')
    const radioInput = [...requiredDiv[i].querySelectorAll('input[type=radio]')]
    
    // 選擇 Label 與 p
    const inputLabel = requiredDiv[i].querySelector('label')
    const warning = requiredDiv[i].querySelector('p')
    
    // 判斷不同輸入場景
    if (radioInput.some(radio => radio.checked)) {
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

  // 如果沒有 Error（沒有未輸入之必填欄位），印出 submitedData 內容
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
  
  // 有 Error 的話就會阻止表單傳送
  evt.preventDefault()
})

