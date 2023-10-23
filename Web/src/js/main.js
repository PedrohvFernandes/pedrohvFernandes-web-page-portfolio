import {
  activateMenuAtCurrentSection,
  activateMenuAtCurrentSectionProgressBar
} from './modules/activateMenuAtCurrentSection.js'
import { currentAge, currentYear } from './modules/currentDates.js'
import {
  initProject,
  initShowTechnologyDescription,
  initTabNav
} from './modules/initSomething.js'
import { injectedTextViewProjectDescription } from './modules/injectedTextView.js'
import {
  showBackToTopButtonOnScroll,
  showNavOnScroll
} from './modules/showSomething.js'
import { typeWriter } from './modules/typeWriter.js'
import { emailService } from './service/MailService/email.service.js'

// Api para scroll
import scrollRevealApi from './modules/scrollRevealApi.js'

window.addEventListener('scroll', onScroll)

onScroll()
function onScroll() {
  showNavOnScroll()
  showBackToTopButtonOnScroll()
  activateMenuAtCurrentSectionProgressBar()

  activateMenuAtCurrentSection(home)
  activateMenuAtCurrentSection(about)
  activateMenuAtCurrentSection(experience)
  activateMenuAtCurrentSection(projects)
  activateMenuAtCurrentSection(technologies)
  activateMenuAtCurrentSection(contact)
  activateMenuAtCurrentSection(emailContact)
}

initTabNav()
initProject()
initShowTechnologyDescription()
currentAge('05/12/2001')
currentYear()
typeWriter()
injectedTextViewProjectDescription()
emailService()
scrollRevealApi
