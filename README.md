
# Backend Challenge 20230105

## Introdução

Este projeto consiste no desenvolvimento de uma API REST para gerenciar produtos alimentícios com base nos dados do Open Food Facts. A API foi projetada para suportar a equipe de nutricionistas da Fitness Foods LC, permitindo uma rápida revisão das informações nutricionais dos produtos. Além disso, um sistema CRON é configurado para realizar a importação dos dados mais recentes do Open Food Facts para o banco de dados todos os dias à meia-noite, garantindo que as informações estejam sempre atualizadas.

## Tecnologias Utilizadas

- **Linguagem:** TypeScript
- **Framework:** Node.js com Express
- **Banco de Dados:** MongoDB (utilizando MongoDB Atlas)
- **Design Patterns:** SOLID, DDD
- **Testes:** Unitários
- **Outros:** Docker

## Instalação e Uso

### Pré-requisitos

- Node.js (v18 ou superior)
- MongoDB Atlas (ou uma instância MongoDB local)
- Docker (opcional, para facilitar o deploy)

### Passos para Configuração

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/mfernandes95/v4
   cd backend-challenge-20230105
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd nome-do-projeto
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

   ou

   ```bash
   yarn install
   ```
4. Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:

   ```bash
    MONGODB_URI=<sua-uri-do-mongodb>
    PORT=3000
    CRON_SCHEDULE="0 0 * * *"  # Executa a importação diariamente à meia-noite
   ```

   ou

   ```bash
   yarn start
   ```

5. Inicie o servidor de desenvolvimento:

   ```bash
   npm start
   ```

   ou

   ```bash
   yarn start
   ```
6. Executar Testes:

   ``` bash
   npm test
   ```

7. Abra o navegador e acesse:

   ```
   http://localhost:3000
   ```

## Estrutura do Projeto

```plaintext
project-root/
├── src/
│   ├── application/
│   │   ├── use-cases/
│   │   │   ├── getProductUseCase.ts
│   │   │   └── ... (outros casos de uso)
│   │   ├── interfaces/
│   │   │   └── ... (interfaces de casos de uso)
│   ├── domain/
│   │   ├── entities/
│   │   │   └── productEntity.ts
│   │   ├── repositories/
│   │   │   └── productRepository.ts
│   │   └── types/
│   │       └── productTypes.ts
│   ├── infrastructure/
│   │   ├── repositories/
│   │   │   └── productRepositoryImpl.ts
│   │   ├── database/
│   │   │   └── ... (configuração e conexão com o banco de dados)
│   │   └── ... (outros serviços de infraestrutura)
│   ├── interfaces/
│   │   ├── controllers/
│   │   │   └── getProductController.ts
│   │   ├── routes/
│   │   │   └── productRoutes.ts
│   │   └── middleware/
│   │       └── ... (middleware, como autenticação)
│   ├── errors/
│   │   ├── productNotFoundError.ts
│   │   └── ... (outros erros personalizados)
│   ├── config/
│   │   └── ... (configurações gerais, como .env)
│   ├── server.ts
│   └── app.ts
├── tests/
│   ├── unit/
│   │   └── ... (testes unitários)
│   ├── integration/
│   │   └── ... (testes de integração)
│   └── ... (outros testes)
├── .env
├── tsconfig.json
├── package.json
└── README.md
```

## Endpoints da API

- **`GET /`**: Detalhes da API, incluindo:
  - Status da conexão com o banco de dados
  - Horário da última execução do CRON
  - Tempo online
  - Uso de memória

- **`PUT /products/:code`**: Atualiza informações de um produto.

- **`DELETE /products/:code`**: Muda o status do produto para `trash`.

- **`GET /products/:code`**: Obtém informações de um produto específico.

- **`GET /products`**: Lista todos os produtos com paginação.

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões para novas funcionalidades, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto é licenciado sob a licença XYZ - consulte o arquivo `LICENSE` para obter detalhes.

## Autor

Desenvolvido por Matheus Fernandes Pinheiro.
