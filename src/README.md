# Instruções de utilização

## Instalação do Sistema

O sistema é feito em Nest.js no back-end e Vue.js 3 no front-end. Ele pode ser configurados em servidores em núvem ou máquina local utilizando docker na versão 24.0.2 e docker-compose na versão 2.19.0.

Pode ser iniciado rodando o comando: `docker-compose up --build`

## Histórico de versões

### [0.5.0] - 29/09/2024
#### Back-End configurado com Docker
- A primeira versão consiste em todas as APIs disponibilizadas pelo nosso back-end em Nest.js rodando na porta 3000. Mais detalhes na nossa Collection disponível em:
<a href="../sistema/zeus-back/Collection_APIs.json"> Collection APIs - ZEUS</a>

- Usa MySql para banco de dados rodando na porta 3309.

- Usa Minio para gerenciamento de arquivos rodando na porta 9001.