## Requisitos
### Backend (Node.js em Vercel functions):

- [x] Criar uma API RESTful para operações CRUD (Create, Read, Update, Delete) de produtos.
- [x] Utilizar Express.js para roteamento.
- [x] Utilizar Sequelize para interagir com o banco de dados.
- [x] Utilizar o Postgres do Vercel como banco de dados.
- [x] Expor uma rota exclusiva para permitir que clientes externos da aplicação consumam os produtos; essas rotas devem utilizar algum tipo de autorização.
- [x] Expor uma rota exclusiva para permitir que clientes externos da aplicação insiram produtos; essas rotas devem utilizar algum tipo de autorização. 
- [x] Expor serviços externos utilizando Swagger
- [x] Crie um procedimento que permita a eliminação de todos os produtos em segundo plano.
- [x] Criar um procedimento que permita carregar 50 produtos de teste.

### Frontend (React no Vercel):

- [x] Criar formulário para registro e login.
- [x] Criar uma interface de usuário para mostrar os produtos e permitir que o usuário faça operações CRUD disponíveis apenas para usuários que fizeram login.
- [x] Implementar rotas para navegar entre as diferentes visualizações (lista de produtos, adicionar produto, editar produto, logs).
- [x] Utilizar serviços para consumir a API RESTful criada no backend.
- [x] Ao clicar em “Carregar produtos de teste” deve adicionar 50 produtos.
- [x] Ao clicar em “Eliminar todos os produtos”, executar o procedimento de eliminação e mostrar uma barra de progresso de 0 a 100% que se atualize em tempo real.
- [x] Mostrar uma lista dos produtos eliminados em uma tela chamada logs dentro do site.

### Requerido

- [x] A aplicação deve ter uma página para login e registro. (Prover um usuário de teste)
- [x] A aplicação deve ter uma página principal onde todos os produtos disponíveis e seus detalhes são mostrados; o acesso a esta página é apenas possível com o login do usuário.
- [x] Deve ser possível adicionar novos produtos.
- [x] Deve ser possível editar os produtos existentes.
- [x] Deve ser possível excluir produtos.
- [ ] Adicionar funcionalidades de pesquisa e filtragem de produtos.
- [x] Deve ser possível listar os produtos das APIs externas.
- [x] Deve ter um botão para poder carregar 50 produtos.
- [x] Deve ter um botão para poder eliminar todos os produtos do site.
- [x] Deve ter uma barra de progresso mostrando o estado da eliminação de 0 a 100%.
- [x] Deve ter uma tela chamada logs onde se pode ver os produtos que foram eliminados.
