<template>
  <details class="box-filtros">
    <summary>Filtros</summary>
    <div class="form-filtros">
      <div class="conteudo-principal-clientes-header-input-buscar">
        <input type="text" name="buscar-clientes" placeholder="Buscar..."  v-mask="mascara" v-model="textoBusca" @input="filtrar">
        <button type="button" class="btn-buscar">
          <img src="@/assets/icones/search-icon.svg" alt="icone buscar" class="btn-buscar-img">
        </button>
      </div>
     
      <div class="filtros-clientes">
        <div class="box-filtro-tipo-busca">
          <h4>Condições de Busca:</h4>
          <InputFiltro :label="'Nome'" :tipo="'radio'" :name="'filtro'" :valorInput="'Nome='" v-model="tipoSelecionado" @input="trocouFiltro"/>
          <InputFiltro :label="'Email'" :tipo="'radio'" :name="'filtro'" :valorInput="'Email='"  v-model="tipoSelecionado" @input="trocouFiltro"/>
          <InputFiltro :label="'Telefone'" :tipo="'radio'" :name="'filtro'" :valorInput="'Telefone='" v-model="tipoSelecionado" @input="trocouFiltro"/>
          <InputFiltro :label="'CPF'" :tipo="'radio'" :name="'filtro'" :valorInput="'CPF='" v-model="tipoSelecionado" @input="trocouFiltro"/>
        </div>
  
        <div class="box-filtro-status">
          <h4>Status Cliente:</h4>
          <InputFiltro :label="'Ativo'" :tipo="'radio'" :name="'filtro-status'" :valorInput="'Inativo=false'" v-model="tipoStatusSelecionado" @input="filtrarPorStatus"/>
          <InputFiltro :label="'Inativo'" :tipo="'radio'" :name="'filtro-status'" :valorInput="'Inativo=true'" v-model="tipoStatusSelecionado" @input="filtrarPorStatus"/>
          <InputFiltro :label="'Todos'" :tipo="'radio'" :name="'filtro-status'" :valorInput="''" v-model="tipoStatusSelecionado" @input="filtrarPorStatus"/>
        </div>
      </div>
    </div>
  </details>
</template>

<script>
import InputFiltro from './InputFiltro.vue';
import { mask } from 'ke-the-mask';

export default {
  name: 'FiltroBuscaClientesComponent',
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
      textoBusca: '',
      tipoSelecionado: '',
      tipoStatusSelecionado: '',
      urlFiltro: '',
      tipoBusca: '',
      mascara: '###.###.###-##'
    }
  },
  methods: {
    trocouFiltro() {
      this.textoBusca = '';
      this.urlFiltro = `Cliente/listar?${this.tipoStatusSelecionado}&Limit=${this.limitePorPagina}`;
      this.$emit('obterURL', { URL: this.urlFiltro });
      
      if (this.tipoSelecionado == 'Email=' || this.tipoSelecionado == 'Nome=') {
        this.mascara = ''
      }

      if (this.tipoSelecionado == 'Telefone=') {
        this.mascara = '(##) #####-####'
      } 

      if (this.tipoSelecionado == 'CPF=') {
        this.mascara = '###.###.###-##'
      }    
    },
    filtrar() {
      this.tipoBusca  = 
        this.tipoSelecionado == 'Telefone=' || this.tipoSelecionado == 'CPF=' 
        ? `${this.tipoSelecionado}${this.textoBusca.replace(/[^0-9]+/g,'')}&` 
        : `${this.tipoSelecionado}${this.textoBusca.trim()}&`;

      this.urlFiltro = `Cliente/listar?${this.tipoBusca}${this.tipoStatusSelecionado}&Limit=${this.limitePorPagina}`;
      this.$emit('obterURL', { URL: this.urlFiltro });
    },
    filtrarPorStatus() {
      this.textoBusca = ''
      this.urlFiltro = `Cliente/listar?${this.tipoStatusSelecionado}&Limit=${this.limitePorPagina}`;
      this.$emit('obterURL', { URL: this.urlFiltro });
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

.box-filtro-status {
  margin-left: 60px;
}

.form-filtros {
  display: flex;
  align-items: center; 
  margin-bottom: 30px;
}

.btn-buscar-img {
  opacity: 0;
  background: white;
  animation: animate 1.9s linear infinite;
  transition: all 1s;
  width: 27px;
  height: 24px;
}

.conteudo-principal-clientes-header-input-buscar {
  display: flex;
  flex-wrap: nowrap;
}

.conteudo-principal-clientes-header-input-buscar input[type="text"] {
  width: 410px;
  background: var(--cor-background-secundario);
  border: 1px solid var(--cor-bordas-secundario);
  border-right: none;
  border-radius: 5px 0px 0px 5px;
  padding: 15px;
  float: left;
}

.conteudo-principal-clientes-header-input-buscar input[type="text"]::placeholder {
  font-size: 1.6rem;
  color: var(--cor-btn);
}

.conteudo-principal-clientes-header-input-buscar button {
  background: var(--cor-background-secundario);
  border: 1px solid var(--cor-bordas-secundario);
  border-left: none;
  border-radius: 0px 5px 5px 0px;
  padding: 0 15px;
  float: left;
  cursor: auto;
}

.filtros-clientes {
  display: flex;
  margin-left: 20px;
}

.filtros-clientes h4 {
  margin-left: 5px;
}


@media (max-width: 1400px) {
  .form-filtros {
    flex-direction: column;
    align-items: flex-start;
  }

  .filtros-clientes {
    margin-left: 0;
    margin-top: 10px;
  }
}

@media(max-width: 935px) {
  .box-filtros summary {
    margin-bottom: 5px
  }
  .conteudo-principal-clientes-header-input-buscar {
    width: 45%;
    margin: 10px 0 10px 0;
  }
  .conteudo-principal-clientes-header-input-buscar input[type="text"] {
    width: 100%;
  }
}

@media(max-width: 880px) {
  .filtros-clientes {
    display: flex;
    flex-direction: column;
  }
  .box-filtro-status {
    margin-left: 0;
    margin-top: 5px;
  }
}

@media(max-width: 610px) {
  .conteudo-principal-clientes-header-input-buscar {
    width: 91%;
  }
}

@media(max-width: 390px) {
  .conteudo-principal-clientes-header-input-buscar {
    width: 88%;
  }
}
</style>