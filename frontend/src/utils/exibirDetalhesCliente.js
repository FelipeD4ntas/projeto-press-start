import obterElementosDOM from "./obterElementosDOM.js";
import alterarEstadosLeituraInputs from "./alterarEstadoLeituraInputs.js";
import alterarTextoConteudo from "./alterarTextoConteudo.js";
import { aplicarEstiloNeutroInputs, aplicarEstilos, restaurarEstilosTabela } from "./aplicarEstilos.js";
import { atualizarCliente } from "../services/clienteServices/atualizarCliente.js";
import { atualizarVenda } from "../services/vendaServices/atualizarVenda.js";
import { aplicarEstilosPagEditar } from "./aplicarEstilos.js";
import { removerCliente } from "../services/clienteServices/removerCliente.js";
import { removerVenda } from "../services/vendaServices/removerVenda.js";

const { iconeBtnDeletarHeader } = obterElementosDOM();

let idItemParaDeletar = null;
let idVendaParaDeletar = null;

function exibirDetalhesCliente(idCliente, idVenda) {
  const { 
    menuLateral, headerTelasComMenu, headerTelasSemMenu, btnSalvar, 
    conteudoPrincipal, iconeBtnEditarHeader, tituloForm, tituloHeader,
    tabelaClientes, tabelaVendas, descricoesItens, precosUnitario, quantidadesItens
  } = obterElementosDOM();

  idItemParaDeletar = idCliente
  idVendaParaDeletar = idVenda

  if (tabelaClientes) {
    aplicarEstiloNeutroInputs('telaClientes');
    alterarTextoConteudo(tituloForm, 'Detalhes cliente');
    alterarEstadosLeituraInputs(nomeCliente, true);
    alterarEstadosLeituraInputs(emailCliente, true);
    alterarEstadosLeituraInputs(telefoneCliente, true);
    alterarEstadosLeituraInputs(cpfCliente, true);
    atualizarCliente(idCliente);
  }

  if (tabelaVendas) { 
    descricoesItens.forEach(descricao => alterarEstadosLeituraInputs(descricao, true));
    precosUnitario.forEach(preco => alterarEstadosLeituraInputs(preco, true));
    quantidadesItens.forEach(quantidadeItem => alterarEstadosLeituraInputs(quantidadeItem, true));
    alterarEstadosLeituraInputs(dataFaturamento, true);
    aplicarEstiloNeutroInputs('telaVendas');
    alterarTextoConteudo(tituloForm, 'Detalhes venda');
    atualizarVenda(idVenda);
  }
  
  aplicarEstilos(menuLateral, 'display', 'none');
  aplicarEstilos(headerTelasComMenu, 'display', 'none');
  aplicarEstilos(headerTelasSemMenu, 'display', 'flex');
  aplicarEstilos(btnSalvar, 'display', 'none');
  aplicarEstilos(iconeBtnEditarHeader, 'display', 'block');
  aplicarEstilos(iconeBtnDeletarHeader, 'display', 'none');
  aplicarEstilos(conteudoPrincipal, 'marginBottom', '25px');
  alterarTextoConteudo(tituloHeader, 'Detalhes');
  
  iconeBtnEditarHeader.addEventListener('click', aplicarEstilosPagEditar);
}

function clicouNoIconeDeletar() {
  const { corpoTabelaClientes, corpoTabelaVendas } = obterElementosDOM();
  
  if (corpoTabelaClientes) {
    removerCliente(idItemParaDeletar)
    restaurarEstilosTabela();
  }

  if (corpoTabelaVendas) {
    removerVenda(idVendaParaDeletar);
    restaurarEstilosTabela();
  }
}

if (iconeBtnDeletarHeader) {
  iconeBtnDeletarHeader.addEventListener('click', clicouNoIconeDeletar);
}

export default exibirDetalhesCliente;