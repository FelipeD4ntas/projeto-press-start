import obterElementosDOM from "./obterElementosDOM.js";
import alterarEstadosLeituraInputs from "../utils/alterarEstadoLeituraInputs.js";
import alterarTextoConteudo from "../utils/alterarTextoConteudo.js";
import deletarDadosBD from "../database/deletarDadosBD.js";
import { aplicarEstiloNeutroInputs, aplicarEstilos } from "./aplicarEstilos.js";
import { manipularElementosPagEditar, aplicarEstilosPagEditar } from "../database/editarDadosBD.js";

const { iconeBtnDeletarHeader } = obterElementosDOM();

let idItemParaDeletar = null;
let idVendaParaDeletar = null;

function exibirDetalhesCliente(idItem, idVenda) {
  const { 
    menuLateral, headerTelasComMenu, headerTelasSemMenu, btnSalvar, 
    conteudoPrincipal, iconeBtnEditarHeader, tituloForm, tituloHeader, 
    descricoesItens, precosUnitario, quantidadesItens,
    tabelaClientes, tabelaVendas
  } = obterElementosDOM();

  idItemParaDeletar = idItem
  idVendaParaDeletar = idVenda

  if (tabelaClientes) {
    aplicarEstiloNeutroInputs('telaClientes');
    alterarTextoConteudo(tituloForm, 'Detalhes cliente');
    alterarEstadosLeituraInputs(nomeCliente, true);
    alterarEstadosLeituraInputs(emailCliente, true);
    alterarEstadosLeituraInputs(telefoneCliente, true);
    alterarEstadosLeituraInputs(cpfCliente, true);
  }

  if (tabelaVendas) {
    descricoesItens.forEach(descricao => alterarEstadosLeituraInputs(descricao, true));
    precosUnitario.forEach(preco => alterarEstadosLeituraInputs(preco, true));
    quantidadesItens.forEach(quantidadeItem => alterarEstadosLeituraInputs(quantidadeItem, true));
    alterarEstadosLeituraInputs(dataFaturamento, true);
    aplicarEstiloNeutroInputs('telaVendas');
    alterarTextoConteudo(tituloForm, 'Detalhes venda');
  }
  
  aplicarEstilos(menuLateral, 'display', 'none');
  aplicarEstilos(headerTelasComMenu, 'display', 'none');
  aplicarEstilos(headerTelasSemMenu, 'display', 'flex');
  aplicarEstilos(btnSalvar, 'display', 'none');
  aplicarEstilos(iconeBtnEditarHeader, 'display', 'block');
  aplicarEstilos(iconeBtnDeletarHeader, 'display', 'none');
  aplicarEstilos(conteudoPrincipal, 'marginBottom', '25px');
  alterarTextoConteudo(tituloHeader, 'Detalhes');
  manipularElementosPagEditar(idItem, idVenda);
  
  iconeBtnEditarHeader.addEventListener('click', aplicarEstilosPagEditar);
}

function clicouNoIconeDeletar() {
  deletarDadosBD(idItemParaDeletar, idVendaParaDeletar);
}

iconeBtnDeletarHeader.addEventListener('click', clicouNoIconeDeletar);

export default exibirDetalhesCliente;