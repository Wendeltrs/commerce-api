# Commerce API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white" alt="Swagger" />
  <img src="https://img.shields.io/badge/rabbitmq-%23FF6600.svg?&style=for-the-badge&logo=rabbitmq&logoColor=white" alt="RabbitMQ" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white" alt="Cloudinary" />
</p>

<p align="center">
  API REST para e-commerce, desenvolvida com NestJS e TypeScript, com gerenciamento de usuários, empresas, produtos, carrinho de compras, pedidos, pagamentos e entregas.
</p>

---

## 📋 Sumário

- [Sobre o projeto](#-sobre-o-projeto)
- [Tecnologias](#️-tecnologias)
- [Principais funcionalidades](#-principais-funcionalidades)
- [Arquitetura](#️-arquitetura)
- [Instalação](#-instalação)
- [Variáveis de ambiente](#-variáveis-de-ambiente)
- [Executando com Docker](#-executando-com-docker)
- [Documentação da API](#-documentação-da-api)
- [Autenticação](#-autenticação)
- [Endpoints](#-endpoints)
- [Pedidos e pagamentos](#-pedidos-e-pagamentos)
- [Integrações e mensageria](#-integrações-e-mensageria)
- [Cache e desempenho](#-cache-e-desempenho)
- [Segurança](#-segurança)
- [Banco de dados](#️-banco-de-dados)
- [Testes](#-testes)

## 📖 Sobre o projeto

A Commerce API é uma aplicação backend que implementa funcionalidades essenciais de uma plataforma de comércio eletrônico. O projeto foi desenvolvido com foco na organização do código, separação de responsabilidades, persistência de dados, integrações externas e segurança das operações.

A aplicação utiliza **NestJS e TypeScript** para estruturar a API em módulos, serviços e repositórios. O acesso ao banco de dados é realizado com **Prisma ORM e PostgreSQL**, enquanto o Redis é utilizado para cache.

O fluxo de compra contempla o gerenciamento do carrinho, seleção de endereço, cálculo de frete, criação do pedido e geração de uma sessão de pagamento com Stripe. A integração com serviços externos também inclui cálculo e contratação de frete, envio assíncrono de e-mails e armazenamento de arquivos.

## 🛠️ Tecnologias

| Tecnologia | Utilização |
|---|---|
| Node.js | Ambiente de execução |
| TypeScript | Tipagem estática e desenvolvimento |
| NestJS | Framework backend e arquitetura modular |
| Prisma ORM | Consultas, relacionamentos e transações com o banco |
| PostgreSQL | Banco de dados relacional |
| Redis | Cache e armazenamento temporário de dados |
| Docker e Docker Compose | Containerização e ambiente de desenvolvimento |
| JWT e Passport | Autenticação e proteção de rotas |
| Swagger / OpenAPI | Documentação interativa dos endpoints |
| Stripe | Sessões de checkout e processamento de pagamentos |
| Melhor Envio | Cálculo e contratação de fretes |
| RabbitMQ | Mensageria e processamento assíncrono de e-mails |
| Cloudinary | Armazenamento de arquivos e imagens |
| SMTP | Envio de e-mails |
| Jest | Testes automatizados |
| Helmet | Cabeçalhos HTTP de segurança |

## 🏗️ Principais funcionalidades

### Usuários e autenticação
- Cadastro de usuários e login.
- Autenticação utilizando JWT armazenado em cookie.
- Login com Google OAuth.
- Consulta dos dados do usuário autenticado.
- Logout.
- Recuperação, redefinição e alteração de senha.
- Controle de acesso baseado em autenticação e perfil de usuário.

### Catálogo e empresas
- Gerenciamento de produtos e categorias.
- Cadastro e gerenciamento de empresas vendedoras.
- Associação de produtos às empresas responsáveis.
- Gerenciamento de informações e endereços.

### Endereços
- Cadastro, consulta, atualização e exclusão de endereços.
- Definição de endereço padrão.
- Associação de endereços ao usuário autenticado.

### Carrinho de compras
- Gerenciamento do carrinho individual do usuário.
- Adição e gerenciamento de itens.
- Associação dos itens aos respectivos produtos.
- Controle de quantidades e cálculo dos valores do pedido.

### Pedidos e checkout
- Consulta e gerenciamento de pedidos.
- Criação de pedidos a partir do carrinho.
- Registro dos itens e valores no pedido.
- Seleção de endereço de entrega e serviço de frete.
- Cálculo de subtotal, frete e total.
- Persistência dos dados do pedido e do pagamento.
- Proteção contra duplicação de pedidos em cenários de repetição e concorrência.

### Pagamentos e entregas
- Criação de sessões de checkout com Stripe.
- Suporte aos métodos de pagamento configurados no Stripe, incluindo cartão, Pix e boleto.
- Recebimento de eventos de webhook para atualização do status do pagamento.
- Atualização do status do pedido após confirmação do pagamento.
- Cálculo de frete utilizando a integração com Melhor Envio.
- Criação do envio após a confirmação do pagamento.

### Infraestrutura e qualidade
- Cache com Redis.
- Paginação, filtros e ordenação nas consultas compatíveis.
- Exclusão lógica (*soft delete*) em entidades selecionadas.
- Validação de dados por DTOs.
- Serialização das respostas.
- Documentação dos endpoints com Swagger.
- Comunicação assíncrona com RabbitMQ.
- Proteções com CORS, CSRF e rate limiting.

## 🧱 Arquitetura

O projeto utiliza uma arquitetura modular baseada nos recursos da aplicação, separando as responsabilidades de acesso HTTP, regras de negócio e persistência.

```text
src/
├── common/
│   ├── decorators/
│   ├── guards/
│   ├── infra/
│   │   └── redis/
│   └── services/
├── core/
│   └── crypto/
├── models/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── companies/
│   ├── products/
│   ├── categories/
│   ├── addresses/
│   ├── carts/
│   ├── orders/
│   ├── payments/
│   └── mail/
├── prisma/
├── app.module.ts
├── consts.ts
└── main.ts
```

**Responsabilidades principais:**

- **Controllers:** recebem as requisições HTTP e definem as rotas.
- **Services:** coordenam os casos de uso e as regras da aplicação.
- **Repositories:** concentram as operações de persistência e consulta.
- **DTOs:** definem e validam os dados de entrada.
- **Guards:** protegem rotas e controlam o acesso.
- **Decorators:** encapsulam comportamentos reutilizáveis, como acesso ao usuário autenticado e parâmetros de consulta.
- **PrismaService:** disponibiliza o acesso ao banco de dados.
- **Serviços de integração:** encapsulam a comunicação com Redis, Stripe, Melhor Envio, Cloudinary e outros sistemas externos.

A utilização de módulos e interfaces de repositório ajuda a manter as responsabilidades organizadas e facilita a evolução e manutenção do código.

## 📦 Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) 22 ou compatível com o projeto.
- [npm](https://www.npmjs.com/).
- [PostgreSQL](https://www.postgresql.org/).
- [Docker](https://www.docker.com/) e Docker Compose, caso utilize a execução containerizada.
- Conta e credenciais dos serviços externos que desejar utilizar: Stripe, Melhor Envio, Cloudinary, SMTP e RabbitMQ.

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd commerce-api
```

Substitua `<URL_DO_REPOSITORIO>` pela URL real do repositório.

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto, utilizando a seção de variáveis abaixo como referência.

### 4. Configure o banco de dados

Preencha `DATABASE_URL` com a URL de conexão do PostgreSQL e execute as migrações do Prisma:

```bash
npx prisma migrate dev
npx prisma generate
```

Execute os comandos de acordo com a configuração do Prisma e as migrações existentes no repositório.

### 5. Inicie a aplicação

```bash
npm run dev
```

Por padrão, a API utiliza a porta `3000`.

## 🔐 Variáveis de ambiente

As variáveis utilizadas pela aplicação dependem dos serviços que serão executados. O exemplo abaixo reúne as configurações presentes no projeto; preencha os valores conforme o seu ambiente.

```dotenv
# Aplicação
PORT=3000

# PostgreSQL
DATABASE_URL=

# JWT
JWT_SECRET=

# SMTP
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

# RabbitMQ
RABBITMQ_URL=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_REDIRECT_URL=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URL=

# Redis
REDIS_URL=redis://localhost:6379

# CSRF
CSRF_SECRET=

# Melhor Envio
DELIVERY_ACCESS_TOKEN=
DELIVERY_URL=
DELIVERY_CART_URL=
DELIVERY_CHECKOUT_URL=
DELIVERY_USER_AGENT=

# Melhor Envio - Sandbox
DELIVERY_SANDBOX_ACCESS_TOKEN=
DELIVERY_SANDBOX_URL=
DELIVERY_SANDBOX_CART_URL=
DELIVERY_SANDBOX_CHECKOUT_URL=
```

**Importante:**

- Dentro do Docker Compose, a API deve acessar o Redis pelo nome do serviço, como `redis://redis:6379`, e não por `localhost`.
- `DATABASE_URL` deve apontar para um banco PostgreSQL acessível pela aplicação.
- `CSRF_SECRET`, `JWT_SECRET` e as credenciais de serviços externos devem ser secretos fortes e exclusivos por ambiente.
- `STRIPE_WEBHOOK_SECRET` deve corresponder ao endpoint de webhook configurado no Stripe.
- Configure as URLs e credenciais do Melhor Envio de acordo com o ambiente de testes ou produção.
- Nunca publique o arquivo `.env` ou credenciais reais no repositório.

## 🐳 Executando com Docker

O projeto possui `Dockerfile` e `docker-compose.yml` para executar a API e os serviços de infraestrutura configurados no Compose.

Para iniciar os serviços:

```bash
docker compose up -d --build
```

Para acompanhar os logs da API:

```bash
docker compose logs -f api
```

Para acessar a aplicação:

```text
http://localhost:3000
```

O Redis é executado em um serviço separado e utiliza volume persistente. O Redis Insight também está disponível na configuração para inspeção dos dados do Redis:

```text
http://localhost:5540
```

Para encerrar os serviços:

```bash
docker compose down
```

O comando acima preserva os volumes nomeados. Para remover também os dados persistidos, seria necessário remover explicitamente os volumes; faça isso somente quando desejar apagar esses dados.

## 📚 Documentação da API

A documentação interativa é disponibilizada pelo Swagger:

```text
http://localhost:3000/api
```

A API utiliza versionamento de rotas por URI, com o prefixo `/v1`.

Pelo Swagger é possível consultar os endpoints, parâmetros, DTOs, códigos de resposta e requisitos de autenticação, além de executar requisições diretamente pela interface.

## 🔑 Autenticação

A API utiliza JWT para identificar usuários autenticados. O token é armazenado em um cookie chamado:

```text
access_token
```

As rotas protegidas utilizam guards de autenticação para validar a identidade do usuário. O projeto também documenta autenticação por Bearer Token no Swagger.

O fluxo de autenticação inclui cadastro, login, logout, consulta do usuário autenticado, login com Google OAuth e operações de recuperação e alteração de senha.

A autorização deve ser respeitada em cada recurso: um usuário autenticado não deve conseguir acessar ou modificar dados de outro usuário sem permissão.

## 🔌 Endpoints

As rotas utilizam o prefixo de versão `/v1`. Os principais grupos de recursos são:

| Recurso | Prefixo | Operações |
|---|---|---|
| Autenticação | `/v1/auth` | Cadastro, login, logout, usuário autenticado e gerenciamento de senha |
| Usuários | `/v1/users` | Gerenciamento de usuários |
| Empresas | `/v1/companies` | Gerenciamento de empresas vendedoras |
| Produtos | `/v1/products` | Consulta e gerenciamento de produtos |
| Categorias | `/v1/categories` | Consulta e gerenciamento de categorias |
| Endereços | `/v1/addresses` | Cadastro, consulta, atualização e definição de endereço padrão |
| Carrinho | `/v1/carts` | Consulta e gerenciamento do carrinho |
| Pedidos | `/v1/orders` | Consulta, criação e gerenciamento de pedidos |
| Pagamentos | `/v1/payments` | Operações relacionadas a pagamentos e webhooks |

Os prefixos acima representam os grupos de recursos; consulte o Swagger para os métodos HTTP, parâmetros e rotas exatas de cada controller.

### Exemplos de rotas de autenticação

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/v1/auth/sign-up` | Cadastra um usuário |
| `POST` | `/v1/auth/sign-in` | Autentica um usuário |
| `GET` | `/v1/auth/sign-out` | Encerra a sessão |
| `GET` | `/v1/auth/me` | Consulta o usuário autenticado |
| `GET` | `/v1/auth/google/login` | Inicia o fluxo OAuth do Google |
| `GET` | `/v1/auth/google/callback` | Processa o retorno do OAuth |
| `POST` | `/v1/auth/forgot-password` | Solicita recuperação de senha |
| `POST` | `/v1/auth/reset-password` | Redefine a senha |
| `POST` | `/v1/auth/change-password` | Altera a senha do usuário autenticado |

## 🛒 Pedidos e pagamentos

O processo de checkout integra as informações do carrinho, o endereço selecionado, os produtos e o serviço de entrega.

O fluxo geral é:

1. O usuário mantém os itens no carrinho.
2. A aplicação valida o carrinho e o endereço de entrega.
3. A API calcula as opções de frete disponíveis.
4. O usuário seleciona o serviço de entrega.
5. A API calcula o subtotal, o frete e o total do pedido.
6. O pedido e o pagamento são registrados no PostgreSQL.
7. A API cria uma sessão de checkout no Stripe e disponibiliza a URL de pagamento.
8. O Stripe envia eventos de webhook para comunicar o resultado do pagamento.
9. A aplicação atualiza os status de pagamento e pedido e inicia o processo de contratação do frete.

### Idempotência

O fluxo de criação do pedido possui mecanismos de idempotência persistidos no banco de dados, incluindo uma chave associada ao usuário, hash dos parâmetros da requisição e restrições únicas.

O objetivo é evitar que repetições ou requisições concorrentes criem pedidos duplicados. A integração com Stripe também utiliza uma chave de idempotência baseada no pedido para reduzir a duplicação de sessões de checkout.

## 🔌 Integrações e mensageria

### Stripe

A integração com Stripe é responsável por criar sessões de checkout, armazenar os identificadores da transação e processar eventos de webhook relacionados ao pagamento.

O status do pagamento é persistido na aplicação, permitindo relacionar a transação ao pedido correspondente.

### Melhor Envio

A integração com Melhor Envio permite consultar opções de frete com base no CEP de origem, CEP de destino e características dos produtos, como peso e dimensões.

Após a confirmação do pagamento, a aplicação pode criar e encaminhar a contratação do envio conforme o serviço selecionado.

### RabbitMQ e envio de e-mails

O RabbitMQ é utilizado para comunicação assíncrona com o serviço responsável pelo envio de e-mails. Isso permite desacoplar o processamento de mensagens das requisições HTTP.

O projeto utiliza configuração de microserviço com fila durável e credenciais SMTP para envio de mensagens.

### Cloudinary

O Cloudinary é utilizado como serviço externo para armazenamento de arquivos e imagens, evitando que os arquivos precisem ser armazenados diretamente no banco de dados relacional.

### Google OAuth

O fluxo OAuth do Google permite iniciar a autenticação externa e processar o callback para autenticar o usuário na aplicação.

## ⚡ Cache e desempenho

A aplicação utiliza Redis para armazenar resultados de determinadas consultas e reduzir acessos repetidos ao PostgreSQL e a serviços externos.

As funcionalidades de consulta compatíveis também utilizam paginação, ordenação e filtros para controlar o volume de dados retornado.

A estratégia de cache depende do recurso consultado: dados que mudam frequentemente, como estados de pagamento e operações de checkout, exigem cuidados adicionais para evitar respostas desatualizadas.

## 🛡️ Segurança

A API utiliza mecanismos complementares de proteção:

- **CORS:** restringe as origens autorizadas a acessar as respostas pelo navegador.
- **CSRF:** utiliza `csrf-csrf` para validar tokens contra requisições forjadas em fluxos baseados em cookies.
- **Rate limiting:** utiliza `@nestjs/throttler` para limitar a frequência de requisições.
- **Helmet:** configura cabeçalhos HTTP relacionados à segurança.
- **JWT e guards:** protegem rotas que exigem autenticação.
- **Validação de dados:** utiliza DTOs e `ValidationPipe` para validar entradas.
- **Serialização:** controla quais propriedades são expostas nas respostas.
- **Segredos em variáveis de ambiente:** mantém credenciais fora do código-fonte.

As configurações finais de segurança devem ser ajustadas para o ambiente de produção, incluindo HTTPS, origens CORS autorizadas, segredos fortes, confiança em proxies e configuração dos cookies.

## 🗄️ Banco de dados

O PostgreSQL armazena as entidades e relacionamentos da aplicação. O Prisma ORM é utilizado para consultas, atualizações, transações e aplicação de migrações.

Entre as entidades principais estão:

- `User`: usuários, credenciais e perfil.
- `Address`: endereços vinculados aos usuários.
- `Company`: empresas responsáveis por produtos e envios.
- `Product`: catálogo de produtos.
- `Category`: categorização de produtos.
- `Cart` e `CartItem`: carrinho e seus itens.
- `Order` e `OrderItem`: pedidos e itens registrados na compra.
- `Payment`: status, valor e informações da transação.
- `IdempotencyKey`: chave, hash da requisição e associação ao pedido.

A aplicação utiliza relacionamentos e restrições únicas para preservar a integridade dos dados. Algumas entidades também possuem `deletedAt` para representar exclusão lógica.

## 🧪 Testes

O projeto utiliza Jest para testes automatizados e inclui scripts para testes unitários e testes end-to-end.

Executar os testes unitários:

```bash
npm test
```

Executar em modo de observação:

```bash
npm run test:watch
```

Gerar relatório de cobertura:

```bash
npm run test:cov
```

Executar testes end-to-end:

```bash
npm run test:e2e
```

Os testes devem ser executados com as dependências e variáveis de ambiente necessárias ao cenário testado.

---

## 👨‍💻 Autor

**Wendel Tavares**

Desenvolvedor Full Stack com foco em backend, APIs REST, NestJS, TypeScript e PostgreSQL.
