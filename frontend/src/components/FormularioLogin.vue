<template>
  <form class="form-login" @submit.prevent="fazerLogin">
    <div class="msgErro" v-if="loginNaoConfere">
      <p>{{ mensagemErroLogin }}</p>
    </div>
    <div class="box-input-email-usuario">
        <InputComponent 
          ref="emailUsuario" :nome="'email-usuario'" 
          :placeholder="'E-mail'" v-model="usuario.email" 
          :tipoValidacao="'email'" 
          :mensagemInputInvalido="'E-mail inválido.'" 
          :valorInput="usuario.email" required/>
    </div>

    <div class="box-input-senha-usuario">
      <InputComponent 
      ref="senhaUsuario" :nome="'senha-usuario'" 
      :placeholder="'Senha'" v-model="usuario.senha" 
      :tipoValidacao="'senha'" 
      :mensagemInputInvalido="`
        Senha deve conter no mínimo 8 digitos sendo pelo menos:<br>
        1 caractere minúsculo<br>
        1 caractere maiúsculo<br>
        1 caractere numérico`" 
      :valorInput="usuario.senha" 
      :tipo="'password'" required/>
    </div>

    <div class="box-form-btn-entrar">
      <button @click="fazerLogin">Entrar</button>
    </div>
  </form>  
</template>

<script>
import InputComponent from '@/components/InputFormulario';
import { servicesUsuario } from '@/common/services/usuarioServices/servicesUsuario';

export default {
  name: 'FormularioLoginComponent',
  components: {
    InputComponent
  },
  data() {
    return {
      usuario: {
        email: '',
        senha: ''
      },
      loginNaoConfere: false,
      mensagemErroLogin: ''
    }
  },
  methods: {
    validarFormulario() {
      let validacoes = [];
      validacoes.push(this.$refs.emailUsuario.validacao(), this.$refs.senhaUsuario.validacao());
      return validacoes.filter(validacao => validacao == false).length == 0;
    },
    async fazerLogin() {
      const formularioValidado = this.validarFormulario();
      if (formularioValidado) {
        const bodyLogin = {
          login: this.usuario.email,
          senha: this.usuario.senha
        }

        const response = await servicesUsuario.login('Usuario/login', bodyLogin);
   
        if (response.sucesso) {
          localStorage.setItem('usuario', JSON.stringify(response.dados));
          this.loginNaoConfere = false;
          this.$router.push('/');
          
          return;
        }

        this.loginNaoConfere = true;
        this.mensagemErroLogin = response.notificacoes[0].message;
      }
    }
  }
}
</script>

<style scoped>
.msgErro {
  text-align: center;
  color: #ff0000;
  background-color: #ffbbbb;
  padding: 10px;
  border-radius: 4px;
}

.form-login {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box-form-btn-entrar {
  display: flex;
  justify-content: center;
  width: 450px;
}

.box-form-btn-entrar button{
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  color: var(--cor-texto-links);
  background: var(--cor-background-btn-adicionar);
  cursor: pointer;
}

@media (max-width: 610px) {
  .form-login {
    margin-bottom: 0;
  }

  .box-form-btn-entrar {
    width: 310px;
  }
}
</style>