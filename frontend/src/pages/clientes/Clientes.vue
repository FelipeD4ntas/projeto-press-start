<template>
  <Header 
    :telaComMenu="true" 
    :telaTemBotao="true" 
    :rotaBotao="rotaAdicionarCliente" 
    :nomeBotao="'Adicionar'"
    :classeBotao="'btn-adicionar'"/>
    
  <div class="conteudo-principal">
    <div class="conteudo-principal-clientes">
      <FiltroBuscaClientes @obterURL="listar" :limitePorPagina="limitePorPagina"/>
      <HeaderListas :nome="nomeLista" :rota="rotaAdicionarCliente"/>
      <div class="conteudo-principal-box-lista">
        <div v-if="loading" class="box-loading">
          <Loading/>
        </div>

        <table class="conteudo-principal-box-lista-itens-lista" v-else>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>CPF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cliente in clientes" :key="cliente.id" class="linhas-tabela" :class="{'cliente-inativo': cliente.inativo}">
              <td class="nome-cliente">{{ cliente.nome }}</td>
              <td class="email-cliente">{{ cliente.email }}</td>
              <td class="telefone-cliente">{{ mascararItem(cliente.telefone, /^(\d{2})(\d{5})/g, "($1) $2", /(\d{5})(\d{4})$/, "$1-$2") }}</td>
              <td class="cpf-cliente">{{ mascararItem(cliente.cpf, /^(\d{3})(\d{3})/g, "$1.$2", /(\d{3})(\d{2})$/,".$1-$2") }}</td>
              <td class="coluna-btn-deletar-editar" v-if="!cliente.inativo">
                <button class="btn-deletar-itens-lista" type="button" @click="deletar(cliente.id)">Deletar</button>
                <button class="btn-editar-itens-lista" type="button" @click="editar(cliente.id)">Editar</button>
              </td>
              <td class="coluna-cliente-inativo" v-if="cliente.inativo">Cliente Inativo</td>
              <td class="icone-detalhes-clientes" v-if="!cliente.inativo">
                <button class="btn-detalhes" @click="editar(cliente.id)">
                  <img src="@/assets/icones/icone-cliente.png" alt="icone cliente">
                </button>
                <button class="btn-detalhes icone-lixeixa" @click="deletar(cliente.id)">
                  <img src="@/assets/icones/icone-lixeira.png" alt="icone cliente">
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>      
    </div>
  </div>
  <Paginacao :totalItensLista="totalClientes" @estado-paginacao="mudarPagina" :filtro="usouFiltro" :limitePorPagina="limitePorPagina"/>
  <Popup :conteudo="notificacao" v-show="mostrarPopup" :tipo="tipoPopup" @fechar="fecharPopup" @confirmar="confirmarExclusao" @naoDeletar="fecharPopup"/>
</template>

<script>
import FiltroBuscaClientes from '@/components/FiltroBuscaClientes';
import HeaderListas from '@/components/HeaderListas';
import Header from '@/components/Header';
import Paginacao from '@/components/Paginacao';
import Loading from '@/components/Loading';
import Popup from '@/components/Popup';
import { servicesCliente } from '@/common/services/clienteServices/sevicesCliente';

export default {
  name: 'ListaClientesPage',
  components: {
    Header,
    FiltroBuscaClientes,
    HeaderListas,
    Loading,
    Popup,
    Paginacao
  },
  data() {
    return {
      nomeLista: 'clientes',
      rotaAdicionarCliente: '/cliente/adicionar',
      clientes: [],
      loading: true,
      mostrarPopup: false,
      notificacao: null,
      tipoPopup: null,
      deletarConfirmado: false,
      clienteId: null,
      URL: 'Cliente/listar?Limit=5',
      totalClientes: 0,
      parametrosBusca: '',
      usouFiltro: false,
      limitePorPagina: 5,
    }
  },
  methods: {
    async listar(params) {
      if (params) {
        const response = await servicesCliente.listar(params.URL);
        this.parametrosBusca = params
        this.clientes = response.dados.clientes;
        this.totalClientes = response.dados.quantidadeClientesFiltrados;
        this.usouFiltro = !this.usouFiltro
        return
      }
   
      const response = await servicesCliente.listar(this.URL);
      this.clientes = response.dados.clientes;
      this.totalClientes = response.dados.quantidadeClientesFiltrados;
      this.loading = false;
    },
    mascararItem(
      valor, 
      primeiroConjutoRegra,
      novoFormatoPrimeiroConjunto,  
      segundoConjuntoRegra,
      novoFormatoSegundoConjunto) {
      
      valor = valor.replace(/\D/g, "");
      valor = valor.replace(primeiroConjutoRegra, novoFormatoPrimeiroConjunto);
      valor = valor.replace(segundoConjuntoRegra, novoFormatoSegundoConjunto);

      return valor
    },
    editar(id) {
     this.$router.push(`/cliente/editar/${id}`)
    },
    deletar(id) {
      this.mostrarPopup = true; 
      this.tipoPopup = 'Deletar';
     
      this.clienteId = id;
    },
    async confirmarExclusao() {
      await servicesCliente.deletar('Cliente/deletar', this.clienteId);
      this.mostrarPopup = !this.mostrarPopup;
      this.listar();
    },
    fecharPopup() {
      this.mostrarPopup = !this.mostrarPopup;
    },
    async mudarPagina(valor) {
      if (this.parametrosBusca) {
        this.URL = `${this.parametrosBusca.URL}&Offset=${valor.offset}`;
        this.listar();
        return
      }

      this.URL = `Cliente/listar?Limit=5&Offset=${valor.offset}`
      this.listar();
    }
  },
  async created() {
    this.listar();
  }
}
</script>

<style scoped>
.icone-lixeixa {
  margin-left: 30px;
}

.cliente-inativo {
  opacity: 0.5;
}

.icone-detalhes-clientes{
  display: none;
}

.btn-detalhes img {
  height: 100%;
}

.coluna-cliente-inativo {
  text-align: center;
  color: var(--cor-btn-deletar);
}

.coluna-btn-deletar-editar {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.btn-editar-itens-lista,
.btn-deletar-itens-lista {
  font-size: 1.4rem;
  font-weight: 500;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  flex: 1;
}

.btn-deletar-itens-lista {
  color: var(--cor-btn-deletar);
  background: var(--cor-background-btn-deletar);
}

.btn-editar-itens-lista {
  color: var(--cor-btn-editar);
  background: var(--cor-background-btn-editar);
}

.box-loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.conteudo-principal-clientes {
  height: 100%;
}

.conteudo-principal-box-lista {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70%;
  overflow-y: scroll;
}

.conteudo-principal-box-lista-itens-lista {
  max-height: 100px;
  width: 100%;
  border-spacing: 0px 20px;
}

.conteudo-principal-box-lista-itens-lista thead {
  width: 100%;
  height: 38px;
  background: var(--cor-background);
  position: sticky;
  top: -1px;
  z-index: 2;
}

.conteudo-principal-box-lista-itens-lista thead th {
  font-weight: 400;
  text-align: left;
  color: var(--cor-texto-secundario);
  margin-bottom: 18px;
  padding: 0 15px;
}

.conteudo-principal-box-lista-itens-lista tbody {
  height: 10px;
}

.conteudo-principal-box-lista-itens-lista tbody td {
  font-size: 1.4rem;
  font-weight: 500;
  background: var(--cor-background-secundario);
  padding: 15px;
}

.conteudo-principal-box-lista-itens-lista tbody td:nth-of-type(1) {
  border-radius: 5px 0 0 5px;
}

.conteudo-principal-box-lista-itens-lista tbody td:nth-of-type(5) {
  border-radius: 0 5px 5px 0;
}

@media(max-width: 935px) {
  .icone-detalhes-clientes {
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 20px !important;
    grid-area: icone;
    height: 100%;
    border-radius: 0 5px 5px 0;
  }

  .icone-detalhes-clientes button {
    background: transparent;
  }

  .coluna-btn-deletar-editar,
  .email-cliente,
  .telefone-cliente{
    display: none;
  }

  .conteudo-principal-box-lista {
    padding-bottom: 30px;
  }

  .conteudo-principal-box-lista-itens-lista thead {
    display: none;
  }

  .linhas-tabela {
    display: grid;
    grid-template-areas: 
    "nome icone"
    "cpf icone";
    align-items: center;
    margin-bottom: 20px;
  }
  .coluna-cliente-inativo {
    padding: 33px !important;
    grid-area: icone;
  }
  .nome-cliente {
    padding: 20px !important;
    padding-bottom: 5px !important;
    grid-area: nome;
  }

  .cpf-cliente {
    padding: 20px !important;
    padding-top: 0 !important;
    color: var(--cor-btn);
    grid-area: cpf;
  }
}
</style>