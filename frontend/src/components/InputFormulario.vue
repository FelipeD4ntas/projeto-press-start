<template>
  <label :for="nome">
    {{ label }}
    <input class="input-neutro" :data-js="nome" :type="tipo" :name="nome" v-model="conteudo" @input="obterConteudo" :class="classe" v-mask="mascara" v-money="money" :required="required" :disabled="disable" :placeholder="placeholder"/>
    <span class="mensagem-input-invalido" v-if="!estado" v-html="mensagemInputInvalido"></span>
  </label>
</template>

<script>
import { mask } from 'ke-the-mask';
import { VMoney } from 'v-money';
import { isAfter } from 'date-fns';

export default {
  name: 'InputFormularioComponent',
  props: {
    value: { type: [String, Number], default: null },
    nome: { type: String, required: true },
    label: { type: String, default: '' },
    placeholder: { type: String, default: ''},
    required: { type: Boolean, default: false },
    tipoValidacao: { type: String },
    mensagemInputInvalido: { type: String, default: '' },
    mascara: { default: '' },
    tipo: { type: String, default: 'text'},
    disable: { type: Boolean, default: false },
    money: { default: '' },
    preencherCampos: { type: Boolean, default: false },
    valorInput: { type: [String, Number], required: false },
    tipoFormulario: { type: String },
    senhasConferem: { type: Boolean, required: false }
  },
  directives: {
    mask,
    money: VMoney
  },
  data() {
    return {
      conteudo: this.value,
      estado: true,
      classe: 'input-neutro'
    }
  },
  methods: {
    obterConteudo() {
      this.$emit('update:modelValue', this.conteudo);
      this.validacao();
    },
    validacao() {
      switch(this.tipoValidacao) {
        case 'nome': {
          const regraNome = /^[a-záàâãéèêíïóôõöúçñ ?]{3,}$/i
          const nomePassouNaRegra = regraNome.test(this.conteudo);

          if (this.required && !nomePassouNaRegra) {
            this.estado = false;
            this.classe = 'input-invalido'
            return false;
          } 
         
          break;
        }
       
        case 'email': {
          const regraEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
          const emailPassouNaRegra = regraEmail.test(this.conteudo);

          if (this.required && !emailPassouNaRegra) {
            this.estado = false;
            this.classe = 'input-invalido'
            return false;
          }

          break;
        }

        case 'telefone': {
          const regraTelefone = /^\([1-9]{2}\) (?:[2-8]|9 ?[1-9])[0-9]{3}-[0-9]{4}$/
          const telefonePassouNaRegra = regraTelefone.test(this.conteudo);

          if (this.required && !telefonePassouNaRegra) {
            this.estado = false;
            this.classe = 'input-invalido'
            return false;
          }

          break;
        }

        case 'cpf': {
          const regraCPF =  /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/
          const cpfPassouNaRegra = regraCPF.test(this.conteudo);

          if (this.required && !cpfPassouNaRegra) {
            this.estado = false;
            this.classe = 'input-invalido'
            return false;
          }
          
          break;
        }

        case 'descricaoItem': {
          if (this.required && this.conteudo.length < 3) {
            this.estado = false;
            this.classe = 'input-invalido'
            return false;
          }

          break;
        }

        case 'precoUnitario': {
          const valorPrecoBruto = this.conteudo.replace(/\D/g, '');
          if (this.required && valorPrecoBruto == 0) {
            this.estado = false;
            this.classe = 'input-invalido'
            return false;
          }
          
          break;
        }

        case 'quantidadeItem': {
          if (this.required && Number(this.conteudo) == 0 ||  isNaN(Number(this.conteudo))) {
            this.estado = false;
            this.classe = 'input-invalido'
            return false;
          }
          break;
        }

        case 'valorTotal': {
          this.classe = 'input-neutro'
          return
        }

        case 'senha': {
          const regraSenha = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/
          const senhaLoginPassouNaRegra = regraSenha.test(this.conteudo);

          if (this.required && !senhaLoginPassouNaRegra) {
            this.estado = false;
            this.classe = 'input-invalido'
            return false;
          }
          
          break;
        }

        case 'confirmarSenha': {
          if (this.required && !this.senhasConferem) {
            this.estado = false;
            this.classe = 'input-invalido'
            return false;
          }
          
          break;
        }
      } 

      if (this.tipoValidacao == 'dataFaturamento' && this.tipoFormulario == 'Adicionar venda') {
        const dia = this.conteudo.slice(0, 2);
        const mes = this.conteudo.slice(3,5);
        const ano = this.conteudo.slice(6,10);
        const horas = new Date().getHours();
        const minutos = new Date().getMinutes();
        const segundos = new Date().getSeconds();
        const millisegundos = new Date().getMilliseconds();
        const dataDigitada = new Date(ano, mes - 1, dia, horas, minutos, segundos, millisegundos);
        const dataNaoPassouNaRegra = isAfter(new Date(), dataDigitada)
        
        if (this.required && dataNaoPassouNaRegra) {
          this.estado = false;
          this.classe = 'input-invalido'
          return false;
        }
      } else if (this.tipoValidacao == 'dataFaturamento') {
        const dataNaoPassouNaRegra = this.conteudo.length == 0;
        if (this.required && dataNaoPassouNaRegra) {
          this.estado = false;
          this.classe = 'input-invalido'
          return false;
        }
      }
      
      this.classe = 'input-valido'
      this.estado = true;
      return true;
    }
  },
  watch: {
    valorInput() {   
      this.classe = 'input-valido';
      this.conteudo = this.valorInput;
    }
  }
}
</script>

<style scoped>
.input-neutro {
  border-color: var(--cor-principal) !important; 
}

.input-invalido {
  border-color: var(--cor-bordas-input-invalido) !important;
}

.input-valido {
  border-color: var(--cor-principal) !important;
}

.mensagem-input-invalido {
  display: block;
  font-size: 1.3rem;
  color: var(--cor-bordas-input-invalido);
}

 label {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  color: var(--cor-texto-secundario);
  margin-top: 10px;
  width: 100%;
  position: relative;
}

 input,
 select {
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

@media(max-width: 610px) {
  .conjunto-input label:nth-of-type(1) input, 
  .conjunto-input label:nth-of-type(1) input {
    margin-right: 0px;
  }
}
</style>