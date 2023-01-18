import { ApiService } from "../../api/apiService.js";
import { adicionarEventosInputsVenda } from "../../utils/autenticarDados.js";
import resetarInputs from "../../utils/resetarInputs.js";
import { manipularPopup } from "../../utils/popup.js";
import obterElementosDOM from "../../utils/obterElementosDOM.js";
import { autenticarDadosVendas } from "../../utils/autenticarDados.js";
import { listarClientes } from '../../services/clienteServices/listarCliente.js';
import { adicionarMaisItens } from "../../utils/adicionarMaisItensVenda.js";

async function adicionarVenda() {
  const { formAddVenda, btnMaisItens } = obterElementosDOM();
  const listaCliente = await listarClientes();
  
  if (formAddVenda) {
    listaCliente.forEach(cliente => {
      selectCliente.innerHTML += `
          <option data-cliente="${cliente.id}">${cliente.nome}</option>
        `
        exibirValorVenda();
    });
    
    iterarInputsParaAdicionarEventos();
    btnMaisItens.addEventListener('click', adicionarMaisItens);
    formAddVenda.addEventListener('submit', verificarAutenticacaoFormAddVenda);
  }
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

function verificarAutenticacaoFormAddVenda(event) {
  event.preventDefault();
  
  const { descricoesItens, quantidadesItens, precosUnitario, boxMaisItens, conteudoPopupVenda } = obterElementosDOM();

  const { 
    dataPassouNaRegra, 
    descricaoItemPassouNaRegra, 
    precoUnitarioPassouNaRegra, 
    quantidadeItemPassouNaRegra } = autenticarDadosVendas();
    
  const todasDescricoesPassaram = verificarSeInputsDeTodasAsVendasPassaramNasRegras(descricaoItemPassouNaRegra);
  const todosPrecosPassaram = verificarSeInputsDeTodasAsVendasPassaramNasRegras(precoUnitarioPassouNaRegra);
  const todasQuantidadesItensPassaram = verificarSeInputsDeTodasAsVendasPassaramNasRegras(quantidadeItemPassouNaRegra);
  const clienteSelecionado = selectCliente.options[selectCliente.selectedIndex];
  let idClienteSelecionado = null;

  if (clienteSelecionado) {
    idClienteSelecionado = clienteSelecionado.dataset.cliente;
  }

  const inputsPassaramNasRegras = 
    dataPassouNaRegra && 
    todasDescricoesPassaram && 
    todosPrecosPassaram && 
    todasQuantidadesItensPassaram &&
    idClienteSelecionado;

  if (inputsPassaramNasRegras) {
    const valoresDescricao = Array.from(descricoesItens).map(descricaoItem => descricaoItem.value);
    const valoresQuantidades = Array.from(quantidadesItens).map(quantidadeItem => quantidadeItem.value);
    const valoresPrecosUnitario = Array.from(precosUnitario).map(precoUnitario => precoUnitario.value);

    adicionarVendaResponse(
      valoresQuantidades, 
      dataFaturamento.value,
      valoresPrecosUnitario, 
      valoresDescricao,
       idClienteSelecionado,
       conteudoPopupVenda);
    
    if (boxMaisItens) {
      boxMaisItens.forEach(boxItem => boxItem.remove());
    }

    resetarInputs('telaVendas');
    manipularPopup('popup-adicionar-registro', 'finalizar-registro');
  }

  if (clienteSelecionado == null) {
    conteudoPopupVenda.innerHTML = 'Para cadastrar vendas é preciso ter clientes cadastrados!';
    resetarInputs('telaVendas');
    manipularPopup('popup-adicionar-registro', 'finalizar-registro');
  }
}

async function adicionarVendaResponse(quantidadeItem, dataFaturamento, precoUnitario, descricaoItem, idClienteSelecionado, conteudoPopupVenda) {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const dataFormatada = new Date(dataFaturamento.split('/').reverse().join('/')).toISOString();

  const bodyAdicionarVenda = {
    clienteId: idClienteSelecionado,
    dataFaturamento: dataFormatada,
    itens: []
  }

  for (let indice = 0; indice < quantidadeItem.length; indice++) {
    bodyAdicionarVenda.itens.push(
      {
        descricaoItem: descricaoItem[indice],
        quantidade: quantidadeItem[indice],
        precoUnitario: parseFloat(precoUnitario[indice].replace(/[^0-9]+/g,'')) / 100
      }
    )
  }

  const respostaApi = await ApiService.post('Venda/adicionar', bodyAdicionarVenda, usuario.token);
  const notificacoes = respostaApi.notificacoes;
  
  if (respostaApi.sucesso) {
    conteudoPopupVenda.innerHTML = respostaApi.dados.mensagem;
    return
  } 

  notificacoes.forEach(notificacao => conteudoPopupVenda.innerHTML = notificacao.message);
}

function exibirValorVenda() {
  const { valoresTotais, precosUnitario, quantidadesItens, saidaValorTotal } = obterElementosDOM();
  const valoresPrecosUnitarios = Array.from(precosUnitario).map(precoUnitario => precoUnitario.value);
  const valoresTotaisVendas = Array.from(valoresTotais).map(valorTotal => valorTotal);           
  const valoresQuantidades = Array.from(quantidadesItens).map(quantidadeItem => quantidadeItem.value);
  let valorTotalVenda = 0;

  for(let indice = 0; indice < valoresQuantidades.length; indice++) {
    const valorPrecoBruto = valoresPrecosUnitarios[indice].replace(/\D/g, '');
    const estiloDaMoeda = new Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}); 
    valoresTotaisVendas[indice].value = (estiloDaMoeda.format((valorPrecoBruto / 100) * valoresQuantidades[indice]));
    valorTotalVenda += valorPrecoBruto / 100 * valoresQuantidades[indice];
    saidaValorTotal.textContent = estiloDaMoeda.format(valorTotalVenda)
  }
}

export { adicionarVenda, exibirValorVenda, iterarInputsParaAdicionarEventos }