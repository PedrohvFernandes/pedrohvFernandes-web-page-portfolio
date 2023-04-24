// function myAge() {
//   let data = new Date()
//   let ano = data.getFullYear()
//   let nascimento = 2001;
//   let age = ano - nascimento
//   document.getElementById('anos').innerHTML = age
// }
// myAge()

function checkAge(currentMonth, birthMonth, age, birthDay){
  //Se mes atual for menor que o nascimento, nao fez aniversario ainda;
  if (currentMonth < birthMonth) {
    return --age
  } 
  //Se estiver no mes do nascimento, verificar o dia
  if (currentMonth === birthMonth) {
    if (new Date().getDate() < birthDay) {
      //Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
      return --age
    }
  }
}

export function currentAge(birthDate) {
  // Pegando uma data nova
  let currentDate = new Date()
  // Pegando o ano atual
  let currentYear = currentDate.getFullYear()
  // Pegando a data de nascimento e criando um vetor de tres indices(dia, mes e ano)
  let birthYearParts = birthDate.split('/')
  // Capturando a data de nascimento em cada variavel
  let birthDay = birthYearParts[0]
  let birthMonth = birthYearParts[1]
  let birthYear = birthYearParts[2]
  // age da pessoa
  let age = currentYear - birthYear
  // A gente pega o mes + 1 porque o date pega mes anterior ao atual
  let currentMonth = currentDate.getMonth() + 1
  const ageCurrent = checkAge(currentMonth, birthMonth, age, birthDay)
  document.getElementById('years').innerHTML = ageCurrent;
}

export function currentYear() {
  let date = new Date()
  document.getElementById('currentYear').innerHTML = date.getFullYear()
}
