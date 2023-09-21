# IntegracaoVenda_FrontEnd

Single page application feita para o Front-end do sprint 2 e adaptada para o sprint 3 da Pós-graducação em Desenvolvimento FullStack - PUC-RJ

Essa aplicação foi escrita usando React

Trata-se de uma aplicação voltada para o encaminhamento de pedidos entre laboratórios da industria farmacêutica e drogarias para o atendimento de pacientes que necessitam de produtos especializados e/ou de alto custo.

## Link do protótipo
A prototipagem da interface foi feita com o uso da ferramenta Figma e está disponível para visualização [aqui](https://www.figma.com/file/UT1xbZtPxRangUXBnSY3rB/Sprint2?type=design&node-id=0%3A1&mode=design&t=BdMemTHVmsWOurm1-1).

## Recursos externos
Nessa aplicação é usada a API [BrasilAPI](https://brasilapi.com.br/docs#). Mais especificamente o endPoint cep V1. Esse recurso é usado para validar o CEP do cliente, usado para calcular o prazo de entrega de um produto.

## Dependências

As dependências do programa estão contidas nos arquivos package.json e package-lock.json e podem ser instaladas com o comando 

    npm install

## Execução
Para iniciar o serviço em [http://localhost:3000](http://localhost:3000) é necessário executar o comando:

    npm start

Ambos os comandos de instalação de dependências e execução devem ser executados no diretório raiz da aplicação.

## Docker

Construção da imagem Docker:

```
$ docker build -t frontend .
```
Execução do container:

```
$ docker run -p 3000:3000 frontend
```

Uma vez executando, para acessar a API, basta abrir o [http://localhost:3000/](http://localhost:3000/) no navegador.

---

## Sobre os dados
Nenhum dado presente representa uma venda real. Os dados foram gerados com o uso do ChatGPT para a atividade proposta no curso.

## OBS

Por se tratar de uma aplicação integrada com outros sistemas:

[IntegracaoVenda_FrontEnd](https://github.com/glgaspar/IntegracaoVenda_FrontEnd.git)

[IntegracaoVenda_BackEnd](https://github.com/glgaspar/IntegracaoVenda_BackEnd.git)

[Login_API](https://github.com/glgaspar/Login_API.git)

Os caminhos das APIs utilizadas estão disponíveis no arquivo .env. Caso algum dos outros serviços não seja executado da forma indicada, os caminhos das APIs podem ser editados diretamente neste arquivo.