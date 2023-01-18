import obterElementosDOM from './obterElementosDOM.js';

function filtrandoItens(valorInput, itensLista, encontrado) {
  return itensLista.filter(item => {
    const nomeCliente = item.dataset.nome.toLowerCase();
    const encontrou = nomeCliente.includes(valorInput);
    
    return encontrado ? encontrou : !encontrou;
  });
}

function mostrarOuOcultarItem(itensBuscados, add, remove) {
  itensBuscados.forEach(item => {
    item.classList.remove(remove);
    item.classList.add(add);
  });
}

function procurandoItens(valorInput, itensLista) {
  const itemNaoEncontrado = filtrandoItens(valorInput, itensLista, false);
  const itemEncontrado = filtrandoItens(valorInput, itensLista, true);
  
  mostrarOuOcultarItem(itemNaoEncontrado, 'ocultar-item', 'mostrar-item');
  mostrarOuOcultarItem(itemEncontrado, 'mostrar-item', 'ocultar-item');
}

function buscarItem(event) {
  const { corpoTabelaClientes, corpoTabelaVendas } = obterElementosDOM();

  const itensLista = corpoTabelaClientes ? Array.from(corpoTabelaClientes.children) : Array.from(corpoTabelaVendas.children);
  const valorInput = event.target.value.toLowerCase().trim();
  
  procurandoItens(valorInput, itensLista);
}

export default () => {
  const { inputBuscar } = obterElementosDOM();
  
  if (inputBuscar) {
    inputBuscar.addEventListener('input', buscarItem);
  }
}
