export async function sendMail(_data) {
  // http://localhost:4000/email
  // https://smtp-envio-de-email-vercel-portfolio.vercel.app/email
 return await fetch(`https://smtp-envio-de-email-vercel-portfolio.vercel.app/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(_data)
  })
    .then(response => {
      return response.status
    })
    .catch(error => {
      console.log(error)
      return error
    })
}