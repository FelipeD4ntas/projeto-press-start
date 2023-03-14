<template>
  <label :for="label">
    <input :name="name" :type="tipo" :id="label" :value="valorInput" v-model="conteudo" @input="obterConteudo"/> {{ label }}
    <span class="icone-check"></span>
  </label>
</template>

<script>
export default {
  name: 'InputFiltroComponent',
  props: {
    tipo: { type: String, defaut: 'text' },
    name: { type: String },
    label: { type: String },
    valorInput: { type: String }
  },
  data() {
   return {
    conteudo: this.valorInput
   }
  },
  methods: {
    obterConteudo() {
      this.$emit('update:modelValue', this.conteudo);
    }
  },
  created() {
    this.$emit('update:modelValue', this.conteudo);
  }
} 
</script>

<style>
.filtros-clientes label,
.filtros-vendas label {
  font-size: 1.7rem;
  margin: 9px;
  margin-top: 5px;
  display: inline-flex;
  align-items: center;
  position: relative;
}

.filtros-clientes label input,
.filtros-vendas label input {
  margin-right: 5px;
  opacity: 0;
}

.filtros-clientes label:hover input ~ .icone-check,
.filtros-vendas label:hover input ~ .icone-check {
  background-color: #ccc;
}

.filtros-clientes label input:checked ~ .icone-check,
.filtros-vendas label input:checked ~ .icone-check { 
  background-color: var(--cor-background-btn-adicionar);
}

.icone-check {
  position: absolute;
  top: 5px;
  left: -2px;
  height: 17px;
  width: 17px;
  background-color: var(--cor-principal);
  border-radius: 2px;
  box-shadow: inset 0px 2px 5px #00000074;
}

.icone-check::after {
  content: "";
  position: absolute;
  display: none;
  top: 2px;
  left: 5.4px;
  height: 8px;
  width: 4px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.filtros-clientes label input:checked ~ .icone-check::after,
.filtros-vendas label input:checked ~ .icone-check::after {
  display: block;
}

</style>