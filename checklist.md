## Requisitos
### Backend (Node.js em Vercel functions):

- [ ] Criar uma API RESTful para operações CRUD (Create, Read, Update, Delete) de produtos.
- [ ] Utilizar Express.js para roteamento.
- [ ] Utilizar Sequelize para interagir com o banco de dados.
- [ ] Utilizar o Postgres do Vercel como banco de dados.
- [ ] Expor uma rota exclusiva para permitir que clientes externos da aplicação consumam os produtos; essas rotas devem utilizar algum tipo de autorização.
- [ ] Expor uma rota exclusiva para permitir que clientes externos da aplicação insiram produtos; essas rotas devem utilizar algum tipo de autorização. 
- [ ] Expor serviços externos utilizando Swagger
- [ ] Crie um procedimento que permita a eliminação de todos os produtos em segundo plano.
- [ ] Criar um procedimento que permita carregar 50 produtos de teste.

### Frontend (React no Vercel):

- [ ] Criar formulário para registro e login.
- [ ] Criar uma interface de usuário para mostrar os produtos e permitir que o usuário faça operações CRUD disponíveis apenas para usuários que fizeram login.
- [ ] Implementar rotas para navegar entre as diferentes visualizações (lista de produtos, adicionar produto, editar produto, logs).
- [ ] Utilizar serviços para consumir a API RESTful criada no backend.
- [ ] Ao clicar em “Carregar produtos de teste” deve adicionar 50 produtos.
- [ ] Ao clicar em “Eliminar todos os produtos”, executar o procedimento de eliminação e mostrar uma barra de progresso de 0 a 100% que se atualize em tempo real.
- [ ] Mostrar uma lista dos produtos eliminados em uma tela chamada logs dentro do site.

### Requerido

- [ ] A aplicação deve ter uma página para login e registro. (Prover um usuário de teste)
- [ ] A aplicação deve ter uma página principal onde todos os produtos disponíveis e seus detalhes são mostrados; o acesso a esta página é apenas possível com o login do usuário.
- [ ] Deve ser possível adicionar novos produtos.
- [ ] Deve ser possível editar os produtos existentes.
- [ ] Deve ser possível excluir produtos.
- [ ] Adicionar funcionalidades de pesquisa e filtragem de produtos.
- [ ] Deve ser possível listar os produtos das APIs externas.
- [ ] Deve ter um botão para poder carregar 50 produtos.
- [ ] Deve ter um botão para poder eliminar todos os produtos do site.
- [ ] Deve ter uma barra de progresso mostrando o estado da eliminação de 0 a 100%.
- [ ] Deve ter uma tela chamada logs onde se pode ver os produtos que foram eliminados.
