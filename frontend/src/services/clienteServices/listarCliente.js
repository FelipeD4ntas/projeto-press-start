import { ApiService } from '../../api/apiService.js'
import verificarClienteInativo from '../../utils/verificarClienteInativo.js';
import obterElementosDOM from '../../utils/obterElementosDOM.js';
import { aplicarMascaraTelefone, aplicarMascaraCpf } from '../../utils/mascaras.js';

async function listarClientes() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const respostaApi = await ApiService.get("Cliente/listar", usuario.token);

  respostaApi.dados.forEach(listarClientesTabela);
  return respostaApi.dados;
}

function listarClientesTabela({ id, nome, email, telefone, cpf, inativo }) {
  const { corpoTabelaClientes } = obterElementosDOM();
  const telefoneMascarado = aplicarMascaraTelefone(telefone);
  const cpfMascarado = aplicarMascaraCpf(cpf);

  if (corpoTabelaClientes)  {
    corpoTabelaClientes.innerHTML += 
    `<tr data-item="${id}" data-nome="${nome}" class="linhas-tabela">
      <td data-js="nome-cliente" class="nome-cliente">${nome}</td>
      <td data-js="email-cliente" class="email-cliente">${email}</td>
      <td data-js="telefone-cliente" class="telefone-cliente">${telefoneMascarado}</td>
      <td data-js="cpf-cliente" class="cpf-cliente">${cpfMascarado}</td>
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
}

export { listarClientes }