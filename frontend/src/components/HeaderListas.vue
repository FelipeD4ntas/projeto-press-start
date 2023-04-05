<template>
<div class="conteudo-principal-header-listas">
  <div class="conteudo-principal-header-listas-titulo">
    <h2>Lista de {{ nome }}</h2>
    
    <router-link exact to="/grafico-vendas" target="_self" class="link-grafico" v-if="mostrarGrafico">
      <div class="box-barrinhas">
        <div class="barrinha-1"></div>
        <div class="barrinha-2"></div>
        <div class="barrinha-3"></div>
      </div>
    </router-link>

    <router-link :to="rota" target="_Self" class="btn-mobile-adicionar">+</router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'HeaderListasComponent',
  props: {
    nome: { type: String },
    rota: { type: String, required: true},
    mostrarGrafico: { type: Boolean, default: false }
  }
}
</script>

<style scoped>

.box-barrinhas {
  width: 50px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--cor-bordas);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  
}

.barrinha-1 {
  height: 18px;
  width: 8px;
  border-radius: 5px;
  border: 2px solid var(--cor-bordas);
  margin-right: 5px;
  margin-bottom: 4px;
  transition: all 0.5s;
}

.barrinha-2 {
  height: 28px;
  width: 8px;
  border-radius: 5px;
  border: 2px solid var(--cor-bordas);
  margin-bottom: 4px;
  transition: all 0.5s;
}

.barrinha-3 {
  height: 24px;
  width: 8px;
  border-radius: 5px;
  border: 2px solid var(--cor-bordas);
  margin-left: 5px;
  margin-bottom: 4px;
  transition: all 0.5s;
}

.box-barrinhas:hover {
  background-color: var(--cor-principal);
}

.box-barrinhas:hover .barrinha-1 {
  height: 28px;
  border: 2px solid var(--cor-texto-links);
}

.box-barrinhas:hover .barrinha-2 {
  height: 18px;
  border: 2px solid var(--cor-texto-links);
}

.box-barrinhas:hover .barrinha-3 {
  height: 20px;
  border: 2px solid var(--cor-texto-links);
}

.conteudo-principal-header-listas {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.conteudo-principal-header-listas-titulo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 64.2px;
  padding-top: 20px;
  width: 100%;
  border-top: 2px solid var(--cor-bordas-secundario);
}

.conteudo-principal-header-listas-titulo h2 {
  font-size: 2.4rem;
  font-weight: 500;
}

.btn-mobile-adicionar {
  display: none;
}

@media(max-width: 935px) {
  .conteudo-principal-header-listas {
    flex-direction: column;
    margin-bottom: 10px;
  }

  .conteudo-principal-header-listas-titulo {
    order: 2;
  }
}

@media(max-width: 610px) {
  .btn-mobile-adicionar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    border-radius: 5px;
    color: var(--cor-texto-links);
    background: var(--cor-background-btn-adicionar);
  }

  .conteudo-principal-header-listas-titulo {
    justify-content: space-between;
  }
}
</style>