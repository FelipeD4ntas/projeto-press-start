# Projeto Press Start 2.0 da Lyncas

## Primeira etapa
Na primeira etapa foi desenvolvido o dashboard da página de Boas-vindas incluindo sua responsividade, e como desafio proposto por nosso lider foi implementado uma navegação no estilo de SPA (Single Page Application), usando JavaScript puro.<br>

## Telas primeira etapa
* ##### Dashboard Boas-vindas

![image](https://gitlab.com/press-start-2/projeto-marcos/uploads/8b95f97b858fc0704030680072576c17/telaDashboard.png)


* ##### Dashboard Boas-vindas (Responsivo)

![image](https://gitlab.com/press-start-2/projeto-marcos/uploads/57b6090b4bef040b9b44ae573e2fe077/telaDashboardResponsivo.png)

## Segunda etapa
Na segunda etapa foi desenvolvido as páginas de listagem e cadastro de clientes.<br> 
Implementado as funções de deletar, editar e buscar clientes, e também as validações do formulário de cadastro.<br>

## Telas segunda etapa
* ##### Lista Clientes

![telaListaClientes](/uploads/d5fa3ba75662021c6d5f68bbfacf5d42/telaListaClientes.png)
![popupDeletarRegistro](/uploads/02da7bce569f4a7dbd515d0e6d94422d/popupDeletarRegistro.png)


* ##### Editar Cliente

![telaDetalhesListaClientesEditar](/uploads/38c5e00e5049f3e905a2d6d70e58a276/telaDetalhesListaClientesEditar.png)
![popupClienteEditado](/uploads/8d5ddf6cf46771289fabf2ed373b3868/popupClienteEditado.png)


* ##### Lista Clientes (Responsivo)

![telaListaClientesResponsivo](/uploads/f824bd85c72d1aac963e71abfda08285/telaListaClientesResponsivo.png)


* ##### Detalhes Clientes (Responsivo)

![telaDetalhesListaClientesResponsivo](/uploads/ac9d6f9004a85e92bde74457ec891cd9/telaDetalhesListaClientesResponsivo.png)


* ##### Editar Cliente (Responsivo)

![telaDetalhesListaClientesEditarResponsivo](/uploads/0bc6bdfc5f0a5194807b6c5edfddb20b/telaDetalhesListaClientesEditarResponsivo.png)


* ##### Cadastro Clientes

![telaCadastroClientes](/uploads/e9c0a5168a465fe7b95a3d276be4e1d2/telaCadastroClientes.png)
![popupClienteCadastrado](/uploads/7744b488d0e08e3ac334ef39387a83dd/popupClienteCadastrado.png)


* ##### Cadastro Clientes (Responsivo)

![telaCadastroClientesResponsivo](/uploads/ddbbdc94d4af49ac9497fe7986b14691/telaCadastroClientesResponsivo.png)

## Terceira etapa
Na terceira etapa foi desenvolvido as páginas de listagem e cadastro de vendas.<br> 
Implementado as funções de deletar, editar e buscar vendas, e também as validações do formulário de cadastro.<br>
É possível adicionar várias vendas para o mesmo cliente de uma só vez, clicando no botão "+ Mais itens".

## Telas terceira etapa
* ##### Lista Vendas

![image](/uploads/af6b0dd90d4c036644d1ef2decd577fd/image.png)


* ##### Editar Venda

![image](/uploads/2ad59af8077fb4e2596777020ce1179b/image.png)


* ##### Lista Vendas (Responsivo)

![image](/uploads/8cd403f5f7dc4340becc4566fd4adfc0/image.png)


* ##### Detalhes Venda (Responsivo)

![image](/uploads/37631f8ab932c3188e5872e5ccaa628c/image.png)


* ##### Editar Venda (Responsivo)

![image](/uploads/5783507bc42eb06a6c2011fb58f6daa9/image.png)


* ##### Cadastro Venda

![image](/uploads/8729337b35ce204afc639e949002b917/image.png)


* ##### Cadastro Venda (Responsivo)

![image](/uploads/20b3558d6e0e451817e77e7a3a594c9a/image.png)

## Quarta etapa
Na quarta etapa, fizemos o modelo conceitual e logico do banco de dados que vamos usar, mas somente para aprendizado, pois vamos criar o Banco de Dado atravé do Entity Framework Core no .NET.

## Telas quarta etapa
* ##### Diagrama modelo conceitual

![diagrama_modelo_conceitual](/uploads/c038361f3774a3c0a7bdc931996d5d7b/diagrama_modelo_conceitual.png)


* ##### Diagrama modelo lógico

![diagrama_modelo_logico](/uploads/f1e637be3109991f03eea220f3e2f8e7/diagrama_modelo_logico.png)

## Quinta etapa
Na quinta etapa criamos a API usando a arquitetura DDD (Domain Driven Design), onde dividmos o projeto em três camadas:
- API
- DOMAIN
- INFRA

## Tela quinta etapa
* ##### Arquitetura API

![arquitetura-backend](/uploads/574f9c0c14436909e7d7b8c44d93fa1e/arquitetura-backend.jpg)

## Sexta etapa
Na sexta etapa apenas fizemos a integração do Frontend com o Backend, e criamos a tela de cadastro de usuário e a tela de login.

## Tela sexta etapa
* ##### Login/Cadastro usuário

![tela-login-cadastro](/uploads/cb5024202009d1397a90bea11fe0c9f9/tela-login-cadastro.mp4)

## Etapa bônus
Não tava na ideia do projeto, mas resolvi criar um container docker para subir com mais facilidade o projeto na etapa de desenvolvimento, criando um container para o Frontend, uma para o Backend e um para o Banco de Dados (Por questão de segurança, em ambiente de produção não subam o Banco de Dados no docker.) e juntando todos com o docker compose.

## Tela etapa bônus
* ##### Docker Compose

![docker](/uploads/195f5f24c2a96ad5f972120ca0c952ea/docker.jpg)

## Execução
* Primeiramente instalar o docker em sua máquina.<br>Segue o link de um ótimo artigo do Balta, com o passo a passo de como instalar o docker:<br>
[**Balta.io**](https://balta.io/blog/docker-instalacao-configuracao-e-primeiros-passos)

* Com o docker instalado, através do CMD (terminal), navegar até a raiz do projeto (no mesmo local onde se encontra o arquivo docker-compose.yml) e executar o seguinte comando:
```
 docker-compose up --build
```

* Com o container pronto para uso, acessar o projeto através do link:<br> **http://localhost:3000/**
