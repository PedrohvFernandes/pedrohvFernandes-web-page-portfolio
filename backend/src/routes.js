import express from 'express'
import { EmailService } from './email/email.service.js'
import { createTransport } from 'nodemailer'

export const router = express.Router()

router.post('/email', async (req, res) => {
  const { name, idea, budget, email } = req.body
  let transporterConfig = {
    host: process.env.EMAIL_HOST_SMTP,
    port: process.env.EMAIL_PORT_SMTP || 465,
    from: process.env.EMAIL_FROM,
    auth: {
      user: process.env.EMAIL_USER,
      // Senha do email para app Verificação em duas etapas: Mensagem_Portfolio
      pass: process.env.EMAIL_PASS_APP2F
    }
  }

  const emailService = new EmailService(createTransport(transporterConfig))

  let sendEmail = {
    to: email,
    subject: `Orçamento para desenvolvimento de site para o cliente - ${name}`,
    html: `
      <div>
        <div>
          <h1>Olá, tudo bem? Aqui esta o orçamento que solicitou, dentre alguns instantes entro em contato com você 🤠👍</h1> <br>
          <h2>Nome do cliente: ${name}</h2>
          <h2>Ideia do cliente 💡: ${idea}</h2> 
          <h3>Orçamento do cliente 💵: ${budget}</h3>
          <h4><a href='mailto:${email}' target="_blank">Email do cliente para contato ✉️</a>: ${email}</h4> <br>
        </div>
        <div>
          <a href='https://pedrohvfernandes.github.io' target="_blank">Caso queira retornar ao meu site pessoal :)</a>

          <br>

          <a href='https://pedrohvfernandes.github.io/#contact' target='_blank'>Caso queira mais contatos</a>
        </div>
      </div>
      <footer>
        <p>Atenciosamente, Pedro Henrique</p>
      </footer>  `
  }
  const info = await emailService.sendMail(sendEmail)

  if (!info) {
    return res.status(400).json({ error: 'Erro ao enviar email' })
  }
  return res.status(200).json({ message: 'Email enviado com sucesso' })
})
