<template>
  <Header 
    :telaComMenu="true" 
    :telaTemBotao="true" 
    :rotaBotao="rotaAdicionarVenda" 
    :nomeBotao="'Adicionar'"
    :classeBotao="'btn-adicionar'"/>
  <div class="conteudo-principal">
    <div class="conteudo-principal-vendas">
      <FiltroBuscaVendas :limitePorPagina="limitePorPagina" @obterURL="listar"/>
      <HeaderListas :nome="nomeLista" :rota="rotaAdicionarVenda"/>
      <div class="conteudo-principal-box-lista">
        <div v-if="loading" class="box-loading">
          <Loading/>
        </div>
        <Transition
          enter-active-class="animate__animated animate__fadeInDown"
          leave-active-class="animate__animated animate__fadeOutDown"
          name="list"
          mode="out-in"
          v-else>
          <table class="conteudo-principal-box-lista-itens-lista" :key="contTable">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Qtd. itens</th>
                <th>Data da venda</th>
                <th>Data faturamento</th>
                <th>Valor total</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <TransitionGroup
                name="list"
                leave-active-class="animate__animated animate__zoomOut">
                <tr class="linhas-tabela" v-for="venda in vendas" :key="venda.id">
                  <td class="nome-cliente">{{ venda.nomeCliente }}</td>
                  <td class="qtd-vendas">{{ venda.quantidadeItens }}</td>
                  <td class="data-venda">{{ formatarData(venda.dataVenda) }}</td>
                  <td class="data-faturamento">{{ formatarData(venda.dataFaturamento) }}</td>
                  <td class="valor-total">{{ formatarValorTotal(venda.valorTotal) }}</td>
                  <td class="coluna-btn-deletar-editar">
                    <button class="btn-deletar-itens-lista" type="button" @click="deletar(venda.id)">Deletar</button>
                    <button class="btn-editar-itens-lista" type="button" @click="editar(venda.id)">Editar</button>
                  </td>
                  <td class="icone-detalhes-vendas">
                    <button class="btn-detalhes detalhes-vendas" @click="editar(venda.id)">{{ formatarValorTotal(venda.valorTotal) }}</button>
                    <button class="btn-detalhes icone-lixeixa" @click="deletar(venda.id)">
                      <img src="@/assets/icones/icone-lixeira.png" alt="icone cliente">
                    </button>
                  </td>
                </tr>
              </TransitionGroup>
            </tbody>
          </table>
        </Transition>
        
      </div>
    </div>
  </div>
  <Paginacao :totalItensLista="totalVendas" @estado-paginacao="mudarPagina" :filtro="usouFiltro" :limitePorPagina="limitePorPagina"/>
  <Popup :conteudo="notificacao" v-show="mostrarPopup" :tipo="tipoPopup" @fechar="fecharPopup" @confirmar="confirmarExclusao" @naoDeletar="fecharPopup"/>
</template>

<script>
import FiltroBuscaVendas from '@/components/FiltroBuscaVendas.vue';
import HeaderListas from '@/components/HeaderListas.vue';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import Paginacao from '@/components/Paginacao';
import Popup from '@/components/Popup.vue';
import { servicesVenda } from '@/common/services/vendasServices/servicesVenda';
import { format } from 'date-fns';

export default {
  name: 'ListaVendasPage',
  components: {
    Header,
    FiltroBuscaVendas,
    HeaderListas,
    Loading,
    Popup,
    Paginacao
  },
  data() {
    return {
      nomeLista: 'vendas',
      rotaAdicionarVenda: '/venda/adicionar',
      vendas: [],
      loading: true,
      mostrarPopup: false,
      notificacao: null,
      tipoPopup: null,
      deletarConfirmado: false,
      vendaId: null,
      URL: 'Venda/listar?Limit=5',
      totalVendas: 0,
      parametrosBusca: '',
      usouFiltro: false,
      limitePorPagina: 5,
      contTable: 1
    }
  },
  methods: {
    async listar(params) {
      if (params) {
        const response = await servicesVenda.listar(params.URL);
        this.parametrosBusca = params;
        this.vendas = response.dados.vendas;
        this.totalVendas = response.dados.quantidadeVendasFiltradas;
        this.usouFiltro = !this.usouFiltro;
        return
      }

      const response = await servicesVenda.listar(this.URL);
      this.vendas = response.dados.vendas;
      this.totalVendas = response.dados.quantidadeVendasFiltradas;
      this.loading = false;
    },
    formatarData(data) {
      return format(new Date(data), 'dd/MM/yyyy')
    },
    formatarValorTotal(valor) {
      return valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
    },
    deletar(id) {
      this.mostrarPopup = true; 
      this.tipoPopup = 'Deletar';
     
      this.vendaId = id;
    },
    async confirmarExclusao() {
      await servicesVenda.deletar('Venda/deletar', this.vendaId);
      this.mostrarPopup = !this.mostrarPopup;
      this.listar();
    },
    editar(id) {
      this.$router.push(`/venda/editar/${id}`)
    },
    fecharPopup() {
      this.mostrarPopup = !this.mostrarPopup;
    },
    async mudarPagina(valor) {
      this.contTable++;
      if (this.parametrosBusca) {
        this.URL = `${this.parametrosBusca.URL}&Offset=${valor.offset}`;
        this.listar();
        return
      }

      this.URL = `Venda/listar?Limit=5&Offset=${valor.offset}`
      this.listar();
    }
  },
  created() {
    this.listar();
  }
}
</script>

<style scoped>
.animate__animated.animate__fadeInDown {
  --animate-duration: 0.5s;
}

.list-enter-active,
.list-leave-active,
.list-move {
  overflow: hidden;
}

.list-enter-from,
.list-leave-to {
  overflow: hidden;
}

.icone-lixeixa {
  margin-left: 30px;
}

.coluna-btn-deletar-editar {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.box-loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.conteudo-principal-vendas {
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

.icone-detalhes-vendas {
  display: none;
}

.btn-detalhes img {
  height: 100%;
}

.detalhes-vendas {
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--cor-background-btn-adicionar);
}

@media(max-width: 935px) {
  .coluna-btn-deletar-editar {
    display: none !important;
  }

  .icone-detalhes-vendas {
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 20px !important;
    grid-area: icone;
    height: 100%;
    border-radius: 0 5px 5px 0;
  }

  .icone-detalhes-vendas {
    align-items: flex-start;
  }

  .icone-detalhes-vendas button {
    background: transparent;
  }

  .linhas-tabela {
    display: grid;
    grid-template-areas: 
    "nome icone"
    "cpf icone";
    align-items: center;
    margin-bottom: 20px;
  }

  .nome-cliente {
    padding: 20px !important;
    padding-bottom: 5px !important;
    grid-area: nome;
  }

  .qtd-vendas,
  .data-faturamento,
  .valor-total,
  .coluna-btn-deletar-editar {
    display: none;
  }

  .data-venda {
    padding: 20px !important;
    padding-top: 0 !important;
    color: var(--cor-btn);
    grid-area: cpf;
  }

  .conteudo-principal-box-lista {
    padding-bottom: 30px;
  }

  .conteudo-principal-box-lista-itens-lista thead {
    display: none;
  }
}
</style>