import express from 'express'
import { EmailService } from './email/email.service.js'
import { createTransport } from 'nodemailer'

export const router = express.Router()

router.post('/email', async (req, res) => {
  const { name, idea, budget, customerEmailClient } = req.body
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
    // Email do cliente e email secundario para contato(serve tambem para armazenar os emails enviados pelo cliente)
    to: [customerEmailClient, process.env.EMAIL_SECONDARY_USER],
    subject: `Orçamento para desenvolvimento de site para o cliente - ${name}`,
    html: `
      <div>
        <div>
          <h1>Olá, tudo bem? Aqui esta o orçamento que solicitou, dentre alguns instantes entro em contato com você 🤠👍</h1> <br>
          <h2>Nome do cliente: ${name}</h2>
          <h2>Ideia do cliente 💡: ${idea}</h2> 
          <h3>Orçamento do cliente R💲: ${budget}</h3>
          <h4>
            <a href='mailto:${customerEmailClient}' target="_blank">Email do cliente para contato ✉️</a>: ${customerEmailClient}
          </h4> 
          <br>
        </div>
        <div>
          <a href='https://pedrohvfernandes-web-page-portfolio.vercel.app' target="_blank">Click aqui caso queira retornar ao meu site pessoal :)</a>

          <br>

          <a href='https://pedrohvfernandes-web-page-portfolio.vercel.app/#contact' target='_blank'>Click aqui caso queira mais contatos</a>

          <br>

          <h4>
            <a href='mailto:${process.env.EMAIL_SECONDARY_USER}' target="_blank">Click aqui caso queira utilizar meu email secundário para contato: ${process.env.EMAIL_SECONDARY_USER}</a>
          </h4>
        </div>
      </div>
      <footer>
        <strong>Atenciosamente, Pedro Henrique 🤠👍</strong>
      </footer>  `
  }
  const info = await emailService.sendMail(sendEmail)

  if (!info) {
    return res.status(400).json({ error: 'Erro ao enviar email' })
  }
  return res.status(200).json({ message: 'Email enviado com sucesso' })
})
