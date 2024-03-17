# Rinha de Backend, Segunda Edição: 2024/Q1 - Controle de Concorrência

<div align="center">
  <img src="https://user-images.githubusercontent.com/709451/182802334-d9c42afe-f35d-4a7b-86ea-9985f73f20c3.png" alt="logo Bun.js" width="150" height="auto">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png" alt="logo Typescript" width="150" height="auto">
  <img src="https://elysiajs.com/assets/elysia.svg" alt="logo Elysia" width="150" height="auto">
  <img src="https://blog.kakaocdn.net/dn/bRJ6In/btq4bB49G3B/FNdqeeamFw6H99zUgKwzn0/img.png" alt="logo Nginx" width="150" height="auto">
  <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/postgresql-icon.png" alt="logo PostgreSQL" width="150" height="auto">
</div>

## Tecnologies:

**Bun.js** with **Typescript** and **Elysia**

**Nginx** as loadbalancer

**PostgreSQL** database


## General vision :eyes:

```mermaid
flowchart TD
    G(Stress Test - Gatling) -.-> LB(nginx)
    subgraph Application
        LB -.-> API1
        LB -.-> API2
        API1 -.-> Db[(PG)]
        API2 -.-> Db[(PG)]
    end
```

## Stress Test

<img width="1032" alt="stats screen" src="https://github.com/diogopcaires/rinha-de-backend-2024-q1-ts-bun/blob/main/images/Capture-2024-02-12-063520.png">

### Considerations :alien:

    Don't consider this project, I'm just testing a few things.
