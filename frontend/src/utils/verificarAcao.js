import obterElementosDOM from '../services/obterElementosDOM.js';
import deletarDadosBD from '../database/deletarDadosBD.js';
import exibirDetalhesCliente from '../services/exibirDetalhesCliente.js';
import { editarDadosBD } from '../database/editarDadosBD.js';

function verificarAcaoUsuario(event) {
  const elementoClicado = event.target;
  const clicouNoItemParaDeletar = elementoClicado.dataset.deletar;
  const clicouNoItemParaEditar = elementoClicado.dataset.editar;
  const clicouNoItemDetalhes = elementoClicado.dataset.detalhes;
  const idVenda = elementoClicado.dataset.id
    
  if (clicouNoItemParaDeletar) {
    deletarDadosBD(clicouNoItemParaDeletar, idVenda);
  }

  if (clicouNoItemParaEditar) {
    editarDadosBD(clicouNoItemParaEditar, idVenda);
  }

  if (clicouNoItemDetalhes) {
    exibirDetalhesCliente(clicouNoItemDetalhes, idVenda);
  }
}

function verificarTabelaAtual() {
  const { corpoTabelaClientes, corpoTabelaVendas } = obterElementosDOM();
  
  if (corpoTabelaClientes) {
    corpoTabelaClientes.addEventListener('click', verificarAcaoUsuario);
  }

  if (corpoTabelaVendas) {
    corpoTabelaVendas.addEventListener('click', verificarAcaoUsuario);
  }
}

export default verificarTabelaAtual