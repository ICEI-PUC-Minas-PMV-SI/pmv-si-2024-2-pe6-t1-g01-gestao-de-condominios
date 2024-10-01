# APIs e Web Services

O projeto "Zeus - Gestão Condominial" é um aplicativo voltado para melhorar a comunicação entre a administração do condomínio e os moradores. Ele busca automatizar avisos importantes, como uso de máscaras, boletos em atraso, notificações de visitas e reservas de espaços, evitando atrasos ou falta de conhecimento. Com isso, o aplicativo centraliza informações essenciais, permitindo a gestão de moradores, funcionários e visitantes, além de facilitar a comunicação entre as partes, otimizando o funcionamento e o controle dentro do condomínio.

## Objetivos da API

### Objetivo Geral
Facilitar a comunicação entre o síndico e os residentes do condomínio, proporcionando um canal eficiente e automatizado de troca de informações.

### Objetivos Específicos

1. Centralizar Informações de Gestão (Principal):

    • Disponibilizar e gerenciar atas de reuniões, estatutos e balancetes financeiros para  fácil acesso dos moradores e administração.

2. Facilitar a Comunicação Entre Administração e Moradores (Principal):

    • Criar endpoints que permitam o envio e recebimento de comunicados e notificações entre o síndico e os residentes, de forma automatizada e sem burocracia.

3. Controle de Cadastro (Principal):

    • Gerenciar o cadastro de moradores, funcionários e visitantes, possibilitando atualizações em tempo real e integração com os sistemas de controle de acesso do condomínio.

4. Gerenciamento de Entradas e Saídas (Secundário):

    • Implementar funcionalidades para registrar a entrada e saída de visitantes, integrando com os sistemas de portaria para garantir maior segurança e controle no condomínio.

Esses objetivos buscam centralizar as operações essenciais para o bom funcionamento do condomínio, otimizando a comunicação e o gerenciamento de pessoas e informações.

## Arquitetura

As APIs foram desenvolvidas no padrão RESTful separado pelos seguintes módulos:
- Auth
- User
- Apartment
- Resident
- Visitor
- Employee
- Document
- Feed
- Visit

## Modelagem da Aplicação

Nossa estrutura de dados se constitui das entidades:
- user
- visitor
- visit
- feed
- document
- apartment

Os diagramas de modelagem segue nas imagens abaixo:

![user](./img/modelagem_user.jpeg)
![visitor](./img/modelagem_visitor.jpeg)
![visit](./img/modelagem_visit.jpeg)
![feed](./img/modelagem_feed.jpeg)
![document](./img/modelagem_document.jpeg)
![apartment](./img/modelagem_apartment.jpeg)

## Fluxo de Dados

[Diagrama ou descrição do fluxo de dados na aplicação.]

## Requisitos Funcionais

1. O sistema deve permitir o gerenciamento de dados do morador.

2. O sistema deve permitir o gerenciamento de dados de apartamento.

3. O sistema deve permitir o gerenciamento de dados de usuário.

4. O sistema deve permitir a autenticação de usuários.

## Requisitos Não Funcionais

1. Disponibilidade: O sistema deve ficar online 24H por dia, 7 dias na semana.

2. Usabilidade: O sistema deve permitir que complete uma tarefa de cadastro em no máximo 1 minuto.

3. Segurança: O produto deve restringir o acesso por meio de senhas individuais para o usuário.

## Tecnologias Utilizadas

### Aplicação Web Front-end

A aplicação web front-end será desenvolvida utilizando o framework JavaScript Vue.js, em conjunto com a biblioteca de componentes Vuetify.

### Back-end

O backend será desenvolvidos utilizando Nest.js, um ambiente multiplataforma para JavaScript e MySQL como banco de dados relacional e Minio para gerenciamento de arquivos.

## API Endpoints

Segue a lista dos endpoints do sistema:

![Auth_signup](./img/Auth_signup.jpeg)
![Auth_signin](./img/Auth_signin.jpeg)
![Auth_signout](./img/Auth_signout.jpeg)
![Auth_whoami](./img/Auth_whoami.jpeg)
![User_findById](./img/User_findById.jpeg)
![User_findByEmail](./img/User_findByEmail.jpeg)
![User_update](./img/User_update.jpeg)
![User_delete](./img/User_delete.jpeg)
![Apartment_create](./img/Apartment_create.jpeg)
![Apartment_findOne](./img/Apartment_findOne.jpeg)
![Apartmente_findAll](./img/Apartmente_findAll.jpeg)
![Apartment_update](./img/Apartment_update.jpeg)
![Apartment_delete](./img/Apartment_delete.jpeg)
![Resident_create](./img/Resident_create.jpeg)
![Resident_findOne](./img/Resident_findOne.jpeg)
![Resident_findAll](./img/Resident_findAll.jpeg)
![Resident_update](./img/Resident_update.jpeg)
![Resident_delete](./img/Resident_delete.jpeg)
![Visitor_create](./img/Visitor_create.jpeg)
![Visitor_findOne](./img/Visitor_findOne.jpeg)
![Visitor_findAll](./img/Visitor_findAll.jpeg)
![Visitor_update](./img/Visitor_update.jpeg)
![Visitor_delete](./img/Visitor_delete.jpeg)
![Employee_create](./img/Employee_create.jpeg)
![Employee_findOne](./img/Employee_findOne.jpeg)
![Employee_findAll](./img/Employee_findAll.jpeg)
![Employee_update](./img/Employee_update.jpeg)
![Employee_delete](./img/Employee_delete.jpeg)
![Document_create](./img/Document_create.jpeg)
![Document_findOne](./img/Document_findOne.jpeg)
![Document_findAll](./img/Document_findAll.jpeg)
![Document_update](./img/Document_update.jpeg)
![Document_delete](./img/Document_delete.jpeg)
![Feed_create](./img/Feed_create.jpeg)
![Feed_findOne](./img/Feed_findOne.jpeg)
![Feed_findAll](./img/Feed_findAll.jpeg)
![Feed_update](./img/Feed_update.jpeg)
![Feed_delete](./img/Feed_delete.jpeg)
![Visit_create](./img/Visit_create.jpeg)
![Visit_findOne](./img/Visit_findOne.jpeg)
![Visit_findAll](./img/Visit_findAll.jpeg)
![Visit_update](./img/Visit_update.jpeg)
![Visit_delete](./img/Visit_delete.jpeg)


## Considerações de Segurança

Modelo de token utilizado na API é o JSON Web Token (JWT), ele é um padrão de segurança amplamente utilizado para autenticação em APIs. Ele permite que informações sejam transmitidas de maneira segura entre partes por meio de um token assinado digitalmente. O token é composto por três partes: header (cabeçalho), payload (dados) e signature (assinatura). A assinatura garante a integridade dos dados e autentica a identidade do usuário. JWT é usado principalmente para controlar o acesso a recursos protegidos, validando a autenticação e autorização de forma rápida e eficiente, sem a necessidade de armazenar o estado do usuário no servidor.

## Implantação

[Instruções para implantar a aplicação em um ambiente de produção.]

1. Defina os requisitos de hardware e software necessários para implantar a aplicação em um ambiente de produção.
2. Escolha uma plataforma de hospedagem adequada, como um provedor de nuvem ou um servidor dedicado.
3. Configure o ambiente de implantação, incluindo a instalação de dependências e configuração de variáveis de ambiente.
4. Faça o deploy da aplicação no ambiente escolhido, seguindo as instruções específicas da plataforma de hospedagem.
5. Realize testes para garantir que a aplicação esteja funcionando corretamente no ambiente de produção.

## Testes

Os únicos testes permitidos no sistema serão os manuais e de regressão através dos endpoints já mapeado presentes na Collection dentro do projeto. Para isso podem ser usado ferramentas como Postman, Insomnia, BrunoAPI, entre outros.

Collection: <a href="../sistema/zeus-back/Collection_APIs.json"> Collection_APIs.json</a>

# Referências

Documentação levantada no projeto nosso em semestres anteriores conforme o link abaixo:

<a href="https://docs.google.com/document/d/1DjpDkHZf0630EwuFNUmLxaGB0QGOzr13_3GeTDPsa5U/edit?usp=sharing"> Documentação do Projeto</a>
