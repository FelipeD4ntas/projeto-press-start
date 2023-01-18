import { aplicarEstilos } from './aplicarEstilos.js';

function verificarClienteInativo(inativo, id) {
  const clienteLista = document.querySelector(`[data-item="${id}"]`);
  const acaoDeletarEditar = document.querySelector(`[data-acao="${id}"]`);
  const colunaClienteInativo = document.querySelector(`[data-inativo="${id}"]`);

  if (inativo == true) {
    aplicarEstilos(clienteLista, 'opacity', '0.5');
    aplicarEstilos(acaoDeletarEditar, 'display', 'none');
    aplicarEstilos(colunaClienteInativo, 'display', 'block');
    return
  } 

  aplicarEstilos(clienteLista, 'opacity', '1');
  aplicarEstilos(acaoDeletarEditar, 'display', 'flex');
  aplicarEstilos(colunaClienteInativo, 'display', 'none');
}

export default verificarClienteInativo;