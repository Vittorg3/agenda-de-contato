# Agenda para contatos 💻

## 🚧 Status: Concluído.

## Descrição do projeto
__Gerenciar uma lista de contatos, podendo incluir, editar, excluir e buscar por nome e/ou email.__

## 🔧 Tecnologias
### foram usados neste projeto:
✔️ **Node JS** | **version: 14.16.0**\
✔️ **Dotenv** | **version: 10.0.0**\
✔️ **Express** | **version: 4.17.1**\
✔️ **Mysql2** | **version: 2.2.5**\
✔️ **Sequelize** | **version: 6.6.5**\
✔️ **Cors** | **version: 2.8.5**

__É recomendado usar as versões utilizadas no projeto ou versões posteriores as mesmas, para evitar possíveis bugs__.

## Instruções para instalação:
__Para instalar todas as dependências do projeto use o seguinte comando__:
<pre>
   npm install ou yarn install
</pre>

__Após instalar as dependências, chegou a hora de configurar as variáveis de ambiente de acordo com o seu ambiente.__:

Procure pelo arquivo **.env** e abra ele para configurar as variáveis.

![Arquivo dotenv](https://i.ibb.co/tBKYpTX/dotenv.png "Arquivo .dotenv")

Quando abrir o arquivo, você encontrará as seguintes **variáveis:**

![Arquivo dotenv](https://i.ibb.co/SVNjXK9/dotenv-Opened.png "Arquivo .dotenv")

__Explicando as variáveis:__

**PORT:** Escolha a porta do servidor.\
**DATABASE:** Digite o **nome do banco** que a **API** irá criar as tabelas ao se conectar.\
**DBUSERNAME:** Digite **o nome do usuário do banco de dados**.\
**DBPASSWORD:** Digite **a senha do usuário do banco de dados**.\
**HOST:** Digite **o host do banco**.

__Após configurar corretamente as variáveis, a **API** já está pronta para se comunicar com o banco quando for preciso.__

## Manual para uso correto da API: 

### Registrar novo contato:

**ENDPOINT**: => __/create/contact/ (requisição do tipo **POST**)__\

Deve ser enviado os **seguintes campos:**

![Arquivo req](https://i.ibb.co/58F8FFc/createpost.png "registrar contato")

**Note** que o campo **PHONE** deve ser enviado em forma de **array**. Caso queira enviar mais números, apenas adicione no **array**.

### Registrar novo número para o contato:

**ENDPOINT**: => __/create/contact/(idContato)/phone/ (requisição do tipo **POST**)__\

Deve ser enviado os **seguintes campos:**

![Arquivo req](https://i.ibb.co/3s2PLFx/createpost.png "registrar novo número")

**Note** que agora o campo **PHONE** não precisa mais ser enviado em forma de array, pois só poderá adicionar um número por vez.

### Buscar os contatos:
Caso queira **listar** todos os contatos registrados, utilize o seguinte **endpoint:**

**ENDPOINT**: => __/contacts/ (requisição do tipo **GET**)__

Caso queira **buscar** por **nome** e/ou **email**, basta passar as querys no mesmo **endpoint:**

**ENDPOINT**: => __/contacts?name=(nome)&email=(email) (requisição do tipo **GET**)__


### Atualizar Contato:

**ENDPOINT**: => __/update/contact/(idContato)/ (requisição do tipo **PUT**)__\

**Mande os campos que devem ser atualizados, como na imagem representada:**

![Arquivo req](https://i.ibb.co/vjJPpXm/createpost.png "Atualizar contato")

⚠️**ATENÇÃO:** Caso queira **atualizar o número do contato** também, deve ser informado o **ID** do número; como representado na **imagem acima**.


### Excluir contato ou apenas o número:

**ENDPOINT**: => __/delete/contact/(idContato)/ (requisição do tipo **DELETE**)__\

Caso queira **excluir** apenas algum **número do contato**, apenas passe uma query para o mesmo **endpoint**:

**ENDPOINT**: => __/delete/contact/(idContato)/?phone=(idTelefone) (requisição do tipo **DELETE**)__\
