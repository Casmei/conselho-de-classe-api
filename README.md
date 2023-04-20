![Logo](github-images/conselho.png)

> 🔹 Projeto desenvolvido como avaliação ao pedido de proeficiencia na disciplina de desenvolvimento web.

## Cenário
Foi repassado ao professor da disciplina de desenvolvimento web uma necessidade do IFNMG - Campus Almenara, esta relacionada aos conselhos de classe. O problema é basicamnte a falta de informações dos professores sobre determinados alunos, gerando divergências e dificultando a tomada de decições acertivas.

## Proposta
Como solução, foi elaborado um sistema onde professores tenham a possiblidade de realizar anotações sobre determinados alunos, descrevendo ocorridos em dado momento, elogiando-os ou informando um mal comportamento, de forma que esses comentários sejam úteis no dia do conselho de classe. Esse sistema possui um painel administrativo que facilite a gestão do coordenador dos professores, alunos, matérias, cursos, entre outras entidades.

## Instalação

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com) - Para clonar esse projeto, e quem sabe no futuro fazer um pull de alterações do mesmo.
- [Docker](https://www.docker.com/) - O projeto foi desenvolvido para ser servido por containers docker.

### Rodando a aplicação
Primeiramente clone este repositório

```bash
  git clone https://github.com/Casmei/conselho-de-classe-api.git
  cd conselho-de-classe-api
```

Dentro da pasta do projeto, clone as variáveis de ambiente 
```bash
  cp .env.example .env
```

Por fim, inicie a aplicação utilizando o docker

```bash
  docker compose up --build
```
| __Atenção__: Verifique se as postas __3000__ e __5432__ estão disponíveis em sua máquina

## Documentação
Foi utilizado o [Swagger](https://docs.nestjs.com/openapi/introduction) para documentar a aplicação, inicie o projeto e entre nesse [link](http://localhost:3000/docs) para acessar a documentação, ou, coloque ```/docs``` na rota raíz.

## Ferramentas utilizadas

- Nest.js
- TypeORM
- Postgress
- Docker

---

Feito com ❤️ e ☕ por Tiago de Castro 👋🏽 [Entre em contato!](https://earnest-begonia-690754.netlify.app/)
