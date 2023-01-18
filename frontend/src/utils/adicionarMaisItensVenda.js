import { removerItemVenda } from "./removerItemVenda.js";

function adicionarMaisItens() {
  const { boxBtnMaisItens } = obterElementosDOM();
  const boxMaisItens = document.createElement('div');
  boxMaisItens.setAttribute('data-js', 'box-mais-itens');
  boxMaisItens.classList.add('novo-item-venda');
  
  boxMaisItens.innerHTML = `
    <button type="button" class="icone-deletar-item" data-js="icone-deletar-item">
        <img src="assets/img/icone-deletar-item.png" alt="icone-deletar-item" />
    </button>
    <div class="box-form-conjunto-input conjunto-input">
      <label for="descricaoItem">
        Descrição do item
        <input type="text" name="descricaoItem" data-js="descricao-item" required>
        <span class="mensagem-input-valido" data-js="mensagem-descricao-invalida">Descrição deve conter pelo menos sete caracteres.</span>
      </label>
      <label for="precoUnitario">
        Valor unitário
        <input type="text" name="precoUnitario"data-js="preco-unitario" required>
        <span class="mensagem-input-valido" data-js="mensagem-valor-invalido">Valor inválido.</span>
      </label>
    </div>
    <div class="box-form-conjunto-input conjunto-input">
      <label for="quantidadeItem">
        Quantidade
        <input type="number" name="quantidadeItem" data-js="quantidade-item" required>
        <span class="mensagem-input-valido" data-js="mensagem-quantidade-invalida">Escolha uma quantidade.</span>
      </label>
      <label for="valorTotal">
        Valor total
        <input type="text" name="valorTotal" data-js="soma-valores" disabled>
      </label>
    </div>
  `
  boxBtnMaisItens.insertAdjacentElement('beforebegin', boxMaisItens);
  
  const { btnDeletarItem } = obterElementosDOM();
  btnDeletarItem.forEach(item => item.addEventListener('click', removerItemVenda));

  iterarInputsParaAdicionarEventos();
}

export { adicionarMaisItens }