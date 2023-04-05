<template>
  <Header 
    :telaComMenu="true" 
    :telaTemBotao="true" 
    :rotaBotao="'/vendas'" 
    :nomeBotao="'Voltar'"
    :classeBotao="'btn-voltar'"/>
  <div class="conteudo-principal">
    <h1>Gráfico Vendas</h1>
    <div class="box-grafico">
      <div id="grafico" class="grafico" ref="grafico"></div>
    </div>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts';
import Header from '@/components/Header.vue';
import Hub from '@/Hub';
import { servicesVenda } from '@/common/services/vendasServices/servicesVenda';

export default {
  name: 'GraficoVenda',
  components: {
    Header
  },
  data() {
    return {
      valoresTotais: [],
      datas: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      hub: new Hub()
    }
  },
  methods: {
    async renderizarGrafico() {
      var options = {
          series: [{
          name: 'Vendas',
          data: this.valoresTotais
        }],
          chart: {
          type: 'bar',
          
        },
        colors: ['#274A9D'],
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top', // top, center, bottom
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#1C3B85"]
          }
        },
        xaxis: {
          categories: this.datas,
          position: 'top',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          tooltip: {
            enabled: true,
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            }
          }
        }
      };

      if (this.grafico != null) {
        this.grafico.destroy();
      }

      this.grafico = new ApexCharts(this.$refs.grafico, options);
      this.grafico.render();
    },
    async popularVendas() {
      const response = await servicesVenda.listar('Venda/listar');
      let valoresTotaisVendas = Array(12).fill(0);

      Array.from(response.dados.vendas).forEach(venda => {
        const mes = new Date(venda.dataFaturamento).getMonth()
        valoresTotaisVendas[mes] += venda.valorTotal;
      });

      return valoresTotaisVendas;
    },
    configuracaoSignalR() {
      this.hub.connection.start()
        .then(() => {
          console.log('Conectado');
          this.hub.connection.on("ReceivedMessage", listaValorTotal => {
            this.valoresTotais = listaValorTotal;
            this.renderizarGrafico();
          })
        })
    }
  },
  async mounted() {
    this.valoresTotais = await this.popularVendas();
    this.configuracaoSignalR();
    this.renderizarGrafico();
  }
}
</script>

<style scoped>
h1 {
  font-size: 2.4rem;
  font-weight: 500;
}
.box-grafico {
  
  display: flex;
  justify-content: center;
}

.grafico {
  width: 70%;
  margin: 20px 0;
}
</style>