<template>
  <section class="conteudo-principal-pagina-inicial">
    <div class="pagina-inicial-lado-esquerdo">
      <div class="pagina-inicial-lado-esquerdo-logo-lyncas">
        <img src="@/assets/img/logo-lyncas-branco.png" alt="Logo Lyncas"/>
      </div>
  
      <div class="pagina-inicial-lado-esquerdo-descricao-lyncas">
        <p>
          Bem-vindo ao Lyncas Sales, uma aplicação<br>
          simples para gerenciar vendas e clientes.
        </p>
      </div>
    </div>
  
    <div class="pagina-inicial-lado-direito">
      <h1>Login</h1>

      <FormularioLogin/>
    
      <div class="box-link-criar-conta">
        <p>Ainda não tem conta? <button @click="irParaTelaCriarConta = !irParaTelaCriarConta">Criar conta</button></p>
      </div>
    </div>
  </section>

  <transition>
    <section class="box-form-criar-usuario" data-js="box-form-criar-usuario" v-if="irParaTelaCriarConta">
      <div class="conteudo-principal-telaAddUsuario">
        <FormularioCriarUsuario @voltarTelaLogin="voltar"/>
      </div>
    </section>
  </transition>

  
</template>

<script>
import FormularioLogin from '@/components/FormularioLogin';
import FormularioCriarUsuario from '@/components/FormularioCriarUsuario';

export default {
  name: 'LoginPage',
  data() {
    return {
      irParaTelaCriarConta: false
    }
  },
  components: {
    FormularioLogin,
    FormularioCriarUsuario
  },
  methods: {
    voltar() {
      this.irParaTelaCriarConta = false
    }
  },
  created() {
    const menu = document.querySelector('[data-js="menu"]');
    menu.style.display = 'none'
  }
}
</script>

<style>
.v-enter-active,
.v-leave-active,
.v-move {
  transition: all 1s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(100%);
}
   

.conteudo-principal-pagina-inicial {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 100vh;
  position: relative;
}

.pagina-inicial-lado-esquerdo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--cor-principal);
  height: 100%;
  flex: 1 1 auto;
}

.pagina-inicial-lado-esquerdo-logo-lyncas {
  margin-bottom: 30px;
}

.pagina-inicial-lado-esquerdo-logo-lyncas img {
  width: 240px;
  height: 55px;
}

.pagina-inicial-lado-esquerdo-descricao-lyncas p {
  font-size: 2.4rem;
  color: var(--cor-texto-links);
}

.pagina-inicial-lado-direito {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  flex: 1 1 auto;
}

.pagina-inicial-lado-direito h1 {
  font-size: 4rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 30px;
}

.pagina-inicial-lado-direito label {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  color: var(--cor-texto-secundario);
  margin-top: 20px;
  width: 450px;
}

.pagina-inicial-lado-direito input {
  font-size: 1.7rem;
  border: 1px solid var(--cor-bordas-secundario);
  border-radius: 5px;
  padding: 10px;
  height: 51px;
  display: flex;
}

.box-link-criar-conta {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.box-link-criar-conta p {
  font-weight: 500;
}

.box-link-criar-conta button {
  color: var(--cor-principal);
  background: transparent;
  font-weight: 700;
  font-size: 1.6rem;
  cursor: pointer;
}

.box-form-criar-usuario {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  transition: 1s;
}

.conteudo-principal-telaAddUsuario {
  display: flex;
  justify-content: center;
  height: 100%;
  background: var(--cor-background-secundario);
  padding: 25px 25px 75px 25px;
}

.form-add-usuario {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-add-usuario h2 {
  font-size: 3rem;
}

.logo-lyncas-criar-usuario {
  align-self: center;
  margin-bottom: 50px;
}

.logo-lyncas-criar-usuario img {
  width: 250px;
}

.box-form-conjunto-input {
  display: flex;
  margin-bottom: 10px;
}

.box-form-conjunto-input label {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  color: var(--cor-texto-secundario);
  margin-top: 10px;
  width: 100%;
  position: relative;
}

.box-form-conjunto-input input {
  border: 1px solid var(--cor-bordas-secundario);
  border-radius: 5px;
  padding: 10px;
  height: 51px;
  display: flex;
}

.conjunto-input label:nth-of-type(1) input,
.conjunto-input label:nth-of-type(1) input {
  margin-right: 15px;
}

.conjunto-input label:nth-of-type(1) input,
.conjunto-input label:nth-of-type(1) input {
  margin-right: 15px;
}

.box-form-btn-salvar, 
.box-form-btn-salvar-usuario {
  display: flex;
  justify-content: end;
}

.box-form-btn-salvar button, 
.box-form-btn-salvar-usuario button {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  width: calc(50% - 10px);
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  color: var(--cor-texto-links);
  background: var(--cor-background-btn-adicionar);
  cursor: pointer;
}

@media (max-width: 880px) {
  .pagina-inicial-lado-esquerdo {
    height: 30vh;
  }

  .pagina-inicial-lado-direito {
    height: 70vh;
  }
}

@media (max-width: 610px) {
  .pagina-inicial-lado-esquerdo-logo-lyncas img {
    width: 150px;
    height: 40px;
  }
  .pagina-inicial-lado-esquerdo-descricao-lyncas p {
    font-size: 1.7rem;
    color: var(--cor-texto-links);
  }

  .pagina-inicial-lado-direito h1 {
    margin-top: 0;
  }

  .pagina-inicial-lado-direito h1 {
    margin-top: 40px;
    margin-bottom: 0;
    font-size: 3.3rem;
  }

  .pagina-inicial-lado-direito label {
    width: 310px;
  }

  .conteudo-principal-telaAddUsuario {
    padding-bottom: 25px;
  }

  .form-add-usuario {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .form-add-usuario h2 {
    text-align: center;
  }

  .logo-lyncas-criar-usuario {
    margin-bottom: 0;
  }

  .conjunto-input label:nth-of-type(1) input, 
  .conjunto-input label:nth-of-type(1) input {
    margin-right: 0px;
  }

  .box-form-btn-salvar-usuario button {
    margin-top: 0;
  }

  .box-form-btn-salvar-usuario {
    display: flex;
    align-items: flex-end;
    width: 100%;
  }

  .box-form-btn-salvar-usuario button {
    width: 100%;
    height: max-content;
  }

  .box-form-btn-cancelar button {
    width: 100%;
    margin-top: 5px;
  }

  .box-form-conjunto-input {
    flex-direction: column;
  }
}
</style>