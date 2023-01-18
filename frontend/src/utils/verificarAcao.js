import obterElementosDOM from './obterElementosDOM.js';
import exibirDetalhesCliente from './exibirDetalhesCliente.js';
import { atualizarCliente } from '../services/clienteServices/atualizarCliente.js';
import { atualizarVenda } from '../services/vendaServices/atualizarVenda.js';
import { removerCliente } from '../services/clienteServices/removerCliente.js';
import { removerVenda } from '../services/vendaServices/removerVenda.js';

function verificarAcaoUsuario(event) {
  const elementoClicado = event.target;
  const clicouNoItemParaDeletar = elementoClicado.dataset.deletar;
  const clicouNoItemParaEditar = elementoClicado.dataset.editar;
  const clicouNoItemDetalhes = elementoClicado.dataset.detalhes;
  const idVenda = elementoClicado.dataset.id;
  const { corpoTabelaClientes, corpoTabelaVendas } = obterElementosDOM();
    
  if (clicouNoItemParaDeletar) {
    if (corpoTabelaClientes) {
      removerCliente(clicouNoItemParaDeletar);
    }

    if (corpoTabelaVendas) {
      removerVenda(clicouNoItemParaDeletar)
    }
  }

  if (clicouNoItemParaEditar) {
    if (corpoTabelaClientes) {
      atualizarCliente(clicouNoItemParaEditar);
    }

    if (corpoTabelaVendas) {
      atualizarVenda(clicouNoItemParaEditar)
    }
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

export { verificarTabelaAtual }