export async function sendMailInterface(event, sendMail) {
  event.preventDefault()

  let email = document.querySelector('#email').value
  let name = document.querySelector('#name').value
  let idea = document.querySelector('#idea').value
  let budget = document.querySelector('#budget').value
  let messageResultWorked = document.getElementById('message-result-worked')
  let messageResultError = document.getElementById('message-result-error')
  let submitButton = document.getElementById('submit-button')
  let resetButton = document.getElementById('reset-button')

  if (
    !email.trim() ||
    !name.trim() ||
    !idea.trim() ||
    !email ||
    !name ||
    !idea ||
    !budget
  ) {
    visibleMessageResultWorked(messageResultError, messageResultWorked)
    messageResult(messageResultError, 'Preencha todos os campos!')
    return
  }

  if (
    !email.includes('@') ||
    !email.includes('.') ||
    !email.includes('com')
  ) {
    visibleMessageResultWorked(messageResultError, messageResultWorked)
    messageResult(messageResultError, 'Email inválido')
    return
  }

  const zeroBudget =
    Number(budget) === 0 ? 'Não tenho um orçamento definido' : `R$ ${budget}`

  let _data = {
    customerEmailClient: email.trim(),
    name: name.trim(),
    idea: idea.trim(),
    budget: zeroBudget
  }

  sendingEmail(submitButton, resetButton)

  let responseMail = await sendMail(_data)
  if (responseMail === 200) {
    visibleMessageResultWorked(messageResultWorked, messageResultError)
    messageResult(
      messageResultWorked,
      'Email enviado com sucesso! Verifique sua caixa de entrada :)'
    )
    emailSent(submitButton, resetButton)
    messageResult(submitButton, 'Email enviado')
    document.getElementById('#form').reset()
  } else {
    visibleMessageResultWorked(messageResultError, messageResultWorked)
    messageResult(messageResultError, 'Erro ao enviar o email!')
    emailSent(submitButton, resetButton)
    messageResult(submitButton, 'Não foi possível enviar')
  }
}

function visibleMessageResultWorked(elementOne, elementTwo) {
  elementOne.style.display = 'flex'
  elementTwo.innerHTML = ''
  elementTwo.style.display = 'none'
  let interval = setInterval(() => {
    elementOne.innerHTML = ''
    elementOne.style.display = 'none'
    clearInterval(interval)
  }, 5000)
}

function messageResult(element, message) {
  element.innerHTML = message
}

function sendingEmail(submitButton, resetButton) {
  submitButton.innerHTML = 'Enviando...'
  submitButton.setAttribute('disabled', 'disabled')
  resetButton.setAttribute('disabled', 'disabled')
}

function emailSent(submitButton, resetButton) {
  let interval = setInterval(() => {
    submitButton.innerHTML = 'Enviar'
    submitButton.removeAttribute('disabled', 'disabled')
    resetButton.removeAttribute('disabled', 'disabled')
    clearInterval(interval)
  }, 5000)
}
