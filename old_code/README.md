<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Forks][forks-shield]][forks-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![site-status]](https://vehicles-crud.vercel.app)


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Vehicles</h3>

  <p align="center">
    Um site de visualização e cadastramento de veículos
    <br />
    <br />
    <a href="https://vehicles-crud.vercel.app">Ver Preview</a>
    ·
    <a href="https://github.com/OuthBack/vehicles-crud/issues">Reportar Bug</a>
    ·
    <a href="https://github.com/OuthBack/vehicles-crud/issues">Requisitar Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Tabela de Conteúdo</summary>
  <ol>
    <li>
      <a href="#about-the-project">Sobre o projeto</a>
      <ul>
        <li><a href="#built-with">Feito com:</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Pré-requisitos</a></li>
        <li><a href="#installation">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#usage">Site Preview</a></li>
    <li><a href="#license">Licença</a></li>
    <li><a href="#contact">Contato</a></li>

  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## 📖 Sobre o projeto

Um site de visualização e cadastramento de veículos

### 🔋 Feito com:

<!-- * [Angular](https://angular.io) -->
<!-- * [Material UI](https://material.angular.io) -->
* [Next.js](https://nextjs.org)
* [Prisma](https://www.prisma.io)
* [Node.js](https://nodejs.org/en)
* [PNPM](https://pnpm.io/pt/)
* [Docker](https://www.docker.com)
* [Docker-Compose](https://docs.docker.com/compose)

<!-- GETTING STARTED -->
## :scroll: Getting Started

Para rodar o projeto localmente siga os seguintes passos:

### :warning: Pré-requisitos

* docker-compose

### :gear: Instalação

1. Clone o repositório
   ```sh
   git clone https://github.com/OuthBack/vehicles-crud.git
   ```
2. Crie um arquivo `.env` contendo
   ```.env
      DATABASE_URL=mysql://root:123456@mysql:3306/vehicles
      MYSQL_ROOT_HOST=localhost
      MYSQLDB_ROOT_PASSWORD=123456
      MYSQLDB_DATABASE=vehicles
      MYSQLDB_LOCAL_PORT=3306
      MYSQLDB_DOCKER_PORT=3306

      NODE_DOCKER_PORT=3000
      NODE_LOCAL_PORT=3000
   ```
3. Inicie os containers(node.js, mysql)
   ```sh
    docker-compose up -d
   ```
4. Acesse o endereço http://localhost:3000
   
<!-- Site Preview -->
## 🖥️ Site Preview
[![site-status]](https://vehicles-crud.vercel.app)
<br/>

[![Product Name Screen Shot][product-screenshot]](https://vehicles-crud.vercel.app)
Veja o Preview do Site:
https://vehicles-crud.vercel.app

<!-- LICENÇA -->
## :pencil: Licença
                                                     
                                                    
Distribuido sobre a Licença MIT. Veja `LICENÇA` para mais informações.
                                                      
                                                      
<!-- CONTACT -->
## :telephone_receiver: Contato

Henrique Figueiredo - riquessan@gmail.com

Link do Projeto: [https://github.com/OuthBack/vehicles-crud](https://github.com/OuthBack/vehicles-crud)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/h-figueiredo
[product-screenshot]: .github/screenshot.png
[site-status]: https://img.shields.io/website/https/vehicles-angular.vercel.app/path/to/page.html.svg.?style=for-the-badge
