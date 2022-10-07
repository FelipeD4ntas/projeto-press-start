import obterElementosDOM from "./obterElementosDOM.js";
import verificarClienteInativo from './verificarClienteInativo.js'
import { exibirValorTotal } from './adicionarNovaVenda.js';

function listarElementosTabela({ id, nome, email, telefone, cpf, inativo, vendas }) {
  const { corpoTabelaClientes, corpoTabelaVendas, selectCliente } = obterElementosDOM();
  const existeCliente = nome;
 
  if (existeCliente && corpoTabelaClientes)  {
    corpoTabelaClientes.innerHTML += 
    `<tr data-item="${id}" data-nome="${nome}" class="linhas-tabela">
      <td data-js="nome-cliente" class="nome-cliente">${nome}</td>
      <td data-js="email-cliente" class="email-cliente">${email}</td>
      <td data-js="telefone-cliente" class="telefone-cliente">${telefone}</td>
      <td data-js="cpf-cliente" class="cpf-cliente">${cpf}</td>
      <td class="coluna-btn-deletar-editar" data-acao="${id}">
        <button class="btn-deletar-itens-lista" data-deletar="${id}" data-js="btn-deletar-itens-lista">Deletar</button>
        <button class="btn-editar-itens-lista" data-editar="${id}" data-js="btn-editar-itens-lista">Editar</button>
      </td>
      <td class="coluna-cliente-inativo" data-inativo="${id}">Cliente Inativo</td>
      <td data-js="detalhes-clientes" class="icone-detalhes-clientes">
        <button class="btn-detalhes" data-js="btn-detalhes">
          <img src="assets/img/icone-cliente.png" alt="icone cliente" data-detalhes="${id}">
        </button>
      </td>
    </tr>`

    verificarClienteInativo(inativo, id);
  } 

  if (existeCliente && corpoTabelaVendas) {
    vendas.forEach(({qtd, dataVenda, dataFaturamento, valorTotal, idVenda }) => {
      qtd = qtd.indexOf(0) == 0 ? qtd.replace(0, '') : qtd;
      
      corpoTabelaVendas.innerHTML += 
      `<tr data-venda="${idVenda}" data-cliente="${id}" data-nome="${nome}" class="linhas-tabela">
          <td data-js="nome-cliente" class="nome-cliente">${nome}</td>
          <td data-js="qtd-itens-venda" class="qtd-vendas">${qtd}</td>
          <td data-js="data-venda" class="data-venda">${dataVenda}</td>
          <td data-js="data-faturamento" class="data-faturamento">${dataFaturamento}</td>
          <td data-js="valor-total-venda" class="valor-total">${valorTotal}</td>
          <td class="coluna-btn-deletar-editar">
            <button class="btn-deletar-itens-lista" data-deletar="${id}" data-id="${idVenda}" data-js="btn-deletar-itens-lista">Deletar</button>
            <button class="btn-editar-itens-lista" data-editar="${id}" data-id="${idVenda}" data-js="btn-editar-itens-lista">Editar</button>
          </td>
          <td data-js="detalhes-vendas" class="icone-detalhes-vendas">
            <button class="btn-detalhes detalhes-vendas" data-js="btn-detalhes" data-detalhes="${id}" data-id="${idVenda}">${valorTotal}</button>
          </td>
      </tr>`
    })
  }

  if (selectCliente) {
    selectCliente.innerHTML += `
      <option data-cliente="${id}">${nome}</option>
    `
    
    exibirValorTotal();
  }
}

export { listarElementosTabela }