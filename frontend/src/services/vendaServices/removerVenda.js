import { ApiService } from "../../api/apiService.js";
import obterElementosDOM from "../../utils/obterElementosDOM.js";
import { mostrarPopup } from "../../utils/popup.js";
import { listarVendas } from "./listarVenda.js";
import { resetarPaginas } from "../../utils/resetarPaginas.js";
import { manipularPopup } from "../../utils/popup.js";

let id = '';

const fecharPopup = async (event) => {
  const { popupDeletar, corpoTabelaVendas } = obterElementosDOM();
  const classeElementoClicado = event.target.classList.value;
  const classNames = ['closedPopup', 'confirmarExclusao', 'cancelarExclusao', 'mostrar-popup'];
  const clicouElementoFecharPopup = classNames.some(className => className === classeElementoClicado);
  const excluirItem = classeElementoClicado == 'confirmarExclusao' && clicouElementoFecharPopup;

  if (excluirItem) {
    const usuario = JSON.parse(localStorage.getItem('usuario')); 
    const respostaApi = await ApiService.delete('Venda/deletar', id, usuario.token);
    
    popupDeletar.classList.remove('mostrar-popup');

    if (!respostaApi.sucesso) {
      manipularPopup('popup-alerta-deletar', 'confirmar-alerta-deletar');
    }

    resetarPaginas(corpoTabelaVendas);
    listarVendas();
  } 
  
  if (clicouElementoFecharPopup) {
    popupDeletar.classList.remove('mostrar-popup');
  }
}

function removerVenda(idVendaSelecionada) {
  const { popupDeletar } = obterElementosDOM();

  id = idVendaSelecionada;

  mostrarPopup(popupDeletar);
  popupDeletar.addEventListener('click', fecharPopup);
}

export { removerVenda }