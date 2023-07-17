function direction(elemento, index) {
  let direction = elemento[index].dataset.anime
  return direction
}

function getIndexAndItemClickActive(element, functionActive) {
  element.forEach((item, index) => {
    item.addEventListener('click', () => {
      functionActive(item, index)
    })
  })
}

function getItemInsertText(element, functionActive) {
  element.forEach((item, index) => {
    functionActive(item)
  })
}

export function initTabNav() {
  // Eu pego os vetores dos data-tab seja das li e das div
  const tabMenu = document.querySelectorAll("[data-tab='menu-experiencie'] li")
  const tabContent = document.querySelectorAll(
    "[data-tab='content-experiencie'] div"
  )
  // console.log(tabContent)
  // console.log(tabContent.length)
  // Se os vetores tiverem tamanho coloca uma classe active no primeiro elemento do menu e do vetor que contem as div ao iniciar a aplicação
  if (tabMenu.length && tabContent.length) {
    tabMenu[0].classList.add('active')
    tabContent[0].classList.add('active')

    // Active com click
    function activeTab(item, index) {
      // Percorre todos os elementos dos arrays
      // Content é os elementos dentro do array e a gente tira a active deles
      tabContent.forEach(content => {
        content.classList.remove('active')
      })
      //Colocando no indice passado pelo metodo a classe active e a Direção que a div vai aparecer, ou seja show right, porque no tabContent que é a div tem o data-anime(Atributo que a gente cria e que pode ser pego com o dataset) que tem showright que é adicionado como uma classe
      // const direction = tabContent[index].dataset.anime
      // console.log(direction)
      tabContent[index].classList.add('active', direction(tabContent, index))

      // De acordo com o indice selecionado no menu, a classe active é adicionada ao menu
      tabMenu.forEach(content => {
        content.classList.remove('active')
      })
      tabMenu[index].classList.add('active')
    }

    // Passando indice de cada elemento do array dos li, de acordo com o click, ele pega o indice do li na lista e coloca a classe active no item(li) do menu e na div(tabContent -> conteudo) com o mesmo index da li
    getIndexAndItemClickActive(tabMenu, activeTab)
  }
}

export function initProject() {
  // const tabHeader = document.querySelectorAll(
  //   "[data-tab='content-projects'] .project h3"
  // )
  // console.log(tabHeader)
  // console.log(tabHeader.length)

  const tabContent = document.querySelectorAll(
    "[data-tab='content-projects'] .project .details-projects"
  )
  const tabSection = document.querySelectorAll(
    "[data-tab='section-projects'] .project"
  )
  // console.log(tabSection)
  // console.log(tabSection.length)

  if (tabContent.length) {
    tabContent[0].classList.add('active-project')
    tabSection[0].classList.add('active-project')

    function activeProject(item, index) {
      tabContent.forEach(content => {
        content.classList.remove('active-project')
      })
      // const direction = tabContent[index].dataset.anime
      tabContent[index].classList.add(
        'active-project',
        direction(tabContent, index)
      )

      tabSection.forEach(content => {
        content.classList.remove('active-project')
      })
      tabSection[index].classList.add('active-project')
    }

    getIndexAndItemClickActive(tabSection, activeProject)
  }
}

export function initShowTechnologyDescription() {
  const tabTechnology = document.querySelectorAll(
    '.skill-list .skill-list-item'
  )

  let objectDescriptionTechnologies = {
    html: {
      name: 'HTML',
      description:
        'HTML é uma linguagem de marcação utilizada na construção de páginas na Web. Documentos HTML podem ser interpretados por navegadores. A tecnologia é fruto da junção entre os padrões HyTime e SGML. HyTime é um padrão para a representação estruturada de hipermídia e conteúdo baseado em tempo'
    },
    css: {
      name: 'CSS',
      description:
        'Cascading Style Sheets é um mecanismo para adicionar estilo a um documento web. O código CSS pode ser aplicado diretamente nas tags ou ficar contido dentro das tags <style>. Também é possível, em vez de colocar a formatação dentro do documento, criar um link para um arquivo CSS que contém os estilos.'
    },
    js: {
      name: 'JavaScript',
      description:
        'JavaScript é uma linguagem de programação interpretada estruturada, de script em alto nível com tipagem dinâmica fraca e multiparadigma. Juntamente com HTML e CSS, o JavaScript é uma das três principais tecnologias da World Wide Web.'
    },
    react: {
      name: 'React',
      description:
        'O React é uma biblioteca JavaScript de código aberto com foco em criar interfaces de usuário em páginas web. É mantido pelo Facebook, Instagram, outras empresas e uma comunidade de desenvolvedores individuais. É utilizado nos sites da Netflix, Imgur, Feedly, Airbnb, SeatGeek, HelloSign, Walmart e outros.'
    },
    reactNative: {
      name: 'React Native',
      description:
        'React Native é uma biblioteca Javascript criada pelo Facebook. É usada para desenvolver aplicativos para os sistemas Android e iOS de forma nativa'
    },
    java: {
      name: 'Java',
      description:
        'Java é uma linguagem de programação orientada a objetos desenvolvida na década de 90 por uma equipe de programadores chefiada por James Gosling, na empresa Sun Microsystems. Em 2008 o Java foi adquirido pela empresa Oracle Corporation.'
    },
    sql: {
      name: 'SQL(Mysql, Sqlite and Postgress)',
      description:
        'Structured Query Language, ou Linguagem de Consulta Estruturada ou SQL, é a linguagem de pesquisa declarativa padrão para banco de dados relacional. Muitas das características originais do SQL foram inspiradas na álgebra relacional. O MySQL é um sistema de gerenciamento de banco de dados, que utiliza a linguagem SQL como interface. É atualmente um dos sistemas de gerenciamento de bancos de dados mais populares da Oracle Corporation, com mais de 10 milhões de instalações pelo mundo.'
    },
    github: {
      name: 'GitHub',
      description:
        'GitHub é uma plataforma de hospedagem de código-fonte e arquivos com controle de versão usando o Git. Ele permite que programadores, utilitários ou qualquer usuário cadastrado na plataforma contribuam em projetos privados e/ou Open Source de qualquer lugar do mundo.'
    },
    node: {
      name: 'Node',
      description:
        'Node.js é um interpretador de código JavaScript com código aberto orientado a eventos, focado em migrar a programação do Javascript do lado do cliente para os servidores.'
    },
    git: {
      name: 'Git',
      description:
        'Git ₍ₒᵤ em inglês britânico, ou git ₍ₒᵤ em inglês americano, é um sistema de controle de versão distribuído de código aberto e gratuito, criado por Linus Torvalds em 2005 para gerenciar o desenvolvimento do núcleo Linux, com suporte à maioria das plataformas de computador e sistemas operacionais.'
    },
    ts: {
      name: 'TypeScript',
      description:
        'TypeScript é um superconjunto de JavaScript desenvolvido pela Microsoft que adiciona tipagem e alguns outros recursos a linguagem. TypeScript é mantido pelo time de desenvolvimento do Visual Studio e é lançado sob a licença Apache 2.0.'
    },
    jest: {
      name: 'Jest',
      description:
        'Jest é um framework de testes criado pelo Facebook que visa facilitar a criação de testes unitários em aplicações JavaScript. Ele é mantido pelo Facebook, Instagram e outras empresas e uma comunidade de desenvolvedores individuais.'
    },
    styledComponentes: {
      name: 'Styled Componentes',
      description:
        'styled-components é uma biblioteca para React e React Native que permite que você use estilos ao nível de componente na sua aplicação. Eles são escritos em uma mistura de JavaScript com CSS. Se você ainda não está familiarizado com styled-components, dê uma olhada no website oficial para ter uma idéia.'
    },
    figma: {
      name: 'Figma',
      description:
        'Figma é um editor gráfico de vetor e prototipagem de projetos de design baseado principalmente no navegador web, com ferramentas offline adicionais para aplicações desktop para GNU/Linux, macOS e Windows.'
    },
    tailwindcss: {
      name: 'Tailwind CSS',
      description:
        'Tailwind CSS é uma estrutura CSS de código aberto. A principal característica desta biblioteca é que, ao contrário de outros frameworks CSS como Bootstrap, ela não fornece uma série de classes predefinidas para elementos como botões ou tabelas.'
    },
    profileGitHub: {
      name: 'My Github Profile Skills',
      description:
        'https://github.com/PedrohvFernandes#user-content-skills-tecnologias-e-ferramentas-nerd_face'
    },
    reset: {
      name: 'Limpar descrição',
      description: 'Selecione uma tecnologia para ver a descrição'
    }
  }

  if (tabTechnology.length) {
    function injectedText(item) {
      item.innerHTML = objectDescriptionTechnologies[item.id].name
    }
    getItemInsertText(tabTechnology, injectedText)

    function activeTechnology(item, index) {
      const descriptionTechnologies = document.querySelector(
        '#descriptionTechnologies'
      )
      descriptionTechnologies.innerHTML =
        objectDescriptionTechnologies[item.id].description

      if (
        descriptionTechnologies.innerHTML ===
        'https://github.com/PedrohvFernandes#user-content-skills-tecnologias-e-ferramentas-nerd_face'
      ) {
        descriptionTechnologies.innerHTML = `<a class='linkMyProfileGitHub' href="${
          descriptionTechnologies.innerHTML
        }" target="_blank">${objectDescriptionTechnologies[item.id].name}</a>`
      }

      const direction = descriptionTechnologies.dataset.anime
      descriptionTechnologies.classList.add(direction)

      setTimeout(function () {
        descriptionTechnologies.classList.remove(direction)
      }, 500)
    }

    getIndexAndItemClickActive(tabTechnology, activeTechnology)
  }

  // let arrayDescricaoTecnologia = [
  //   'HTML é uma linguagem de marcação utilizada na construção de páginas na Web. Documentos HTML podem ser interpretados por navegadores. A tecnologia é fruto da junção entre os padrões HyTime e SGML. HyTime é um padrão para a representação estruturada de hipermídia e conteúdo baseado em tempo',
  //   'Cascading Style Sheets é um mecanismo para adicionar estilo a um documento web. O código CSS pode ser aplicado diretamente nas tags ou ficar contido dentro das tags <style>. Também é possível, em vez de colocar a formatação dentro do documento, criar um link para um arquivo CSS que contém os estilos.',
  //   'JavaScript é uma linguagem de programação interpretada estruturada, de script em alto nível com tipagem dinâmica fraca e multiparadigma. Juntamente com HTML e CSS, o JavaScript é uma das três principais tecnologias da World Wide Web.',
  //   'O React é uma biblioteca JavaScript de código aberto com foco em criar interfaces de usuário em páginas web. É mantido pelo Facebook, Instagram, outras empresas e uma comunidade de desenvolvedores individuais. É utilizado nos sites da Netflix, Imgur, Feedly, Airbnb, SeatGeek, HelloSign, Walmart e outros.',
  //   'React Native é uma biblioteca Javascript criada pelo Facebook. É usada para desenvolver aplicativos para os sistemas Android e iOS de forma nativa',
  //   'Java é uma linguagem de programação orientada a objetos desenvolvida na década de 90 por uma equipe de programadores chefiada por James Gosling, na empresa Sun Microsystems. Em 2008 o Java foi adquirido pela empresa Oracle Corporation.',
  //   'Structured Query Language, ou Linguagem de Consulta Estruturada ou SQL, é a linguagem de pesquisa declarativa padrão para banco de dados relacional. Muitas das características originais do SQL foram inspiradas na álgebra relacional. O MySQL é um sistema de gerenciamento de banco de dados, que utiliza a linguagem SQL como interface. É atualmente um dos sistemas de gerenciamento de bancos de dados mais populares da Oracle Corporation, com mais de 10 milhões de instalações pelo mundo.',
  //   'GitHub é uma plataforma de hospedagem de código-fonte e arquivos com controle de versão usando o Git. Ele permite que programadores, utilitários ou qualquer usuário cadastrado na plataforma contribuam em projetos privados e/ou Open Source de qualquer lugar do mundo.',
  //   'Git ₍ₒᵤ em inglês britânico₎ é um sistema de controle de versões distribuído, usado principalmente no desenvolvimento de software, mas pode ser usado para registrar o histórico de edições de qualquer tipo de arquivo.',
  //   'Figma é um editor gráfico de vetor e prototipagem de projetos de design baseado principalmente no navegador web, com ferramentas offline adicionais para aplicações desktop para GNU/Linux, macOS e Windows.',
  //   'Node.js é um software de código aberto, multiplataforma, baseado no interpretador V8 do Google e que permite a execução de códigos JavaScript fora de um navegador web.',
  //   'TypeScript é uma linguagem de programação de código aberto desenvolvida pela Microsoft. É um superconjunto sintático estrito de JavaScript e adiciona tipagem estática opcional à linguagem.',
  //   'Tailwind CSS é uma estrutura CSS de código aberto. A principal característica desta biblioteca é que, ao contrário de outros frameworks CSS como Bootstrap, ela não fornece uma série de classes predefinidas para elementos como botões ou tabelas.',
  //   ''
  // ]

  // if (tabTechnology.length) {

  //   function activeTechnology(index) {
  //     descricaoTecnologia.innerHTML = arrayDescricaoTecnologia[index]

  //     const direction = descricaoTecnologia.dataset.anime
  //     descricaoTecnologia.classList.add(direction)

  //     setTimeout(function () {
  //       descricaoTecnologia.classList.remove(direction)
  //     }, 500)
  //   }
  //   pegarIndex(tabTechnology, activeTechnology)
  // }
}
