import { sendMailInterface } from './sendMailInterface.js'
import { sendMail } from './sendMail.js'
export function emailService() {
  document.getElementById('#form').addEventListener('submit',  function (event) {
    sendMailInterface(event, sendMail)
  })
}