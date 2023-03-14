<template>
  <Header :telaComMenu="true"/>
  <div class="conteudo-principal">
    <div class="conteudo-principal-dashboard-boas-vindas">
      <p>Bem-vindo</p>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header';

export default {
  name: 'DashboardPage',
  components: {
    Header
  }
}
</script>

<style scoped>
.conteudo-principal-dashboard-boas-vindas {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  height: 100%;
  width: 100%;
}

.conteudo-principal-dashboard-boas-vindas p {
  font-size: 2.5rem;
  font-weight: 700;
}
</style>