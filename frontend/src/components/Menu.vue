<template>
<aside class="menu-lateral" data-js="menu" v-once>
  <div class="menu-lateral-logo-lyncas">
    <router-link to="/"><img src="@/assets/img/logo-lyncas-branco.png" alt="Logo Lyncas"/></router-link>
  </div>
  <nav class="menu-lateral-links">
    <router-link exact exact-active-class="pagina-ativa" to="/" target="_self">
      <img src="@/assets/icones/dashboard-icon.png" alt="icone dashboard"/>
      Dashboard
    </router-link>
    <router-link exact exact-active-class="pagina-ativa" to="/clientes" target="_self">
      <img src="@/assets/icones/clientes-icon.png" alt="icone clientes"/>
      Clientes
    </router-link>
    <router-link exact exact-active-class="pagina-ativa" to="/vendas" target="_self">
      <img src="@/assets/icones/shopping-cart-icon.png" alt="icone carrinho de compras"/>
      Vendas
    </router-link>
  </nav>
</aside>
</template>

<script>
export default {
  name: 'MenuComponent'
}
</script>

<style scoped>
.menu-lateral {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: 
  "logo" 
  "links";
  justify-items: center;
  background: var(--cor-principal);
  padding: 60px 15px;
  width: 170px;
  height: 100vh;
  float: left;
}

.menu-lateral-logo-lyncas {
  grid-area: logo;
}

.menu-lateral-logo-lyncas img {
  width: 105px;
}

.menu-lateral-links {
  grid-area: links;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-lateral-links a {
  display: flex;
  align-items: center;
  color: var(--cor-texto-links);
  padding: 6px 10px;
  border-radius: 5px;
  border: 1px solid var(--cor-bordas);
}

.menu-lateral-links img {
  margin-right: 10px;
}

.pagina-ativa {
  background: var(--cor-bordas);
}

@media(max-width: 610px) {
  .menu-lateral {
    grid-template-areas: "links";
    align-items: center;
    padding: 10px;
    width: 100%;
    height: 76px;
    float: none;
    position: fixed;
    bottom: 0;
    z-index: 2;
  }

  .menu-lateral-logo-lyncas {
    display: none;
  }

  .menu-lateral-links {
    flex-direction: row;
  }

  .menu-lateral-links a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    color: #ffffffa8;
    border: none;
    width: 95px;
  }

  .menu-lateral-links img {
    margin-right: 0;
  }

  .pagina-ativa {
    background: transparent;
    color: var(--cor-texto-links);
  }

}

</style>