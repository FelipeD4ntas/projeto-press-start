# Projeto Press Start 2.0 da Lyncas

## Primeira etapa
Na primeira etapa foi desenvolvido o dashboard da página de Boas-vindas incluindo sua responsividade, e como desafio proposto por nosso lider foi implementado uma navegação no estilo de SPA (Single Page Application), usando JavaScript puro.<br>

## Telas primeira etapa
* ##### Dashboard Boas-vindas

![telaDashboard](https://user-images.githubusercontent.com/85248692/213281490-ab855841-08d5-483a-b966-d9abd7be82d9.png)


* ##### Dashboard Boas-vindas (Responsivo)

![telaDashboardResponsivo](https://user-images.githubusercontent.com/85248692/213282021-66c065c7-047a-48d2-8050-45b30b8c9063.png)

## Segunda etapa
Na segunda etapa foi desenvolvido as páginas de listagem e cadastro de clientes.<br> 
Implementado as funções de deletar, editar e buscar clientes, e também as validações do formulário de cadastro.<br>

## Telas segunda etapa
* ##### Lista Clientes

![telaListaClientes](https://user-images.githubusercontent.com/85248692/213282069-e35eab6f-f7ec-4826-905b-7016e6187ce8.png)
![popupDeletarRegistro](https://user-images.githubusercontent.com/85248692/213282166-4d35c691-103b-4f98-b93d-dc7f9568df81.png)


* ##### Editar Cliente

![telaDetalhesListaClientesEditar](https://user-images.githubusercontent.com/85248692/213282588-48fb8fdc-5863-4b1f-bc22-7041a7a39b6a.png)
![popupClienteEditado](https://user-images.githubusercontent.com/85248692/213282649-6b6b243e-4944-4e2e-b7df-510f25f0277a.png)


* ##### Lista Clientes (Responsivo)

![telaListaClientesResponsivo](https://user-images.githubusercontent.com/85248692/213282708-baf70d43-cc3b-4933-a7e7-73ba03545bf2.png)


* ##### Detalhes Clientes (Responsivo)

![telaDetalhesListaClientesResponsivo](https://user-images.githubusercontent.com/85248692/213282773-90275339-21ad-4737-8ae7-2f6eef7ac0a9.png)


* ##### Editar Cliente (Responsivo)

![telaDetalhesListaClientesEditarResponsivo](https://user-images.githubusercontent.com/85248692/213282828-a1676012-be15-4dac-b376-8985f64765f8.png)


* ##### Cadastro Clientes

![telaCadastroClientes](https://user-images.githubusercontent.com/85248692/213282862-d46cf3dd-b756-4c95-9062-e845cee81980.png)
![popupClienteCadastrado](https://user-images.githubusercontent.com/85248692/213282916-cb27471e-268b-4cb1-94ba-0e4b7f2b91e5.png)


* ##### Cadastro Clientes (Responsivo)

![telaCadastroClientesResponsivo](https://user-images.githubusercontent.com/85248692/213282971-6005acfb-6dcb-4d4d-8caa-39917062b31b.png)

## Terceira etapa
Na terceira etapa foi desenvolvido as páginas de listagem e cadastro de vendas.<br> 
Implementado as funções de deletar, editar e buscar vendas, e também as validações do formulário de cadastro.<br>
É possível adicionar várias vendas para o mesmo cliente de uma só vez, clicando no botão "+ Mais itens".

## Telas terceira etapa
* ##### Lista Vendas

![image](https://user-images.githubusercontent.com/85248692/213283020-57dc0adc-ef51-4f02-b2cf-67d15b5632f2.png)


* ##### Editar Venda

![image](https://user-images.githubusercontent.com/85248692/213283074-3596776c-3656-44d0-9f69-3c3051a73710.png)


* ##### Lista Vendas (Responsivo)

![image](https://user-images.githubusercontent.com/85248692/213283124-dc279ea8-82a9-4ee5-b351-9ff468758af6.png)


* ##### Detalhes Venda (Responsivo)

![image](https://user-images.githubusercontent.com/85248692/213283160-502806a0-c9f2-4fc1-a79a-6d1ad82fa74a.png)


* ##### Editar Venda (Responsivo)

![image](https://user-images.githubusercontent.com/85248692/213283209-1719b290-a95a-42fb-8dc5-5718f62eda74.png)


* ##### Cadastro Venda

![image](https://user-images.githubusercontent.com/85248692/213283256-98ab075c-95f5-4a87-bdc2-07acd7d771f4.png)


* ##### Cadastro Venda (Responsivo)

![image](https://user-images.githubusercontent.com/85248692/213283311-20078860-23a3-4c4e-81a1-5ecbf8c35223.png)

## Quarta etapa
Na quarta etapa, fizemos o modelo conceitual e logico do banco de dados que vamos usar, mas somente para aprendizado, pois vamos criar o Banco de Dado atravé do Entity Framework Core no .NET.

## Telas quarta etapa
* ##### Diagrama modelo conceitual

![diagrama_modelo_conceitual](https://user-images.githubusercontent.com/85248692/213283339-da7b84f4-4a1c-48e0-a636-ab1ce2061b3d.png)


* ##### Diagrama modelo lógico

![diagrama_modelo_logico](https://user-images.githubusercontent.com/85248692/213283414-b8f35a66-345a-4321-a93a-82a0201b85ba.png)

## Quinta etapa
Na quinta etapa criamos a API usando a arquitetura DDD (Domain Driven Design), onde dividmos o projeto em três camadas:
- API
- DOMAIN
- INFRA

## Tela quinta etapa
* ##### Arquitetura API

![arquitetura-backend](https://user-images.githubusercontent.com/85248692/213283453-22eee8f8-c06d-4582-a935-0a3b44da3427.jpg)

## Sexta etapa
Na sexta etapa apenas fizemos a integração do Frontend com o Backend, e criamos a tela de cadastro de usuário e a tela de login.

## Tela sexta etapa
* ##### Login/Cadastro usuário

https://user-images.githubusercontent.com/85248692/213283601-b377f728-f70b-4577-a08f-917a98eaabf5.mp4

## Sétima etapa
Na setima etapa foi proposto para implementarmos uma filtro de pesquisa pelo backend, e também uma paginação.

## Telas Sétima etapa
* ##### Filtro e Paginação da lista de Clientes

![image](https://user-images.githubusercontent.com/85248692/225049413-e4f8524d-e4dc-46d7-a2bc-4b499f043f5d.png)

* ##### Filtro e Paginação da lista de Vendas

![image](https://user-images.githubusercontent.com/85248692/225049751-2b3763c9-57b5-44a8-88fd-ef92a49fcac4.png)

* ##### Filtro e Paginação (Responsivo)

![image](https://user-images.githubusercontent.com/85248692/225049983-e17b3b0a-96d8-4d68-bd68-1fd8697390fc.png)

## Última etapa
Na última etapa foi proposto para refatorarmos todo o projeto com o Framework Vuejs.

## Etapa bônus
Não tava na ideia do projeto, mas resolvi criar um container docker para subir com mais facilidade o projeto na etapa de desenvolvimento, criando um container para o Frontend, uma para o Backend e um para o Banco de Dados (Por questão de segurança, em ambiente de produção não subam o Banco de Dados no docker.) e juntando todos com o docker compose.

## Tela etapa bônus
* ##### Docker Compose

![docker](https://user-images.githubusercontent.com/85248692/213283665-cbdded89-4352-46e1-b032-8ee1fef7b82a.jpg)

## Execução
* Primeiramente instalar o docker em sua máquina.<br>Segue o link de um ótimo artigo do Balta, com o passo a passo de como instalar o docker:<br>
[**Balta.io**](https://balta.io/blog/docker-instalacao-configuracao-e-primeiros-passos)

* Com o docker instalado, através do CMD (terminal), navegar até a raiz do projeto (no mesmo local onde se encontra o arquivo docker-compose.yml) e executar o seguinte comando:
```
 docker-compose up
```

* Com o container pronto para uso, acessar o projeto através do link:<br> **http://localhost:3030/**
