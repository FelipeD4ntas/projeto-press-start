import obterElementosDOM from '../services/obterElementosDOM.js'
import rotas from './rotas.js';
import alterarTextoConteudo from '../utils/alterarTextoConteudo.js';
import filtrarItens from '../services/filtrarItens.js';
import manipularDadosBD from '../database/manipularDadosBD.js';
import adicionarNovoCliente from '../services/adicionarNovoCliente.js';
import resetarInputs from '../utils/resetarInputs.js';
import { adicionarNovaVenda } from '../services/adicionarNovaVenda.js';
import { aplicarEstilos, aplicarNovosEstilos, restaurarEstilos, aplicarEstilosTabela } from '../services/aplicarEstilos.js';

const { 
  conteudoPrincipal, tituloPag, 
  iconeBtnVoltarHeader, btnVoltarHeader, 
  btnAdicionarHeader, tituloHeader 
} = obterElementosDOM();
const telaMobile = window.matchMedia("(max-width: 610px)");

function validarUrlPagina(pagAtual) {
  return pagAtual === '' ? 'dashboard' : pagAtual.replace('#', '');
}

function adicionarTituloPag(paginaAtual) {
  let nomePagina = paginaAtual.replace(paginaAtual[0], paginaAtual[0].toUpperCase());

  nomePagina = nomePagina === 'TelaAddClientes' ? 'Adicionar Clientes' : nomePagina;
  nomePagina = nomePagina === 'TelaAddVendas' ? 'Adicionar Vendas' : nomePagina;

  return nomePagina;
}

function setarAtributo(elemento, tipoAtributo, atributo) {
  elemento.setAttribute(tipoAtributo, atributo);
}

function verificarPagina(paginaAtual, paginaEmFoco, displayBtnVoltar, displayBtnAdicionar) {
  const voltarPagClientes = 
    paginaEmFoco === 'telaAddClientes' || 
    paginaEmFoco === 'clientes'

  switch (paginaAtual) {
    case 'clientes':
      aplicarEstilosTabela();
      setarAtributo(btnAdicionarHeader, 'href', '#telaAddClientes');
      break
    case 'telaAddClientes':
      resetarInputs('telaClientes');
      break
    case 'vendas':
      aplicarEstilosTabela();
      setarAtributo(btnAdicionarHeader, 'href', '#telaAddVendas');
      break
    case 'telaAddVendas':
      resetarInputs('telaVendas');
      break
  }

  if (paginaAtual === paginaEmFoco) {
    aplicarEstilos(btnVoltarHeader, 'display', displayBtnVoltar);
    aplicarEstilos(btnAdicionarHeader, 'display', displayBtnAdicionar);

    if (voltarPagClientes) {
      setarAtributo(btnVoltarHeader, 'href', '#clientes');
      setarAtributo(iconeBtnVoltarHeader, 'href', '#clientes');
      return
    }
    setarAtributo(btnVoltarHeader, 'href', '#vendas');
    setarAtributo(iconeBtnVoltarHeader, 'href', '#vendas');
  }
}

function manipularElementosHeader(paginaAtual) {
  verificarPagina(paginaAtual, 'dashboard', 'none', 'none');
  verificarPagina(paginaAtual, 'clientes', 'none', 'block');
  verificarPagina(paginaAtual, 'vendas', 'none', 'block');
  verificarPagina(paginaAtual, 'telaAddClientes', 'block', 'none');
  verificarPagina(paginaAtual, 'telaAddVendas', 'block', 'none');
}

function exibirMenu(entrouNoMobile, paginaTemMenu) {
  filtrarItens();
  entrouNoMobile 
    ? aplicarNovosEstilos(paginaTemMenu) 
    : restaurarEstilos();
}

function mudarTituloHeader(paginaAtual, paginaEmFoco, conteudoTitulo) {
  if (paginaAtual == paginaEmFoco) {
    alterarTextoConteudo(tituloHeader, conteudoTitulo);
  }
}

function manipularConteudoHeader(paginaAtual) {
  mudarTituloHeader(paginaAtual, 'telaAddClientes', 'Adicionar');
  mudarTituloHeader(paginaAtual, 'telaAddVendas', 'Adicionar');
  mudarTituloHeader(paginaAtual, 'paginaInicial', 'Volte');
}

async function redenrizarPag() {
  const { corpoTabelaClientes, corpoTabelaVendas, selectCliente, boxMaisItens } = obterElementosDOM();

  const paginaAtual = validarUrlPagina(window.location.hash);
  const nomePagina = adicionarTituloPag(paginaAtual);
  const entrouNoMobile = telaMobile.matches;
  const conteudoPaginaAtual = await rotas();
  
  const paginaTemMenu = 
    paginaAtual == 'dashboard' ||
    paginaAtual == 'clientes' ||
    paginaAtual == 'vendas'
 
  conteudoPrincipal.innerHTML = '';

  if (conteudoPaginaAtual[paginaAtual]) {
    conteudoPrincipal.append(conteudoPaginaAtual[paginaAtual]);
    alterarTextoConteudo(tituloPag, `${nomePagina} | Lyncas`);
  }

  if (corpoTabelaClientes) {
    corpoTabelaClientes.innerHTML = '';
  }

  if (corpoTabelaVendas) {
    corpoTabelaVendas.innerHTML = '';
  }

  if (selectCliente) {
    selectCliente.innerHTML = '';
    boxMaisItens.forEach(boxItem => boxItem.remove());
  }
  
  filtrarItens();
  adicionarNovoCliente();
  adicionarNovaVenda();
  manipularDadosBD();
  manipularConteudoHeader(paginaAtual);
  manipularElementosHeader(paginaAtual);
  exibirMenu(entrouNoMobile, paginaTemMenu);
}

telaMobile.addEventListener('change', redenrizarPag);
window.addEventListener('hashchange', redenrizarPag);
window.addEventListener('load', redenrizarPag);