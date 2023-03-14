<template>
  <Header
    :telaComMenu="true"
    :telaTemBotao="true"
    :rotaBotao="rotaListaVendas"
    :nomeBotao="'Voltar'"
    :classeBotao="'btn-voltar'"/>

    <form class="conteudo-principal-add-venda" @submit.prevent="submit">
      <h2>{{ tipoFormulario }}</h2>
      <div class="conjunto-input">
        <label for="nome-cliente">
          Cliente
          <select name="nome-cliente" class="select-clientes" v-model="venda.cliente" required>
            <option disabled value="" class="option-selecione-cliente" selected>Selecione um cliente</option>
            <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.nome }}</option>
          </select>
          <img class="icone-select" src="@/assets/icones/icone-select.png" alt="icone select"/>
        </label>

        <InputComponent
          ref="dataFaturamento" :nome="'dataFaturamento'"
          :label="'Data de faturamento'" v-model="venda.dataFaturamento"
          :tipoValidacao="'dataFaturamento'" :mascara="'##/##/####'"
          :mensagemInputInvalido="'Data inválida.'"
          :valorInput="venda.dataFaturamento"
          :tipoFormulario="tipoFormulario" required/>
      </div>

      <div class="box-forms-itens-pedido">
        <h3 class="subtitulo-form">Itens do pedido</h3>
        <div class="box-itens-do-pedido" v-for="(item, index) in venda.itens" :key="index">
          <button type="button" class="icone-deletar-item" v-show="menosItens" @click="deletarItem">
            <img src="@/assets/icones/icone-deletar-item.png" alt="icone-deletar-item"/>
          </button>
          <div class="conjunto-input">
            <InputComponent
              :ref="`descricaoItem-${index}`" :nome="'descricaoItem'"
              :label="'Descrição do item'" v-model="item.descricaoItem"
              :tipoValidacao="'descricaoItem'"
              :mensagemInputInvalido="'Descrição deve conter pelo menos três caracteres.'"
              :valorInput="item.descricaoItem"  required/>

              <InputComponent
                :ref="`precoUnitario${index}`" :nome="'precoUnitario'"
                :label="'Valor unitário'" v-model="item.precoUnitario"
                :tipoValidacao="'precoUnitario'"
                :mensagemInputInvalido="'Valor inválido.'"  :money="money"

                :valorInput="item.precoUnitario" required/>
          </div>
          <div class="conjunto-input">
            <InputComponent
                :ref="`quantidadeItem${index}`" :nome="'quantidadeItem'"
                :label="'Quantidade'" v-model="item.quantidade"
                :tipoValidacao="'quantidadeItem'"
                :mensagemInputInvalido="'Escolha uma quantidade válida.'"
                
                :mascara="'##########'"
                :valorInput="item.quantidade" required/>

              <InputComponent
                :ref="`valorTotal${index}`" :nome="'valorTotal'"
                :label="'Valor total'" v-model="valorTotal[index]"
                :tipoValidacao="'valorTotal'"
                :mensagemInputInvalido="'Escolha uma quantidade.'" :money="money"
                :preencherCampos="true"
                :valorInput="valorTotal[index]"  disable/>
          </div>
        </div>
        <div class="btn-mais-itens" id="box-mais-itens">
          <button type="button" @click="adicionarMaisItens">+ Mais itens</button>
        </div>
      </div>

      <div class="box-form-btn-salvar">
        <p class="saida-total-vendas">Total: <span class="cifrao">{{ valorTotalVenda }}</span></p>
        <button>Salvar</button>
      </div>
    </form>
    <Popup :conteudo="notificacao" v-show="mostrarPopup" @fechar="fecharPopup"/>
</template>

<script>
import Header from '@/components/Header';
import InputComponent from '@/components/InputFormulario';
import Popup from './Popup';
import { servicesVenda } from '@/common/services/vendasServices/servicesVenda';
import { servicesCliente } from '@/common/services/clienteServices/sevicesCliente';
import { format } from 'date-fns';

export default {
  name: 'AdicionarVendaPage',
  components: {
    Header,
    InputComponent,
    Popup
  },
  props: {
    id: { type: String }
  },
  data() {
    return {
      rotaListaVendas: '/vendas',
      tipoFormulario: '',
      venda: {
        cliente: '',
        dataFaturamento: null,
        itens: []
      },
      notificacao: null,
      mostrarPopup: false,
      responseOk: false,
      valorTotalVenda: 'R$ 0,00',
      clientes: [],
      menosItens: false,
      submit: null,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false
      }
    }
  },
  computed: {
    valorTotal() {
      let valores = [];

      for (let i = 0; i < this.venda.itens.length; i++) {

        const valorPrecoBruto = this.venda.itens[i].precoUnitario.replace(/\D/g, '');
        const estiloDaMoeda = new Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'});

        valores.push(estiloDaMoeda.format((valorPrecoBruto / 100) * this.venda.itens[i].quantidade));
      }

      return valores;
    }
  },
  watch: {
    valorTotal() {
      this.valorTotalVenda = this.valorTotal.reduce((acc, valor) => {
        acc += valor.replace(/\D/g, '') / 100

        return acc;
      }, 0).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
    }
  },
  methods: {
    async adicionarVenda() {
      const descricoes = document.querySelectorAll('[data-js="descricaoItem"]');
      const valores = document.querySelectorAll('[data-js="precoUnitario"]');
      const quantidades = document.querySelectorAll('[data-js="quantidadeItem"]');

      const bodyVendaAPI = {
        clienteId: this.venda.cliente,
        dataFaturamento: new Date(this.venda.dataFaturamento.split('/').reverse().join('/')).toISOString(),
        itens: []
      }

      for (let index = 0; index < quantidades.length; index++) {
        bodyVendaAPI.itens.push(
          {
            descricaoItem: descricoes[index].value,
            quantidade: Number(quantidades[index].value),
            precoUnitario: parseFloat(valores[index].value.replace(/[^0-9]+/g,'')) / 100
          }
        )
      }

      const response = await servicesVenda.adicionar('Venda/adicionar', bodyVendaAPI);
      this.mostrarPopup = true;

      if (response.sucesso) {
        this.notificacao = response.dados.mensagem;
        this.responseOk = true;
        return
      }

      this.notificacao = response.notificacoes[0].message;
    },
    async editarVenda() {
      const descricoes = document.querySelectorAll('[data-js="descricaoItem"]');
      const valores = document.querySelectorAll('[data-js="precoUnitario"]');
      const quantidades = document.querySelectorAll('[data-js="quantidadeItem"]');
   
      const bodyVendaAPI = {
        id: this.id,
        clienteId: this.venda.cliente,
        dataFaturamento: new Date(this.venda.dataFaturamento.split('/').reverse().join('/')).toISOString(),
        itens: []
      }
     
      for (let index = 0; index < quantidades.length; index++) {
        bodyVendaAPI.itens.push(
          {
            descricaoItem: descricoes[index].value,
            quantidade: Number(quantidades[index].value),
            precoUnitario: parseFloat(valores[index].value.replace(/[^0-9]+/g,'')) / 100
          }
        )
      }

      const response = await servicesCliente.atualizar('Venda/atualizar', bodyVendaAPI);
      this.mostrarPopup = true;

      if (response.sucesso) {
        this.notificacao = response.dados.mensagem;
        this.responseOk = true;
        return
      }

      this.notificacao = response.notificacoes[0].message;
    },
    adicionarMaisItens() {
      this.menosItens = true;

      this.venda.itens.push(
        {
          descricaoItem: null,
          quantidade: null,
          precoUnitario: 'R$ 0,00'
        }
      )
    },
    deletarItem(event) {
     const boxItensPedido = document.querySelectorAll('.box-itens-do-pedido');

      if (event.target.parentNode.parentNode.classList.contains('box-itens-do-pedido')) {
        if (boxItensPedido.length == 1) {
          return
        }

        event.target.parentNode.parentNode.remove();
        this.definirValorTotal();
      }
    },
    definirValorTotal() {
      const valores = document.querySelectorAll('[data-js="precoUnitario"]');
      const quantidades = document.querySelectorAll('[data-js="quantidadeItem"]');

      for (let i = 0; i < quantidades.length; i++) {
        const valorPrecoBruto = valores[i].value.replace(/\D/g, '');
        const estiloDaMoeda = new Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'});

        this.valorTotalVenda = (estiloDaMoeda.format((valorPrecoBruto / 100) * quantidades[i].value));
      }
    },
    fecharPopup() {
      this.mostrarPopup = !this.mostrarPopup;
      if (this.responseOk) {
        this.$router.push('/vendas');
      }
    }
  },
  async created() {
    if (this.$route.path == '/venda/adicionar') {
      this.submit = this.adicionarVenda;
      this.tipoFormulario = 'Adicionar venda';
      this.venda.itens.push(
        {
          descricaoItem: null,
          quantidade: null,
          precoUnitario: 'R$ 0,00'
        }
      );
    }

    if (this.$route.path.includes('/venda/editar')) {
      const response = await servicesVenda.obter(`Venda/obter/${this.id}`);
      const responseClientes = await servicesCliente.listar("Cliente/listar");
      this.submit = this.editarVenda;
      this.tipoFormulario = 'Editar venda';
      this.menosItens = true;
      this.clientes = responseClientes.dados.clientes;
      this.venda.dataFaturamento = format(new Date(response.dados.dataFaturamento), 'dd/MM/yyyy');
      response.dados.itens.forEach((item, index) => {
        this.venda.itens[index].descricaoItem = item.descricaoItem
        this.venda.itens[index].quantidade = item.quantidade
        this.venda.itens[index].precoUnitario = item.precoUnitario.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
      })
    }
  },
  async mounted() {
   const response = await servicesVenda.obter(`Venda/obter/${this.id}`);
   response.dados.itens.forEach(() => {
      this.venda.itens.push(
        {
          descricaoItem: '',
          quantidade: 0,
          precoUnitario: 'R$ 0,00'
        }
      )
    });
  }
}
</script>

<style scoped>
.icone-deletar-item {
  display: flex;
  justify-content: right;
  width: 100%;
  margin-top: 10px;
  background: transparent;
  cursor: pointer;
}

.icone-deletar-item img {
  width: 30px;
}

.option-selecione-cliente {
  font-size: 1.7rem;
  font-weight: bold;
}

.conteudo-principal-add-venda {
  background: var(--cor-background-secundario);
  padding: 25px;
  border-radius: 5px;
  margin: 25px 20px;
  overflow-y: auto;
}

.conjunto-input {
  display: flex;
  margin-bottom: 10px;
}

.conjunto-input label {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  color: var(--cor-texto-secundario);
  margin-top: 10px;
  width: 100%;
  position: relative;
}

.conjunto-input input,
.conjunto-input select {
  border: 1px solid var(--cor-bordas-secundario);
  border-radius: 5px;
  padding: 10px;
  height: 51px;
  display: flex;
}

.conjunto-input label:nth-of-type(1) input,
.conjunto-input label:nth-of-type(1) input,
.conjunto-input label:nth-of-type(1) select {
  margin-right: 15px;
}

.conjunto-input select {
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  font-size: 1.7rem;
}

.icone-select {
  width: 16px;
  height: 8px;
  position: absolute;
  right: 25px;
  top: 45px;
}

.box-forms-itens-pedido {
  display: flex;
  flex-direction: column;
  padding: 25px 0;
  margin: 20px 0;
  border-top: 1px dashed var(--cor-bordas-secundario);
  border-bottom: 1px dashed var(--cor-bordas-secundario);
}

.subtitulo-form {
  font-size: 1.8rem;
  font-weight: 500;
}

.btn-mais-itens {
  display: flex;
  justify-content: flex-end;
}

.btn-mais-itens button {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  width: calc(50% - 10px);
  height: 51px;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid var(--cor-principal);
  border-radius: 5px;
  color: var(--cor-principal);
  background: transparent;
  cursor: pointer;
}

.box-form-btn-salvar button {
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

.saida-total-vendas {
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--cor-texto);
}

.box-form-btn-salvar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}


@media(max-width: 610px) {
  .conteudo-principal-add-venda {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .conteudo-principal-add-venda h2 {
    display: none;
  }

  .conjunto-input {
    flex-direction: column;
  }

  .conjunto-input label:nth-of-type(1) input,
  .conjunto-input label:nth-of-type(1) input,
  .conjunto-input label:nth-of-type(1) select {
    margin-right: 0px;
  }

  .btn-mais-itens button {
    width: 100%;
  }

  .box-form-btn-salvar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .box-form-btn-salvar button {
    width: 100%;
    height: max-content;
  }

  .saida-total-vendas {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .saida-total-vendas span {
    color: var(--cor-bordas-input-valido);
  }

  .cifrao {
    color: var(--cor-texto) !important;
  }
}
</style>