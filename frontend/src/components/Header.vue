<template>
  <header data-js="header">
    <div class="header-telas-com-menu" v-if="telaComMenu">
      <div class="info-usuario">
        <div class="info-usuario-foto-perfil">
          <img src="@/assets/icones/user.png" alt="Foto Perfil" data-js="foto-perfil"/>
        </div>
        <div class="info-usuario-btn-sair">
          <p>Olá <span>{{ nomeUsuario }}</span></p>
          <button @click="logout" class="btn-sair">Sair</button>
        </div>
      </div>

      <BotoesHeader :telaComBotao="telaTemBotao" :rota="rotaBotao" :classe="classeBotao" :nome="nomeBotao"/>
      
      <div class="box-btn-sair-mobile">
        <a class="btn-sair-mobile" @click="logout">
          <img src="@/assets/icones/icone-logout.png" alt="bnt-sair"/>
        </a>
      </div>
    </div>

    <div class="header-telas-sem-menu" v-else>
      <div class="header-telas-sem-menu-box-btn">
        <router-link :to="rotaBotao" target="_self">
          <img src="@/assets/icones/icone-voltar.png" alt="icone voltar página"/>
        </router-link>
      </div>
      <div class="header-telas-sem-menu-box-titulo">
        <h2>{{ tituloTelaSemMenu }}</h2>
      </div>
      <div class="header-telas-sem-menu-box-btn btn-mobile-editar">
        <img src="@/assets/icones/icone-editar.png" alt="icone editar"/>
      </div>
      <div class="header-telas-sem-menu-box-btn btn-mobile-deletar">
        <img src="@/assets/icones/icone-lixeira.png" alt="icone deletar"/>
      </div>
    </div>
  </header>
</template>

<script>
import BotoesHeader from './BotoesHeader.vue';

export default {
  name: 'HeaderComponent',
  props: {
    telaTemBotao: { type: Boolean },
    rotaBotao: { type: String, default: ''},
    nomeBotao: { type: String, default: ''  },
    classeBotao: { type: String, default: ''  }
  },
  components: {
    BotoesHeader
  },
  data() {
    return {
      telaComMenu: true,
      tamanhoTela: 0,
      tituloTelaSemMenu: '',
      nomeUsuario: ''
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/login')
    }
  },
  created() {
    const menu = document.querySelector('[data-js="menu"]');
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    this.nomeUsuario = usuario.nome

    document.body.onresize = () => {
    
      this.tamanhoTela = document.body.clientWidth;

      if (
        this.tamanhoTela < 650 && this.$route.path == '/cliente/adicionar' || 
        this.tamanhoTela < 650 && this.$route.path == '/venda/adicionar' || 
        this.tamanhoTela < 650 && this.$route.path.includes('/venda/editar') || 
        this.tamanhoTela < 650 && this.$route.path.includes('/cliente/editar')) {
        menu.style.display = 'none'
        this.telaComMenu = false;
      } else {
        menu.style.display = 'grid'
        this.telaComMenu = true;
      }
      
    }
   
    if (
      window.innerWidth < 650 && this.$route.path == '/cliente/adicionar' || 
      window.innerWidth < 650 && this.$route.path == '/venda/adicionar' || 
      window.innerWidth < 650 && this.$route.path.includes('/venda/editar') ||
      window.innerWidth < 650 && this.$route.path.includes('/cliente/editar')) {
      menu.style.display = 'none'
      this.telaComMenu = false;
    } else {
      menu.style.display = 'grid'
      this.telaComMenu = true;
    }

    if (this.$route.path == '/cliente/adicionar' || this.$route.path == '/venda/adicionar') {
      this.tituloTelaSemMenu = 'Adicionar'
    }

    if (this.$route.path.includes('/cliente/editar') || this.$route.path.includes('/venda/editar')) {
      this.tituloTelaSemMenu = 'Editar'
    }
  }
}
</script>

<style scoped>
.header-telas-com-menu {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: 2px solid var(--cor-bordas-secundario);
  margin: 0 20px;
  padding: 40px 0px;
}

.info-usuario {
  display: flex;
  align-items: center;
}

.info-usuario-foto-perfil {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.info-usuario-foto-perfil img {
  width: 50px;
  height: 50px;
}

.info-usuario-btn-sair p {
  font-size: 1.8rem;
  font-weight: 700;
}

.btn-sair {
  font-size: 1.8rem;
  color: var(--cor-texto-secundario);
  background: transparent;
  cursor: pointer;
}

.box-btn-sair-mobile {
  display: none;
}

.header-telas-sem-menu {
  display: flex;
  align-items: center;
  border-bottom: 2px solid var(--cor-bordas-secundario);
  margin: 0 20px;
  padding: 40px 0px;
  padding-top: 70px;
}

.header-telas-sem-menu-box-btn {
  width: 24px;
  height: 24px;
}

.header-telas-sem-menu-box-btn a {
  display: flex;
  align-items: center;
}

.header-telas-sem-menu-box-titulo {
  width: calc(100% - 48px);
  text-align: center;
}

.btn-mobile-editar,
.btn-mobile-deletar {
  display: none;
}

@media(max-width: 610px) {
  .header-telas-com-menu,
  .header-telas-sem-menu {
    padding: 25px 0;
    height: 100px;
  }

  .info-usuario-btn-sair span {
    display: block;
  }

  .btn-sair {
    display: none;
  }

  .box-btn-sair-mobile {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-sair-mobile {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
  }

}
</style>