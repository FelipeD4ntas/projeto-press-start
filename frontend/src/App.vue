<template>
  <Menu/>
  <main class="box-principal">
    <router-view v-slot="{ Component, route }">
      <transition 
        :enter-active-class="classeTransitionEntrada"
        :leave-active-class="classeTransitionSaida"
        mode="out-in"
        name="rotas">
        <div :key="route" class="box-principal">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </main>
</template>

<script>
import Menu from '@/components/Menu';

export default {
  name: 'App',
  components: {
    Menu
  },
  data() {
    return {
      classeTransitionEntrada: 'animate__animated animate__backInDown',
      classeTransitionSaida: 'animate__animated animate__backOutDown',
    }
  }
}
</script>

<style>
@charset "UTF-8";

@import url('https://fonts.googleapis.com/css2?family=Jost:wght@100;400;500;700&display=swap');

* {
  font-family: 'Jost', sans-serif;
  text-decoration: none;
  box-sizing: border-box;
  margin: 0;
  border: 0;
  padding: 0;
  outline: 0;
}

:root {
  --cor-principal: #274A9D;
  --cor-texto: #26324B;
  --cor-texto-secundario: #7B828D;
  --cor-texto-links: #FFFFFF;
  --cor-bordas: #1C3B85;
  --cor-bordas-secundario: #E5EBF1;
  --cor-bordas-input-valido: #03C874;
  --cor-bordas-input-invalido: #ff0000;
  --cor-background: #F8F8F8;
  --cor-background-secundario: #FFFFFF;
  --cor-background-btn-editar: #F6FAFD;
  --cor-background-btn-deletar: #FDF6F6;
  --cor-background-btn-adicionar: #03C874;
  --cor-btn: #BFBFBF;
  --cor-btn-editar: #6490CA;
  --cor-btn-deletar: #C27476;
}

html {
  font-size: 62.5%;
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}

body {
  font-size: 1.6rem;
  background: var(--cor-background-secundario);
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}



.rotas-leave-to {
  overflow: hidden;
}

.conteudo-principal {
  height: 100%;
  margin: 25px 20px;
  padding-bottom: 35px;
  overflow: hidden;
}

.box-principal {
  display: flex;
  flex-direction: column;
  height: 100vh;
  clear: right;
  background: var(--cor-background);
}

@media(max-width: 610px) {
  .conteudo-principal {
    height: 50%;
    padding-bottom: 0px;
  }
}
</style>