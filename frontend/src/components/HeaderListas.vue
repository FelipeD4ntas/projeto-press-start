<template>
<div class="conteudo-principal-header-listas">
  <div class="conteudo-principal-header-listas-titulo">
    <h2>Lista de {{ nome }}</h2>
    <router-link :to="rota" target="_Self" class="btn-mobile-adicionar">+</router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'HeaderListasComponent',
  props: {
    nome: { type: String },
    rota: { type: String, required: true}
  }
}
</script>

<style scoped>
.conteudo-principal-header-listas {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.conteudo-principal-header-listas-titulo {
  display: flex;
  align-items: center;
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