import {
  showNavOnScroll,
  showBackToTopButtonOnScroll
} from './modules/showSomething.js'
import { activateMenuAtCurrentSection, activateMenuAtCurrentSectionProgressbar } from './modules/activateMenuAtCurrentSection.js'
import {
  initTabNav,
  initProject,
  initShowTechnologyDescription
} from './modules/initSomething.js'
import { currentAge, currentYear } from './modules/currentDates.js'
import { typeWriter } from './modules/typeWriter.js'
import { injectedTextViewProjectDescription } from './modules/injectedTextView.js'
import { sendMail } from './service/email.service.js'

// Api para scroll
import scrollRevealApi from './modules/scrollRevealApi.js'

window.addEventListener('scroll', onScroll)

onScroll()
function onScroll() {
  showNavOnScroll()
  showBackToTopButtonOnScroll()
  activateMenuAtCurrentSectionProgressbar()

  activateMenuAtCurrentSection(home)
  activateMenuAtCurrentSection(about)
  activateMenuAtCurrentSection(experience)
  activateMenuAtCurrentSection(projects)
  activateMenuAtCurrentSection(technologies)
  activateMenuAtCurrentSection(contact)
  activateMenuAtCurrentSection(EmailContact)
}

initTabNav()
initProject()
initShowTechnologyDescription()
currentAge('05/12/2001')
currentYear()
typeWriter()
injectedTextViewProjectDescription()
sendMail()
scrollRevealApi
