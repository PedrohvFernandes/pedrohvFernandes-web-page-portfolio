export class EmailService {
  #transport
  constructor(transport) {
    this.#transport = transport
  }

  async sendMail({ to, subject, html }) {
    const info = await this.#transport.sendMail({
      from: this.#transport.options.from,
      to,
      subject,
      html
    })
    return info.messageId
  }
}
