![Logo](github-images/conselho.png)

Projeto desenvolvido como avaliação ao pedido de proeficiencia na disciplina de desenvolvimento web. Sua proposta é 
Este projeto é um sistema de gerenciamento de conselhos de classe que permite aos professores fazer anotações sobre seus alunos. No dia do conselho, essas anotações podem ser consultadas, o que facilita o processo de avaliação e discussão sobre o desempenho dos alunos.


## Instalação

Primeiramente clone este repositório

```bash
  git clone https://github.com/Casmei/conselho-classe-ifnmg
  cd conselho-classe-ifnmg
```

Dentro da pasta do projeto, clone as variáveis de ambiente 
```bash
  cp .env.example .env
```

Por fim, inicie a aplicação utilizando o docker e pronto!

```bash
  docker compose up --build
```
## Documentação
Para documentar a aplicação, foi utilizado o [Swagger](https://docs.nestjs.com/openapi/introduction), para acessar, inicie o projeto e entre nesse [link](http://localhost:3033/docs)
## Stack utilizada

**Back-end:** Typescript, Nest.js, TypeORM, NodeMailer, Redis

