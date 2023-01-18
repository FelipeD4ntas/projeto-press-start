import { exibirValorVenda } from "../services/vendaServices/adicionarVenda.js";
import obterElementosDOM from "./obterElementosDOM.js";
import { manipularPopup } from "./popup.js";

function removerItemVenda(event) { 
  const { quantidadesItens } = obterElementosDOM();

  if (event.target.parentNode.parentNode.dataset.js == 'box-mais-itens') {
    event.target.parentNode.parentNode.remove();
    exibirValorVenda();
  }

  if (event.target.parentNode.parentNode.dataset.js == 'box-itens-do-pedido') {
    if (quantidadesItens.length == 1) {
      const { conteudoPopupEditarVenda } = obterElementosDOM();
      conteudoPopupEditarVenda.innerHTML = 'É preciso ter pelo menos um item.';
      manipularPopup('popup-editar-registro', 'finalizar-edicao');
      return
    }
    
    event.target.parentNode.parentNode.remove();
    exibirValorVenda();
  }
}

export { removerItemVenda }