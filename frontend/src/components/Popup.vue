<template>
<div class="popup" v-if="tipo == 'Finalizar'">
  <div class="conteudo-popup">
    <button class="closedPopup" @click="$emit('fechar')">X</button>
    <p>{{ conteudo }}</p>
    <div class="box-btn-popup">
      <button class="btn-popup" @click="$emit('fechar')">OK</button>
    </div>
  </div>
</div>

<div class="popup" v-else-if="tipo == 'Deletar'">
  <div class="conteudo-popup">
    <button class="closedPopup" @click="$emit('fechar')">X</button>
    <p>Apagar Registro?</p>
    <div class="box-btn-popup">
      <button class="btn-popup" @click="$emit('confirmar')">SIM</button>
      <button class="btn-popup" @click="$emit('naoDeletar')">NÃO</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'PopupComponent',
  props: {
    tipo: { type: String, default: 'Finalizar' },
    conteudo: { type: String }
  }
}
</script>

<style scoped>
.popup {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: #00000080;
  z-index: 175;
  display: flex;
  justify-content: center;
  align-items: center;
}

.conteudo-popup {
  background: var(--cor-bordas);
  width: 25%;
  min-width: 300px;
  padding: 20px;
  border: 10px solid var(--cor-background);
  box-shadow: 0 0 0 10px var(--cor-bordas);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--cor-texto-links);
}

.conteudo-popup p {
  text-align: center;
}

.closedPopup {
  position: absolute;
  top: -30px;
  right: -30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 4px solid var(--cor-background);
  background: var(--cor-bordas);
  color: var(--cor-texto-links);
  font-weight: bold;
  font-size: 1.2em;
  cursor: pointer;
  box-shadow: 4px 4px 0 #0000004d;
}

.box-btn-popup {
  display: flex;
  gap: 15px;
  width: 100%;
}

.btn-popup {
  flex: 1 1 auto;
  width: max-content;
  padding: 5px;
  border: 3px solid var(--cor-background);
  margin-top: 15px;
  font-size: 1.1em;
  background: transparent;
  font-weight: bold;
  color: var(--cor-texto-links);
  border-radius: 6px;
  cursor: pointer;
}
</style>