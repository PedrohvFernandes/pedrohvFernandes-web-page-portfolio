export function activateMenuAtCurrentSection(section) {
  const targetLine = scrollY + innerHeight / 2
  // console.log('Linha alvo: ', targetLine)

  const sectionTop = section.offsetTop
  // console.log('Topo da seção: ', sectionTop)

  const sectionHeight = section.offsetHeight
  // console.log('Altura da seção: ', sectionHeight)

  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop
  // console.log(
  //   'O topo da seção chegou ou passou da linha ? ',
  //   sectionTopReachOrPassedTargetLine
  // )

  const sectionEndsAt = sectionTop + sectionHeight
  // console.log('final da seçao que é o topo + altura da seçao: ', sectionEndsAt)

  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine
  // console.log('O fundo da seção passou da linha ? ', sectionEndPassedTargetLine)

  const sectionBoundaries =
    sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine
  // console.log('Limite da seção ? ', sectionBoundaries)

  const sectionId = section.getAttribute('id')
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`)

  menuElement.classList.remove('active')
  if (sectionBoundaries) {
    menuElement.classList.add('active')
  }
}

export function activateMenuAtCurrentSectionProgressbar() {
  // let progressBarHandler = () => {
  // }
  // O quanto estou distante do topo da pagina sempre muda
  const totalScroll = document.documentElement.scrollTop
  // O tamanho da pagina no total nunca muda scrollHeight, menos o tamanho da tela que o usuario esta vendo no momento, nunca muda  clientHeight. Dando o tamanho exato da janela do usuario
  const windowHeight =
    document.documentElement.scrollHeight - document.documentElement.clientHeight
  // O quanto o usuario ja rolou da pagina. So dividir o totalScroll(o quanto que voce ja scrolou/esta distante do topo da pagina) pelo windowHeight(O tamanho da pagina)
  const scroll = `${totalScroll / windowHeight}`
  document.querySelector('.progressbar').style.transform = `scaleX(${scroll})`
  document.querySelector('.progressbar').style.width = `${scroll * 100}%`
  // window.addEventListener('scroll', progressBarHandler)
  return () => window.removeEventListener('scroll', progressBarHandler)
}
