<template>
  <form class="form-add-usuario" @submit.prevent="criarUsuario">
    <div class="logo-lyncas-criar-usuario">
      <img src="@/assets/img/logo-lyncas-azul.png" alt="Logo Lyncas"/>
    </div>
    <h2>Criar Conta</h2>
    <div class="box-form-conjunto-input conjunto-input">
      <InputComponent 
        ref="nomeUsuario" :nome="'nome-criar-usuario'" 
        :label="'Nome'" v-model="usuario.nome" 
        :tipoValidacao="'nome'" 
        :mensagemInputInvalido="'Deve conter pelo menos três caracteres e não pode conter números ou caracteres especiais.'" 
        :valorInput="usuario.nome" required/>

        <InputComponent 
            ref="emailUsuario" :nome="'email-criar-usuario'" 
            :label="'Email'" v-model="usuario.email" 
            :tipoValidacao="'email'" 
            :mensagemInputInvalido="'E-mail inválido.'" 
            :valorInput="usuario.email" required/>
    </div>

    <div class="box-form-conjunto-input conjunto-input">
      <InputComponent 
        ref="senhaUsuario" :nome="'senha-usuario'" 
        :label="'Senha'" v-model="usuario.senha" 
        :tipoValidacao="'senha'" 
        :mensagemInputInvalido="`
          Senha deve conter no mínimo 8 digitos sendo pelo menos:<br>
          1 caractere minúsculo<br>
          1 caractere maiúsculo<br>
          1 caractere numérico<br>`" 
        :valorInput="usuario.senha" 
        :tipo="'password'" required/>

        <InputComponent 
            ref='confirmarSenha' :nome="'confirmar-senha-usuario'" 
            :label="'Confirmar Senha'" v-model="usuario.confirmarSenha" 
            :tipoValidacao="'confirmarSenha'" 
            :mensagemInputInvalido="'Senhas não conferem.'" 
            :valorInput="usuario.confirmarSenha" 
            :tipo="'password'" :senhasConferem="senhaVerificada" required/>
    </div>

    <div class="box-form-btn-salvar-usuario">
      <button type="submit">Criar Conta</button>
    </div>
    <div class="box-ja-possui-conta">
      <div class="box-link-ja-possui-conta">
        <p>Já possui uma conta? <button @click="irParaTelaLogin" type="button">Fazer login</button></p>
      </div>
    </div>
  </form>
  <Popup :conteudo="notificacao" v-show="mostrarPopup" @fechar="fecharPopup"/>
</template>

<script>
import InputComponent from './InputFormulario';
import Popup from './Popup.vue';
import { servicesUsuario } from '@/common/services/usuarioServices/servicesUsuario';

export default {
  name: 'FormularioCriarUsuarioComponent',
  components: {
    InputComponent,
    Popup
  },
  emits: ['voltarTelaLogin'],
  data() {
    return {
      usuario: {
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: ''
      },
      notificacao: null,
      mostrarPopup: false,
      usuarioCadastrado: false
    }
  },
  computed: {
    senhaVerificada() {
      return this.usuario.senha == this.usuario.confirmarSenha
    }
  },
  methods: {
    validarFormulario() {
      let validacoes = [];
      validacoes.push(this.$refs.nomeUsuario.validacao(), this.$refs.emailUsuario.validacao(), this.$refs.senhaUsuario.validacao(), this.$refs.confirmarSenha.validacao());
      return validacoes.filter(validacao => validacao == false).length == 0;
    },
    async criarUsuario() {
      const formularioValidado = this.validarFormulario();

      if (formularioValidado) {
        const bodyCriarUsuario = {
          nome: this.usuario.nome,
          email: this.usuario.email.toLowerCase(),
          senha: this.usuario.senha,
          confirmacaoSenha: this.usuario.confirmarSenha
        }

        const response = await servicesUsuario.criarUsuario('Usuario/adicionar', bodyCriarUsuario);

        if (response.sucesso) {
          this.notificacao = response.dados.mensagem;
          this.mostrarPopup = true;
          this.usuarioCadastrado = true;
          return;
        }

        this.notificacao = response.notificacoes[0].message;
        this.mostrarPopup = true;
      }
    },
    irParaTelaLogin() {
      this.$emit('voltarTelaLogin');
      this.$refs.nomeUsuario.conteudo = '';
      this.$refs.emailUsuario.conteudo = '';
      this.$refs.senhaUsuario.conteudo = '';
      this.$refs.confirmarSenha.conteudo = '';
    },
    fecharPopup() {
      this.mostrarPopup = !this.mostrarPopup;
      if (this.usuarioCadastrado) {
        this.irParaTelaLogin();
      }
    }
  }
}
</script>

<style>
.box-ja-possui-conta {
  display: flex;
  justify-content: flex-end;
}

.box-link-ja-possui-conta {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: calc(50% - 10px);
}

.box-link-ja-possui-conta p {
  font-weight: 500;
}

.box-link-ja-possui-conta button {
  color: var(--cor-principal);
  background: transparent;
  font-weight: 700;
  font-size: 1.6rem;
  cursor: pointer;
}

@media (max-width: 610px) {
  .box-link-ja-possui-conta {
    justify-content: center;
    margin-right: 0;
  }
}
</style>