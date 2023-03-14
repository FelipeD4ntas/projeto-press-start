<template>
  <Header 
    :telaComMenu="true" 
    :telaTemBotao="true" 
    :rotaBotao="rotaListaClientes"
    :nomeBotao="'Voltar'"
    :classeBotao="'btn-voltar'"/>

  <form class="conteudo-principal-telaClientes-box-form" @submit.prevent="submit">
    <div class="form-cliente">
      <h2>{{ tipoFormulario }}</h2>

      <div class="box-form-conjunto-input conjunto-input">
        <InputComponent 
          ref="inputNome" :nome="'nome-cliente'" 
          :label="'Nome'" v-model="cliente.nome" 
          :tipoValidacao="'nome'" 
          :mensagemInputInvalido="'Deve conter pelo menos três caracteres e não pode conter números.'" 
          :valorInput="cliente.nome" required/>

          <InputComponent 
            ref="inputEmail" :nome="'email-cliente'" 
            :label="'Email'" v-model="cliente.email" 
            :tipoValidacao="'email'" 
            :mensagemInputInvalido="'E-mail inválido.'" 

            :valorInput="cliente.email" required/>
      </div>
      
      <div class="box-form-conjunto-input conjunto-input">
        <InputComponent 
          ref="inputTelefone" :nome="'telefone-cliente'" 
          :label="'Telefone'" v-model="cliente.telefone" 
          :tipoValidacao="'telefone'" 
          :mensagemInputInvalido="'Telefone inválido.'" 
          :mascara="'(##) #####-####'" 
          :valorInput="cliente.telefone" required/>

          <InputComponent 
            ref="inputCPF" :nome="'cpf-cliente'" 
            :label="'CPF'" v-model="cliente.cpf" 
            :tipoValidacao="'cpf'" 
            :mensagemInputInvalido="'CPF inválido.'" 
            :mascara="'###.###.###-##'" 

            :valorInput="cliente.cpf" required/>
      </div>

      <div class="box-form-btn-salvar">
        <button type="submit">Salvar</button>
      </div>
    </div>
  </form>   
  <Popup :conteudo="notificacao" v-show="mostrarPopup" @fechar="fecharPopup"/>
  </template>
  
  <script>
  import Header from '@/components/Header';
  import InputComponent from '@/components/InputFormulario';
  import Popup from './Popup.vue';
  import { servicesCliente } from '@/common/services/clienteServices/sevicesCliente';

  export default {
    name: 'FormularioClienteComponent',
    props: {
      id: { type: String }
    },
    components: {
      Header,
      InputComponent,
      Popup
    },
    data() {
      return {
        rotaListaClientes: '/clientes',
        cliente: {
          nome: null,
          email: null,
          telefone: null,
          cpf: null
        },
        tipoFormulario: '',
        idCliente: '',
        notificacao: null,
        mostrarPopup: false,
        responseOk: false,
        submit: null
      }
    },
    methods: {
      async adicionarCliente() {
        const bodyClienteAPI = {
          nome: this.cliente.nome,
          email: this.cliente.email,
          telefone: this.cliente.telefone.replace(/[^0-9]+/g,''),
          cpf: this.cliente.cpf.replace(/[^0-9]+/g,'')
        }

       
        const response = await servicesCliente.adicionar('Cliente/adicionar', bodyClienteAPI);
        this.mostrarPopup = true; 
      
        if (response.sucesso) {
          this.notificacao = response.dados.mensagem;
          this.responseOk = true;
          return
        }

        this.notificacao = response.notificacoes[0].message;
      },
      async editarCliente() {
        const bodyClienteAPI = {
          id: this.id,
          nome: this.cliente.nome,
          email: this.cliente.email,
          telefone: this.cliente.telefone.replace(/[^0-9]+/g,''),
          cpf: this.cliente.cpf.replace(/[^0-9]+/g,'')
        }

        const response = await servicesCliente.atualizar('Cliente/atualizar', bodyClienteAPI);
        this.mostrarPopup = true; 

        if (response.sucesso) {
          this.notificacao = response.dados;
          this.responseOk = true;
          return
        }

        this.notificacao = response.notificacoes[0].message;
      },
      fecharPopup() {
        this.mostrarPopup = !this.mostrarPopup;
        if (this.responseOk) {
          this.$router.push('/clientes');
        }
      },
    },
   
    async created() {  
      if (this.$route.path == '/cliente/adicionar') {
        this.tipoFormulario = 'Adicionar cliente';
        this.submit = this.adicionarCliente;
      }

      if (this.$route.path.includes('/cliente/editar')) {
        const response = await servicesCliente.obter(`Cliente/obter/${this.id}`);
        this.tipoFormulario = 'Editar cliente';
        this.submit = this.editarCliente;
        this.cliente.nome = response.dados.nome;
        this.cliente.email = response.dados.email;
        this.cliente.telefone = response.dados.telefone;
        this.cliente.cpf = response.dados.cpf;
      }
    }
  }
  </script>
  
  <style scoped>
  .box-form-conjunto-input {
    display: flex;
    margin-bottom: 10px;
  }
  
  .box-form-conjunto-input {
    display: flex;
    margin-bottom: 10px;
  }

  .conteudo-principal-telaClientes-box-form {
    overflow-y: auto;
    background: var(--cor-background-secundario);
    margin: 25px 20px;
  }
  
  .form-cliente {
    padding: 25px 25px 75px 25px;
  }
  
  .box-form-btn-salvar {
    display: flex;
    justify-content: end;
  }
  
  .box-form-btn-salvar button {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    width: calc(50% - 10px);
    padding: 10px;
    margin-top: 20px;
    border-radius: 5px;
    color: var(--cor-texto-links);
    background: var(--cor-background-btn-adicionar);
    cursor: pointer;
  }
  
  @media(max-width: 610px) {
    .box-form-conjunto-input {
      flex-direction: column;
    }
    
    .conteudo-principal-telaClientes-box-form{
      padding-bottom: 25px;
    }
  
    .form-cliente {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  
    .form-cliente h2 {
      display: none;
    }
  
    .box-form-btn-salvar {
      display: flex;
      align-items: flex-end;
      width: 100%;
    }
  
    .box-form-btn-salvar button {
      width: 100%;
      height: max-content;
    }
  }
  </style>