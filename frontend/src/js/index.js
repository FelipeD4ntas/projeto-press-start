import obterElementosDOM from '../utils/obterElementosDOM.js'
import rota from './rotas.js';
import alterarTextoConteudo from '../utils/alterarTextoConteudo.js';
import filtrarItens from '../utils/filtrarItens.js';
import resetarInputs from '../utils/resetarInputs.js';
import { aplicarEstilos, aplicarNovosEstilos, restaurarEstilos, aplicarEstilosTabela } from '../utils/aplicarEstilos.js';
import logout from '../services/usuarioServices/logout.js';
import { listarClientes } from '../services/clienteServices/listarCliente.js';
import { listarVendas } from '../services/vendaServices/listarVenda.js';
import { adicionarCliente } from '../services/clienteServices/adicionarCliente.js';
import { adicionarVenda } from '../services/vendaServices/adicionarVenda.js';
import { verificarTabelaAtual } from '../utils/verificarAcao.js'
import { resetarPaginas } from '../utils/resetarPaginas.js';
import { aplicarEstiloNeutroInputs } from '../utils/aplicarEstilos.js';
import { validarToken } from '../utils/validarToken.js';
import { restaurarDisplayElementos } from '../utils/aplicarEstilos.js';

const { 
  conteudoPrincipal, tituloPag, 
  iconeBtnVoltarHeader, btnVoltarHeader, 
  btnAdicionarHeader, tituloHeader,
  btnSair, iconeBtnSair, nomeUsuario
} = obterElementosDOM();
const telaMobile = window.matchMedia("(max-width: 600px)");

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
      resetarInputs('telaAddClientes');
      break
    case 'vendas':
      aplicarEstilosTabela();
      setarAtributo(btnAdicionarHeader, 'href', '#telaAddVendas');
      break
    case 'telaAddVendas':
      resetarInputs('telaAddVendas');
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

function redenrizarPag() {
  const { corpoTabelaClientes, corpoTabelaVendas, selectCliente, boxMaisItens } = obterElementosDOM();
  const paginaAtual = validarUrlPagina(window.location.hash);
  const nomePagina = adicionarTituloPag(paginaAtual);
  const entrouNoMobile = telaMobile.matches;
  const paginaTemMenu = 
    paginaAtual == 'dashboard' ||
    paginaAtual == 'clientes' ||
    paginaAtual == 'vendas'

  conteudoPrincipal.innerHTML = '';

  if (rota[paginaAtual]) {
    conteudoPrincipal.appendChild(rota[paginaAtual]);
    alterarTextoConteudo(tituloPag, `${nomePagina} | Lyncas`);
  }

  if (selectCliente) {
    selectCliente.innerHTML = '';
  }
  
  restaurarDisplayElementos();
  resetarPaginas(corpoTabelaClientes);
  resetarPaginas(corpoTabelaVendas);
  filtrarItens();
  listarVendas();
  manipularConteudoHeader(paginaAtual);
  manipularElementosHeader(paginaAtual);
  exibirMenu(entrouNoMobile, paginaTemMenu);
}

function voltarPagina() {
  const { corpoTabelaClientes, corpoTabelaVendas, descricoesItens, boxMaisItens } = obterElementosDOM();
  const paginaAtual = validarUrlPagina(window.location.hash);

  if (paginaAtual == 'clientes') {
    restaurarDisplayElementos();
    aplicarEstiloNeutroInputs('clientes');
    resetarPaginas(corpoTabelaClientes)
    listarClientes();
  }

  if (paginaAtual == 'vendas' && descricoesItens.length != 0) {
    restaurarDisplayElementos();
    aplicarEstiloNeutroInputs('vendas');
    resetarPaginas(corpoTabelaVendas)
    listarVendas();

    boxMaisItens.forEach(boxItem => boxItem.remove());
  }
}

async function verificarLogUsuario() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const tokenValidado = await validarToken(usuario); 
  
  if (tokenValidado.status != 200) {
    window.location.replace("/pages/login/login.html");
  }
  
  nomeUsuario.innerHTML = usuario.nome;
  redenrizarPag();
  adicionarCliente();
  adicionarVenda();
  verificarTabelaAtual();
}

telaMobile.addEventListener('change', verificarLogUsuario);
window.addEventListener('hashchange', verificarLogUsuario);
window.addEventListener('load', verificarLogUsuario);
btnVoltarHeader.addEventListener('click', voltarPagina);
iconeBtnVoltarHeader.addEventListener('click', voltarPagina);
btnSair.addEventListener('click', logout);
iconeBtnSair.addEventListener('click', logout);
