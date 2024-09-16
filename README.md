
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
   cd v4
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd v4
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
    API_KEY=your_secret_api_key

    #OPTIONAL
    EMAIL_HOST=sandbox.smtp.mailtrap.io
    EMAIL_PORT=2525
    EMAIL_USER=e085e74d1d4ddc
    EMAIL_PASS=ad7b299ca7c212
    
    ALERT_EMAIL_TO=teste@email.com
    ALERT_EMAIL_FROM=teste@email.com

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

## Instruções Adicionais

### 1. Collection do Postman

Para facilitar o teste dos endpoints da API, uma collection do Postman está disponível no arquivo `V4.postman_collection.json` na raiz do projeto. Siga os passos abaixo para usá-la:

1. Abra o Postman.
2. Vá em **File > Import**.
3. Selecione o arquivo `V4.postman_collection.json` que está localizado na raiz do projeto.
4. A collection será carregada no Postman, contendo todos os endpoints da API para teste.

A collection contém os seguintes endpoints:

- **GET /products**: Lista todos os produtos.
- **GET /products/:code**: Obtém informações de um produto específico.
- **PUT /products/:code**: Atualiza informações de um produto.
- **DELETE /products/:code**: Muda o status do produto para `trash`.

Ou acesse http://localhost:3000/api-docs para visualizar a documentação da API.

### 2. Configuração do Agendamento do CRON

O projeto inclui um cron job para realizar a importação dos dados mais recentes do Open Food Facts. O cron está configurado para rodar diariamente à meia-noite. A lógica do cron está localizada no arquivo `src/infrastructure/cron/importProductsCron.ts`.

#### Alterar o Agendamento do CRON

Para alterar o agendamento, edite diretamente o arquivo `src/infrastructure/cron/importProductsCron.ts` e modifique o padrão do cron de acordo com sua necessidade. O código atual é o seguinte:

```typescript
import cron from 'node-cron';

const task = cron.schedule('0 0 * * *', async () => {
  console.log('Starting daily import...');
  try {
    await importService.importData();
    lastCronRun = new Date();
    console.log('Daily import completed successfully.');
  } catch (error) {
    console.error('Daily import failed:', error);
  }
});

task.start();
```

O valor **`'0 0 * * *'`** significa que o cron job será executado todos os dias à meia-noite. Para alterar o horário ou frequência, basta modificar essa string seguindo os padrões do cron.

Exemplos:
- **`'*/5 * * * *'`**: Executa a cada 5 minutos.
- **`'0 12 * * *'`**: Executa todos os dias ao meio-dia.

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
