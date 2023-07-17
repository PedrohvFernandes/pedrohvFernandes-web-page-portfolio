function getIndexInsertText(element, functionActive) {
  element.forEach((item, index) => {
    functionActive(index)
  })
}
export function injectedTextViewProjectDescription() {
  // Eu pego os vetores dos data-anime
  const tabElementProjectDescription = document.querySelectorAll(
    "[data-anime='project-description']"
  )
  if (tabElementProjectDescription.length) {
    function injectedText(index) {
      tabElementProjectDescription[index].innerHTML +=
        ' Ficarei feliz se deixar uma star no repositório 😊.'
    }
    getIndexInsertText(tabElementProjectDescription, injectedText)
  }
}
