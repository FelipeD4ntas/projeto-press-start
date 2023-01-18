import { ApiService } from "../../api/apiService.js";
import obterElementosDOM from "../../utils/obterElementosDOM.js";
import { mostrarPopup } from "../../utils/popup.js";
import { listarClientes } from "./listarCliente.js";
import { resetarPaginas } from "../../utils/resetarPaginas.js";
import { manipularPopup } from "../../utils/popup.js";

let id = '';

const fecharPopup = async (event) => {
  const { popupDeletar, corpoTabelaClientes, alertaInaticarCliente } = obterElementosDOM();
  const classeElementoClicado = event.target.classList.value;
  const classNames = ['closedPopup', 'confirmarExclusao', 'cancelarExclusao', 'mostrar-popup'];
  const clicouElementoFecharPopup = classNames.some(className => className === classeElementoClicado);
  const excluirItem = classeElementoClicado == 'confirmarExclusao' && clicouElementoFecharPopup;

  if (excluirItem) {
    const usuario = JSON.parse(localStorage.getItem('usuario')); 
    const respostaApi = await ApiService.delete('Cliente/deletar', id, usuario.token);
    const notificacoes = respostaApi.notificacoes;
    popupDeletar.classList.remove('mostrar-popup');
    
    if (!respostaApi.sucesso) {
      notificacoes.forEach(notificacao => alertaInaticarCliente.innerHTML = notificacao.message);
      manipularPopup('popup-alerta-deletar', 'confirmar-alerta-deletar');
    }

    resetarPaginas(corpoTabelaClientes);
    listarClientes();
  } 
  
  if (clicouElementoFecharPopup) {
    popupDeletar.classList.remove('mostrar-popup');
  }
}

function removerCliente(idClienteSelecionado) {
  const { popupDeletar } = obterElementosDOM();

  id = idClienteSelecionado;

  mostrarPopup(popupDeletar);
  popupDeletar.addEventListener('click', fecharPopup);
}

export { removerCliente }