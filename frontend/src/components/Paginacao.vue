<template>
  <div class="paginacao">
    <div class="icone-paginacao" @click="irParaPaginaAnterior"><img src="@/assets/icones/icone-pagina-anterior.png" alt="página anterior"></div>
    <div class="icone-paginacao primeira-pagina" @click="irPara(1)"><p>Início</p></div>
    <div class="icone-paginacao pontos-paginacao"></div>
    <div class="numeros-paginas">
      <h4>Página</h4>
      <div class="pagina-atual">{{ estado.pagina }}</div>
    </div>
    <div class="icone-paginacao pontos-paginacao"></div>
    <div class="icone-paginacao ultima-pagina" @click="irPara(estado.totalDePaginas)"><p >Fim</p></div>
    <div class="icone-paginacao" @click="irParaProximaPagina"><img src="@/assets/icones/icone-proxima-pagina.png" alt="proxima página"></div>
  </div>
</template>

<script>
export default {
  name: 'PaginacaoComponent',
  props: {
    totalItensLista: { type: [String, Number], required: true },
    limitePorPagina: { type: [String, Number], required: true },
    filtro: { type: Boolean }
  },
  emits: ['estadoPaginacao'],
  data() {
    return {
      estado: {
        pagina: 1,
        limite: this.limitePorPagina,
        totalDePaginas: 1
      }
    }
  },
  watch: {
    totalItensLista() {
      this.estado.totalDePaginas = Math.ceil(this.totalItensLista / this.estado.limite);
    },
    offset() {
      this.$emit('estadoPaginacao', { offset: this.offset })
    },
    filtro() {
      this.estado.pagina = 1;
    }
  },
  computed: {
    offset() {
      return (this.estado.pagina - 1) * this.estado.limite;
    }
  },
  methods: {
    irParaProximaPagina() {
      this.estado.pagina++;
      if (this.estado.pagina > this.estado.totalDePaginas) {
        this.estado.pagina--;
      }
    },
    irParaPaginaAnterior() {
      this.estado.pagina--;
      if(this.estado.pagina < 1) {
        this.estado.pagina++;
      }
    },
    irPara(pagina) {
      if (pagina < 1) {
        pagina = 1;
      }

      if (pagina > this.estado.totalDePaginas) {
        this.estado.pagina = this.estado.totalDePaginas;
      }

      this.estado.pagina = pagina;
    }
  }
}
</script>

<style scoped>
.paginacao {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  border-top: 2px solid var(--cor-bordas-secundario);
  padding: 20px 0;
}

.numeros-paginas {
  display: flex;
  align-items: center;
  justify-content: center;
}

.numeros-paginas div,
.icone-paginacao {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icone-paginacao {
  cursor: pointer;
  font-size: 3rem;
  margin: 0 15px;
}

.icone-paginacao img {
  border-radius: 5px;
  width: 35px;
  box-shadow: 1px 1px 10px #00000074;
  transition: 0.4s;
}

.icone-paginacao img:hover,
.primeira-pagina:hover ,
.ultima-pagina:hover {
  transform: scale(0.95);
}

.numeros-paginas {
  display: flex;
  flex-direction: column;
}

.numeros-paginas h4 {
  font-size: 1.7rem;
  color: var(--cor-principal)
}

.pontos-paginacao {
  width: 10px;
  margin: 0 5px;
}

.pagina-atual {
  color: var(--cor-texto-secundario);
}

.primeira-pagina ,
.ultima-pagina {
  width: 70px;
  background: var(--cor-principal);
  border-radius: 5px;
  box-shadow: 1px 1px 10px #00000074;
  transition: 0.4s;
}

.primeira-pagina p,
.ultima-pagina p {
  font-size: 1.8rem;
  padding: 10px;
  color: white;
  background: var(--cor-principal);
  border-radius: 5px;
}

@media (max-width: 506px) {
  .pagina-atual p {
    font-size: 1.7rem;
  }
}

@media(max-width: 390px) {
  .icone-paginacao {
    margin: 0 5px;
  }

  .pagina-atual {
    font-size: 1.7rem;
  }
}
</style>