import obterElementosDOM from '../services/obterElementosDOM.js';
import obterDadosBD from './obterDadosBD.js';
import addItemLocalStorage from './adicionarDadosBD.js';
import verificarClienteInativo from '../services/verificarClienteInativo.js';
import { restaurarEstilosTabela } from '../services/aplicarEstilos.js';
import { manipularPopup, mostrarPopup } from '../utils/popup.js';

function deletarDadosBD(idClienteSelecionado, idVendaSelecionada) {
  const { popupDeletar } = obterElementosDOM();
  const clienteLista = document.querySelector(`[data-item="${idClienteSelecionado}"]`);
  const vendaLista = document.querySelectorAll(`[data-cliente="${idClienteSelecionado}"]`);
  let bancoLocalStorage = obterDadosBD();

  const fecharPopup = (event) => {
    const classeElementoClicado = event.target.classList.value;
    const classNames = ['closedPopup', 'confirmarExclusao', 'cancelarExclusao', 'mostrar-popup'];
    const clicouElementoFecharPopup = classNames.some(className => className === classeElementoClicado);
    const excluirItem = classeElementoClicado == 'confirmarExclusao' && clicouElementoFecharPopup;
    
    if (excluirItem) {
      if (clienteLista) {
        bancoLocalStorage.forEach(cliente => {
          if (cliente.id == idClienteSelecionado) {
            
            if (cliente.vendas.length > 0 && cliente.inativo == false) {
              cliente.inativo = true;
              verificarClienteInativo(cliente.inativo, idClienteSelecionado);
              manipularPopup('popup-alerta-deletar', 'confirmar-alerta-deletar');  
              return
            }

            if (cliente.inativo == false && cliente.vendas.length == 0) {
              bancoLocalStorage = bancoLocalStorage.filter(itemLista => itemLista.id != idClienteSelecionado);
              clienteLista.remove();
              addItemLocalStorage(bancoLocalStorage);
            }  
          } 
        })
      }
      
      if (vendaLista) {
        bancoLocalStorage = bancoLocalStorage.map(cliente => {
          if(cliente.id == idClienteSelecionado) {
            cliente.vendas = cliente.vendas.filter(venda => venda.idVenda != idVendaSelecionada);

            if (cliente.vendas.length == 0) {
              cliente.inativo = false;
            }
          }

          return cliente;
        })

        vendaLista.forEach(venda => {
          if (venda.dataset.venda == idVendaSelecionada) {
            venda.remove();
          }
        });

        addItemLocalStorage(bancoLocalStorage);
      }

      popupDeletar.classList.remove('mostrar-popup');
      restaurarEstilosTabela();
    } 
    
    if (clicouElementoFecharPopup) {
      popupDeletar.classList.remove('mostrar-popup');
    }
  }

  mostrarPopup(popupDeletar);
  popupDeletar.addEventListener('click', fecharPopup);
}

export default deletarDadosBD;