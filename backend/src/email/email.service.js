export class EmailService {
  #transport
  constructor(transport) {
    this.#transport = transport
  }

  async sendMail({ to, subject, html }) {
    const info = await this.#transport.sendMail({
      from: this.#transport.options.from,
      priority: 'high', // Prioridade alta
      headers: {
        'X-Priority': '1', // Valor de prioridade personalizado
        'X-MSMail-Priority': 'High' // Outro cabeçalho de prioridade personalizado para clientes do Outlook
      },
      to,
      subject,
      html
    })
    return info.messageId
  }
}
