
// import { Pikachu } from './bases/03-class'
// import { charmander } from './bases/04-onjections'
// import { charmander } from './bases/05-decorators'
import { charmander } from './bases/06-decorators2'
import './style.css'
import typescriptLogo from './typescript.svg'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Hello Vite!!! </h1>

  <h2>${charmander}</h2>

  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="${typescriptLogo}" alt="TypeScript Logo" />
  </a>
`


