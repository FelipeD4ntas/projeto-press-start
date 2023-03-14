<template>
  <div class="box-botoes-header" v-if="telaComBotao">
    <div  class="box-btn">
      <router-link :class="classe" :to="rota" target="_self">{{ nome }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BotoesHeaderComponent',
  props: {
    telaComBotao: { type: Boolean, default: false },
    rota: { type: String, required: true},
    nome: { type: String, required: true },
    classe: { type: String, required: true }
  }
}
</script>

<style scoped>
.box-botoes-header button:hover,
.btn-adicionar:hover {
  transform: scale(0.98);
}

.box-btn {
  display: flex;
}

.btn-voltar {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  width: 200px;
  color: var(--cor-texto-links);
  background: var(--cor-btn);
  padding: 11px 45px;
  border-radius: 5px;
  cursor: pointer;
}

 .btn-adicionar {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  width: 200px;
  padding: 10px;
  border-radius: 5px;
  color: var(--cor-texto-links);
  background: var(--cor-background-btn-adicionar);
  cursor: pointer;
}

.btn-sair-mobile {
  display: none;
}

@media(max-width: 610px) {
  .btn-voltar-header,
  .btn-adicionar-header {
    display: none;
  }

  .btn-sair-mobile {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
  }

  .box-botoes-header {
    display: none;
  }
}
</style>