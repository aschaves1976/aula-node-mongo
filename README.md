# NodeJS com MongoDB
Este material faz parte dos meus estudos de NodeJS com o banco de dados MongoDB.

**Fonte:**

 - *Curso de NodeJS com MongoDB do Luiz Tools ([https://www.luiztools.com.br/](https://www.luiztools.com.br/))*
 - *Express ([https://expressjs.com/en/starter/generator.html](https://expressjs.com/en/starter/generator.html))*

## Passo 01
 Para iniciar o projeto, criar o esqueleto da aplicação utilizamos o comando **express**
Ex:. express -ejs --git **nome-do-projeto**

 - **Express** é o comando utilizado no terminal para criar a aplicação;
 - **ejs** é a opção utilizada para que a aplicação suporte páginas em HTML;
 - **git** opçaõ utilizada para criar o gitignore e deixar a aplicação já preparada para versionamentos.

Em seguida entrar no diretório do projeto e executar o comando **npm install** para que as dependências do projeto sejão baixadas. Após as dependências do express serem baixadas instalar a dependência do MongoDB - **npm install mongodb.**

O arquivo **database/dbmongo.js** está sendo utilizado para centralizar todo o acesso a dados. Um módulo somente para lidar com banco de dados.
Dentro deste arquivo está criado um objeto para acessar a biblioteca do MongoClient. Apartir deste acesso será possível se conectar ao banco de dados criado (**aula_mongo01**) no MongoDB.
A função **getClientes** lista todos os registros existentes na coleção **clientes**, criada no banco de dados **aula_mongo01**.

## Dica
- **WebApi** - Mesmo que não tenha retorno gráfico para o usuário final,
sempre que possível mantenha a view engine no app.js. Assim, caso você precise de uma página HTML, para por exemplo, fazer uma documentação, o setup da view engine já existe no seu módulo.
