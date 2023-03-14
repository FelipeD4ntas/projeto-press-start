<template>
  <details class="box-filtros">
    <summary>Filtros</summary>
    <div class="form-filtros">
      <div class="conteudo-principal-vendas-header-input-buscar">
        <input type="text" name="buscar-vendas" placeholder="Buscar..." v-mask="mascara" v-model="textoBusca" @input="filtrar">
        <button type="button" class="btn-buscar" @click="filtrarPorData">
          <img src="@/assets/icones/search-icon.png" alt="icone buscar" class="btn-buscar-img" :class="{'mostrarBotao': buscarPorData}">
        </button>
      </div>
     
      <div class="filtros-vendas">
        <h4>Condições de Busca:</h4>
        <div class="box-filtro-tipo-busca">
          <InputFiltro :label="'Nome Cliente'" :tipo="'radio'" :name="'filtro'" :valorInput="'NomeCliente='" v-model="tipoSelecionado" @input="trocouTipo"/>
          <InputFiltro :label="'Data Faturamento'" :tipo="'radio'" :name="'filtro'" :valorInput="'DataFaturamento='" v-model="tipoSelecionado" @input="trocouTipo"/>
          <InputFiltro :label="'Data Venda'" :tipo="'radio'" :name="'filtro'" :valorInput="'DataVenda='" v-model="tipoSelecionado" @input="trocouTipo"/>
          <InputFiltro :label="'Valor Total'" :tipo="'radio'" :name="'filtro'" :valorInput="'ValorTotal='" v-model="tipoSelecionado" @input="trocouTipo"/>
          <InputFiltro :label="'Quantidade De Itens'" :tipo="'radio'" :name="'filtro'" :valorInput="'QuantidadeItens='" v-model="tipoSelecionado" @input="trocouTipo"/>
        </div>
      </div>
    </div>
  </details>
</template>

<script>
import InputFiltro from './InputFiltro.vue';
import { mask } from 'ke-the-mask';

export default {
  name: 'FiltroBuscaVendasComponent',
  components: {
    InputFiltro
  },
  props: {
    limitePorPagina: { type: [String, Number], required: true }
  },
  emits: ['obterURL'],
  directives: {
    mask
  },
  data() {
    return {
      textoBusca: null,
      tipoSelecionado: null,
      urlFiltro: '',
      tipoBusca: null,
      mascara: '##########',
      buscarPorData: false
    }
  },
  methods: {
    trocouTipo() {
      this.textoBusca = ''
      this.urlFiltro = `Venda/listar?Limit=${this.limitePorPagina}`;
      this.$emit('obterURL', { URL: this.urlFiltro });
      
      if (this.tipoSelecionado == 'NomeCliente=') {
        this.mascara = '';
      }

      if (this.tipoSelecionado == 'DataFaturamento=' || this.tipoSelecionado == 'DataVenda=') {
        this.mascara = '##/##/####';
      }

      if (this.tipoSelecionado == 'QuantidadeItens=') {
        this.mascara = '##########';
      }
    },
    filtrarPorData() {
      this.urlFiltro = `Venda/listar?${this.tipoBusca}&Limit=${this.limitePorPagina}`;
      this.$emit('obterURL', { URL: this.urlFiltro });
    },
    filtrar() {
      if (this.tipoSelecionado == 'ValorTotal=') {
        const estiloDaMoeda = new Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'});
        const valorPrecoBruto = this.textoBusca.replace(/\D/g, '');
        this.textoBusca = estiloDaMoeda.format(parseFloat(valorPrecoBruto / 100)); 
        this.mascara = '';
        this.tipoBusca = `${this.tipoSelecionado}${valorPrecoBruto / 100}`;

        this.urlFiltro = `Venda/listar?${this.tipoBusca}&Limit=${this.limitePorPagina}`;
        this.$emit('obterURL', { URL: this.urlFiltro });
        this.buscarPorData = false;
        return
      } 
      
      if (this.tipoSelecionado == 'DataFaturamento=' || this.tipoSelecionado == 'DataVenda=') {
        this.tipoBusca = `${this.tipoSelecionado}${this.textoBusca.split('/').reverse().join('/')}`;
        this.buscarPorData = true;
        return
      } 
        
      this.tipoBusca = `${this.tipoSelecionado}${this.textoBusca.trim()}`;
      this.urlFiltro = `Venda/listar?${this.tipoBusca}&Limit=${this.limitePorPagina}`;
      this.$emit('obterURL', { URL: this.urlFiltro });
      this.buscarPorData = false;
    }
  }
}
</script>

<style scoped>
.box-filtros {
  background-color: var(--cor-background);
  margin-bottom: 20px;
  position: fixed;
  z-index: 5;
  width: 100%;
}

.box-filtros[open] summary::marker {
  color: var(--cor-background-btn-adicionar);
  transition: 1s;
}

.box-filtros summary {
  font-size: 2.4rem;
  font-weight: 500;
  margin-bottom: 30px;
}

.box-filtros summary::marker {
  color: var(--cor-texto-secundario);
}

.form-filtros {
  display: flex;
  align-items: center; 
  margin-bottom: 30px;
}

.btn-buscar-img {
  opacity: 0;
  background: white;
  transition: all 1s;
  width: 27px;
  height: 24px;
}

.mostrarBotao {
  opacity: 1 !important;
  cursor: pointer;
}

.conteudo-principal-vendas-header-input-buscar {
  display: flex;
  flex-wrap: nowrap;
}

.conteudo-principal-vendas-header-input-buscar input[type="text"] {
  width: 410px;
  background: var(--cor-background-secundario);
  border: 1px solid var(--cor-bordas-secundario);
  border-right: none;
  border-radius: 5px 0px 0px 5px;
  padding: 15px;
  float: left;
}

.conteudo-principal-vendas-header-input-buscar input[type="text"]::placeholder {
  font-size: 1.6rem;
  color: var(--cor-btn);
}

.conteudo-principal-vendas-header-input-buscar button {
  background: var(--cor-background-secundario);
  border: 1px solid var(--cor-bordas-secundario);
  border-left: none;
  border-radius: 0px 5px 5px 0px;
  padding: 0 15px;
  float: left;
  cursor: auto;
}

.filtros-vendas {
  margin-left: 20px;
}

.filtros-vendas h4 {
  margin-left: 5px;
}

.box-filtro-tipo-busca {
  display: flex;
}

@media (max-width: 1400px) {
  .form-filtros {
    flex-direction: column;
    align-items: flex-start;
    
  }

  .filtros-vendas {
    margin-left: 0;
    margin-top: 10px;
  }
}

@media(max-width: 935px) {
  .box-filtros summary {
    margin-bottom: 5px
  }
  .conteudo-principal-vendas-header-input-buscar {
    width: 45%;
    margin: 10px 0 10px 0;
  }
  .conteudo-principal-vendas-header-input-buscar input[type="text"] {
    width: 100%;
  }
  .box-filtro-tipo-busca {
    flex-direction: column;
  }
}

@media(max-width: 610px) {
  .conteudo-principal-vendas-header-input-buscar {
    width: 92%;
  }
}
</style>