export default ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700,
  // reset: true
}).reveal(`
  #home,
  #home .wrapper,
  #home .wrapper header,
  #home .wrapper .content,
  #about,
  #about .wrapper,
  #about .wrapper header,
  #about .wrapper .content,
  #experience,
  #experience .wrapper,
  #experience .wrapper header,
  #experience .wrapper .content,
  #projects,
  #projects .wrapper,
  #projects .wrapper header,
  #projects .wrapper .content,
  #projects .wrapper .content .project,
  #technologies,
  #technologies .wrapper,
  #technologies .wrapper header,
  #technologies .wrapper .content,
  #contact,
  #contact .wrapper,
  #contact .wrapper header,
  #contact .wrapper .content,
  #emailContact .wrapper,
  #emailContact .wrapper header,
  #emailContact .wrapper .content,
  #footer`)
