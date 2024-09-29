# ZEUS - GESTÃO CONDOMINIAL

`CURSO: Sistemas de Informação`

`DISCIPLINA: Projeto - Arquitetura de Sistemas Distribuídos`

`SEMESTRE: 6º`

RESUMO: "Zeus - Gestão Condominial" é um aplicativo que tem como objetivo automatizar os processos cotidianos das rotinas de um condomínio. Assim, o dia a dia do síndico e moradores torna-se mais fácil, já que o sistema permite registrar dados dos moradores e visitantes, fornece informações de avisos gerais, como também visualizar boletos e multas, sem a necessidade de procurar informações em meio à papelada, ou até mesmo nas caixas dos apartamentos. Além de contar com muitos moradores, um condomínio é um lugar repleto de desafios, que exige a busca constante por soluções. Essa atividade pode ser comparada ao gerenciamento de uma pequena cidade. Desta forma, é possível obter toda a gestão em um aplicativo 100% online e isto resultará em uma ótima administração.

## Integrantes

* Adriano Borges Martins
* Artur Bani Lacerda
* Carlos Eduardo Alves de Paula
* Filipe Augusto Silveira e Silva
* Sandro Antônio Souza
* Vitória Teixeira Alves de Souza

## Orientador

* Kleber Souza

# Planejamento

| Etapa         | Atividades |
|  :----:   | ----------- |
| ETAPA 1         |[Documentação de Contexto](docs/contexto.md) <br> |
| ETAPA 2         |[Planejar, desenvolver e gerenciar APIs e Web Services](docs/backend-apis.md) <br> |
| ETAPA 3         |[Planejar, desenvolver e gerenciar uma aplicação Web](docs/frontend-web.md) |
| ETAPA 4        |[Planejar, desenvolver e gerenciar uma aplicação Móvel](docs/frontend-mobile.md) <br>  |
| ETAPA 5         | [Apresentação](presentation/README.md) |
## Instruções de utilização

O sistema é feito em Nest.js no back-end e Vue.js 3 no front-end. Ele pode ser configurados em servidores em núvem ou máquina local utilizando docker na versão 24.0.2 e docker-compose na versão 2.19.0.

Dentro da pasta do sistema/zeus-back pode ser iniciado rodando o comando: `docker-compose up --build`

# Código

<li><a href="sistema/zeus-back"> Código Fonte Back-End</a></li>
<li><a href="sistema/zeus-front"> Código Fonte Front-End</a></li>

# Apresentação

<li><a href="presentation/README.md"> Apresentação da solução</a></li>

# Requisitos para rodar o projeto

- Ter o docker instalado

# Rodar o projeto

`docker-compose up --build`
