# Teste técnico — SPS Group / HARPIA it

Resolução do teste técnico para a vaga de Desenvolvedor. CRUD de usuários com autenticação JWT, back em Node/Express e front em React, tudo subindo num `docker compose up`.

- `test-sps-server/` — API REST
- `test-sps-react/` — SPA

## Como rodar

Pré-requisito: Docker (ou Docker Desktop) com Docker Compose v2. Não precisa de Node instalado na máquina.

A partir da **raiz do repositório** (onde fica o `docker-compose.yml`):

```bash
docker compose up --build
```

- Front: http://localhost:3334
- API:   http://localhost:3333

O `/` do front redireciona automaticamente pra `/login`.

Pra parar (também na raiz):

```bash
docker compose down
```

## Login

Usuário admin já vem cadastrado em memória:

```
email: admin@spsgroup.com.br
senha: 1234
```

Após o login o token JWT é guardado em `localStorage` e injetado em todas as chamadas seguintes via interceptor do axios. O botão "Sair" no header limpa o token e volta pra tela de login. Token inválido ou expirado também derruba a sessão automaticamente (resposta 401 do server → logout + redirect).

## Área autenticada

Em `/users`:

- Listagem com tipo (`user` / `admin`)
- "Novo usuário" → `/users/new`
- "Editar" em cada linha → `/users/:id` (formulário pré-preenchido; senha opcional na edição)
- "Excluir" em cada linha (desabilitado pro admin seed pra não derrubar o próprio login)

Tudo que está atrás de `/users` é protegido por um `ProtectedRoute` no react-router que redireciona pra `/login` se não houver token.

## API

Todas as rotas exigem `Authorization: Bearer <token>`, exceto o login. Sem token ou token inválido retorna `401`.

| Método | Rota            | Descrição                                          |
|--------|-----------------|----------------------------------------------------|
| POST   | `/auth/login`   | `{ email, password }` → `{ token }`                |
| GET    | `/users`        | Lista todos                                        |
| GET    | `/users/:id`    | Detalhe                                            |
| POST   | `/users`        | Cria (`email`, `name`, `type`, `password`)         |
| PUT    | `/users/:id`    | Atualiza campos                                    |
| DELETE | `/users/:id`    | Remove                                             |

Email duplicado retorna `409`. O campo `password` nunca é devolvido nas respostas.

## Variáveis de ambiente

Já estão setadas no `docker-compose.yml`. Pra rodar fora do compose, ver os `.env.example` de cada projeto.

| Variável                | Projeto | Default                       |
|-------------------------|---------|-------------------------------|
| `PORT`                  | server  | `3333`                        |
| `JWT_SECRET`            | server  | `dev-secret-change-me`        |
| `REACT_APP_SERVER_URL`  | client  | `http://localhost:3333`       |

## Decisões

- **Banco em memória.** Restart do container = perda dos dados (o admin seed volta sozinho no boot). Foi o que o enunciado pediu.
- **Senha em texto plano.** Idem — o enunciado disse pra não criptografar. Em produção entraria bcrypt/argon2.
- **Portas 3333/3334.** As default (3001/3000) batiam com outros serviços rodando aqui. Trocar é um achar/substituir no `docker-compose.yml` e nos `.env.example`.
- **Commits incrementais.** Cada feature ou decisão tem seu próprio commit, do scaffold do Docker até o polish visual. `git log --oneline` conta a história.

## Stack

Node 20 · Express · jsonwebtoken · React 18 · react-router 6 · axios · Docker Compose
