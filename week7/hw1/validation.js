const submit = document.querySelector('.submit')
const inputTags = document.querySelectorAll('input')
const requiredDiv = document.querySelectorAll('.required')
console.log([...requiredDiv])

submit.addEventListener('click', evt => {
  let submittedData = []
  let hasError = false
  
  for (let i = 0; i < inputTags.length -1; i++) {
    const inputValue = inputTags[i].value
    const inputParentNode = inputTags[i].parentNode
    let inputLabel
    if (inputParentNode !== undefined) {
      inputLabel = inputTags[i].parentNode.querySelector('label')
    }
    let pClassList
    
    if (inputTags[i].type === "radio") {
      let radioCheckedContent = checkRadio(inputTags[i])
      if (radioCheckedContent) {
        submittedData.push(`報名類型: ${radioCheckedContent}\n`)
      }
    } else if (inputValue === '') {
      if (inputTags[i].parentNode.querySelector('p') !== null) {
        pClassList = inputTags[i].parentNode.querySelector('p').classList
        pClassList.remove('hidden')
        hasError = true
      }
    } else {
      if (inputParentNode !== undefined && inputParentNode.querySelector('p') !== null) {
        pClassList = inputTags[i].parentNode.querySelector('p').classList
        pClassList.add('hidden')
      }
      if (inputLabel !== undefined && inputValue !== "提交") {
        submittedData.push(`${inputLabel.innerHTML}: ${inputValue}\n`)
      }
    }
  }
  if (hasError === false) {
    alert(submittedData.join(''))
    return
  }
  evt.preventDefault()
})

let type__1Checked = false
function checkRadio(inputTag) {
  const radioClassList = inputTag.parentNode.parentNode.querySelector('p').classList
  if (inputTag.checked) {
    console.log(inputTag)
    radioClassList.add('hidden')
    if (inputTag.id === "type__1") {
      type__1Checked = true
    }
    return inputTag.parentNode.querySelector('label').innerHTML
  }

  if (type__1Checked === false && inputTag.id === "type__2") {
    hasError = true
    radioClassList.remove('hidden')
  }
}


