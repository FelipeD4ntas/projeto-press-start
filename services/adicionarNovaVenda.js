import obterElementosDOM from './obterElementosDOM.js';
import obterDadosBD from '../database/obterDadosBD.js';
import addItemLocalStorage from '../database/adicionarDadosBD.js';
import resetarInputs from '../utils/resetarInputs.js';
import { manipularPopup } from '../utils/popup.js';
import { autenticarDadosVendas, adicionarEventosInputsVenda } from './autenticarDados.js';

function adicionarNovaVendaBD(quantidadeItem, dataFaturamento, precoUnitario, valorTotal, descricaoItem) {
  const bancoLocalStorage = obterDadosBD()
  const idClienteSelecionado = selectCliente.options[selectCliente.selectedIndex].dataset.cliente;
  const dataAtual = new Date();
  const dataVenda = dataAtual.toLocaleString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric'});

  bancoLocalStorage.forEach(cliente => {
    let ultimoIdVenda = 0;

    if (cliente.id == idClienteSelecionado) {
      const ultimaVenda = cliente.vendas.slice(cliente.vendas.length - 1, cliente.vendas.length);
     
      if (ultimaVenda.length > 0) {
        ultimoIdVenda = ultimaVenda[0].idVenda;
      }

      for (let indice = 0; indice < quantidadeItem.length; indice++) {
        ultimoIdVenda++
        cliente.vendas.push({
          "idVenda": `${ultimoIdVenda}`,
          "idCliente": `${idClienteSelecionado}`,
          "descricaoProduto": `${descricaoItem[indice]}`,
          "qtd": `${quantidadeItem[indice]}`,
          "dataVenda": `${dataVenda}`,
          "dataFaturamento": `${dataFaturamento}`,
          "precoUnitario": `${precoUnitario[indice]}`,
          "valorTotal": `${valorTotal[indice]}`
        });
      }
    }
  });
  addItemLocalStorage(bancoLocalStorage);
}

function exibirValorVenda() {
  const { valoresTotais, precosUnitario, quantidadesItens } = obterElementosDOM();
  const valoresPrecosUnitarios = Array.from(precosUnitario).map(precoUnitario => precoUnitario.value);
  const valoresTotaisVendas = Array.from(valoresTotais).map(valorTotal => valorTotal);           
  const valoresQuantidades = Array.from(quantidadesItens).map(quantidadeItem => quantidadeItem.value);

  for(let indice = 0; indice < valoresQuantidades.length; indice++) {
    const valorPrecoBruto = valoresPrecosUnitarios[indice].replace(/\D/g, '');
    const estiloDaMoeda = new Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}); 
    valoresTotaisVendas[indice].value = (estiloDaMoeda.format((valorPrecoBruto / 100) * valoresQuantidades[indice]));
  }
}

function exibirValorTotal() {
  const bancoLocalStorage = obterDadosBD();
  const { saidaValorTotal } = obterElementosDOM();
  const idClienteSelecionado = selectCliente.options[selectCliente.selectedIndex].dataset.cliente;
  atualizarValorTotal(bancoLocalStorage, saidaValorTotal, idClienteSelecionado);
}

function atualizarValorTotal(bancoLocalStorage, saidaValorTotal, idClienteSelecionado) {
  bancoLocalStorage.forEach(cliente => {
    if (cliente.id == idClienteSelecionado) {
      saidaValorTotal.textContent = cliente.vendas.reduce((acc, venda) => {
        const valorPrecoBruto = venda.valorTotal.replace(/\D/g, '');
        acc += (valorPrecoBruto / 100);

        return acc
      }, 0).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    }
  });
}

function iterarInputsParaAdicionarEventos() {
  const { descricoesItens, precosUnitario, quantidadesItens } = obterElementosDOM();
  descricoesItens.forEach(descricaoItem => {
    adicionarEventosInputsVenda(descricaoItem);
  });

  precosUnitario.forEach(precoUnitario => {
    adicionarEventosInputsVenda(precoUnitario);
    precoUnitario.addEventListener('input', exibirValorVenda);
  });

  quantidadesItens.forEach(quantidadeItem => {
    adicionarEventosInputsVenda(quantidadeItem);
    quantidadeItem.addEventListener('input', exibirValorVenda);
  });

  adicionarEventosInputsVenda(dataFaturamento);
}

function verificarSeInputsDeTodasAsVendasPassaramNasRegras(arrayInput) {
  return arrayInput.every(input => input == true)
}

function adicionarMaisItens() {
  const { boxBtnMaisItens } = obterElementosDOM();
  const boxMaisItens = document.createElement('div');
  boxMaisItens.setAttribute('data-js', 'box-mais-itens');
  boxMaisItens.classList.add('novo-item-venda');
  
  boxMaisItens.innerHTML = `
    <div class="box-form-conjunto-input conjunto-input">
      <label for="descricaoItem">
        Descrição do item
        <input type="text" name="descricaoItem" data-js="descricao-item" required>
        <span class="mensagem-input-valido" data-js="mensagem-descricao-invalida">Descrição deve conter pelo menos sete caracteres.</span>
      </label>
      <label for="precoUnitario">
        Valor unitário
        <input type="text" name="precoUnitario"data-js="preco-unitario" required>
        <span class="mensagem-input-valido" data-js="mensagem-valor-invalido">Valor inválido.</span>
      </label>
    </div>
    <div class="box-form-conjunto-input conjunto-input">
      <label for="quantidadeItem">
        Quantidade
        <input type="number" name="quantidadeItem" data-js="quantidade-item" required>
        <span class="mensagem-input-valido" data-js="mensagem-quantidade-invalida">Escolha uma quantidade.</span>
      </label>
      <label for="valorTotal">
        Valor total
        <input type="text" name="valorTotal" data-js="soma-valores" disabled>
      </label>
    </div>
  `

  boxBtnMaisItens.insertAdjacentElement('beforebegin', boxMaisItens);
  iterarInputsParaAdicionarEventos();
}

function adicionarNovaVenda() {
  const { 
    formAddVenda, saidaValorTotal, btnMaisItens
  } = obterElementosDOM();
  const bancoLocalStorage = obterDadosBD();
  
  if (formAddVenda) {
    function verificarAutenticacaoFormAddVenda(event) {
      event.preventDefault();
      const idClienteSelecionado = selectCliente.options[selectCliente.selectedIndex].dataset.cliente;
      const { descricoesItens, valoresTotais, quantidadesItens, precosUnitario, boxMaisItens } = obterElementosDOM();
      const { 
        dataPassouNaRegra, 
        descricaoItemPassouNaRegra, 
        precoUnitarioPassouNaRegra, 
        quantidadeItemPassouNaRegra } = autenticarDadosVendas();
        
      const todasDescricoesPassaram = verificarSeInputsDeTodasAsVendasPassaramNasRegras(descricaoItemPassouNaRegra);
      const todosPrecosPassaram = verificarSeInputsDeTodasAsVendasPassaramNasRegras(precoUnitarioPassouNaRegra);
      const todasQuantidadesItensPassaram = verificarSeInputsDeTodasAsVendasPassaramNasRegras(quantidadeItemPassouNaRegra);

      const inputsPassaramNasRegras = 
        dataPassouNaRegra && 
        todasDescricoesPassaram && 
        todosPrecosPassaram && 
        todasQuantidadesItensPassaram;

      if (inputsPassaramNasRegras) {
        const valoresDescricao = Array.from(descricoesItens).map(descricaoItem => descricaoItem.value);
        const valoresQuantidades = Array.from(quantidadesItens).map(quantidadeItem => quantidadeItem.value);
        const valoresPrecosUnitario = Array.from(precosUnitario).map(precoUnitario => precoUnitario.value);
        const valoresTotaisVendas = Array.from(valoresTotais).map(valorTotal => valorTotal.value);

        adicionarNovaVendaBD(
          valoresQuantidades, 
          dataFaturamento.value,
          valoresPrecosUnitario, 
          valoresTotaisVendas, 
          valoresDescricao);
        
        if (boxMaisItens) {
          boxMaisItens.forEach(boxItem => boxItem.remove());
        }
        
        atualizarValorTotal(bancoLocalStorage, saidaValorTotal, idClienteSelecionado);
        resetarInputs('telaVendas');
        manipularPopup('popup-adicionar-registro', 'finalizar-registro');
      }
    }
    
    iterarInputsParaAdicionarEventos();
    selectCliente.addEventListener('input', exibirValorTotal);
    btnMaisItens.addEventListener('click', adicionarMaisItens);
    formAddVenda.addEventListener('submit', verificarAutenticacaoFormAddVenda);
  }
  
}

export { adicionarNovaVenda, exibirValorTotal, iterarInputsParaAdicionarEventos, exibirValorVenda, atualizarValorTotal };