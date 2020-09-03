# i-want-to-invest

<h3> Apresentação </h3>
<p>O I Want to Invest é uma API desenvolvida especialmente para assessores de investimentos. A interface fornece ao assessor o controle sobre seus clientes e investimentos através de um sistema autenticado. </p>

<h3> Tecnologias e recursos utilizados </h3>

- [Express](https://expressjs.com/pt-br/)
- [MySQL](https://www.mysql.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TSyringe](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)

<h3> Configurando o banco de dados </h3>
<p>Esta aplicação utiliza o MySQL como banco de dandos, então tenha certeza de tê-lo rodando em sua máquina e crie um novo schema com o nome de sua preferência: </p>

<h3> Iniciando o servidor </h3>
<p>Com o Yarn instalado, siga os seguintes passos: </p>

1. Clone o repositório com o comando `git clone https://github.com/marcelo-amorim/i-want-to-invest.git`.
2. No diretório do repositório clonado, execute o comando `yarn` para a instalação das dependências.
3. Copie o arquivo `.env.example` e renomeie-o como `.env.example` configurando uma chave segura para a sua aplicação.
> Você pode utilizar o [MD5 Hash Generator](https://www.md5hashgenerator.com/) para gerar uma nova hash segura.
4. Configure a as credenciais de acesso ao banco de dados no arquivo **ormconfig.json** utilizando o nome do schema criado anteriormente.
5. Utilize o comando `yarn typeorm migration:run` para criação das tabelas.
6. Finalmente, execute `yarn dev:server` para iniciar o servidor.

<br>





