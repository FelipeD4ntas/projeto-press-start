import { ApiService } from "../../api/apiService.js";
import obterElementosDOM from "../../utils/obterElementosDOM.js";
import { aplicarMascaraData, aplicarMsascaraValorTotal } from "../../utils/mascaras.js";

async function listarVendas() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const respostaApi = await ApiService.get("Venda/listar", usuario.token);

  respostaApi.dados.forEach(listarVendasTabela);
  return respostaApi.dados;
}

function listarVendasTabela({ clienteId , dataFaturamento, dataVenda, id, nomeCliente, quantidadeItens, valorTotal }) {
  const { corpoTabelaVendas } = obterElementosDOM();
  const valorTotalMascarado = aplicarMsascaraValorTotal(valorTotal);
  const dataFaturamentoMascarada = aplicarMascaraData(dataFaturamento);
  const dataVendaMascarada = aplicarMascaraData(dataVenda);

  if (corpoTabelaVendas) {
    corpoTabelaVendas.innerHTML += 
    `<tr data-venda="${id}" data-cliente="${clienteId}" data-nome="${nomeCliente}" class="linhas-tabela">
        <td data-js="nome-cliente" class="nome-cliente">${nomeCliente}</td>
        <td data-js="qtd-itens-venda" class="qtd-vendas">${quantidadeItens}</td>
        <td data-js="data-venda" class="data-venda">${dataVendaMascarada}</td>
        <td data-js="data-faturamento" class="data-faturamento">${dataFaturamentoMascarada}</td>
        <td data-js="valor-total-venda" class="valor-total">${valorTotalMascarado}</td>
        <td class="coluna-btn-deletar-editar">
          <button class="btn-deletar-itens-lista" data-deletar="${id}" data-id="${id}" data-js="btn-deletar-itens-lista">Deletar</button>
          <button class="btn-editar-itens-lista" data-editar="${id}" data-id="${id}" data-js="btn-editar-itens-lista">Editar</button>
        </td>
        <td data-js="detalhes-vendas" class="icone-detalhes-vendas">
          <button class="btn-detalhes detalhes-vendas" data-js="btn-detalhes" data-detalhes="${id}" data-id="${id}">${valorTotalMascarado}</button>
        </td>
    </tr>`
  }
}

export { listarVendas }