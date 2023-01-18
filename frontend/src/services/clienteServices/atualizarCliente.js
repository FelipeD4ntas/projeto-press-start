import { ApiService } from "../../api/apiService.js";
import { aplicarEstilosPagEditar } from "../../utils/aplicarEstilos.js";
import { adicionarEventosInputsClientes } from "../../utils/autenticarDados.js";
import { alterarDisplayElementos, restaurarDisplayElementos, restaurarDisplayElementosMobile } from "../../utils/aplicarEstilos.js";
import { autenticarDadosClientes } from "../../utils/autenticarDados.js";
import { manipularPopup } from "../../utils/popup.js";
import obterElementosDOM from "../../utils/obterElementosDOM.js";

const usuario = JSON.parse(localStorage.getItem('usuario'));
let id = ''

async function atualizarCliente(idCliente) {
  const { btnVoltarHeader, iconeBtnVoltarHeader,
    formEditarClientes } = obterElementosDOM();

  const respostaApi = await ApiService.get(`Cliente/obter/${idCliente}`, usuario.token);
  const cliente = respostaApi.dados;
  
  if (formEditarClientes) {
    id = idCliente
    adicionarEventosInputsClientes(nomeCliente);
    adicionarEventosInputsClientes(emailCliente);
    adicionarEventosInputsClientes(telefoneCliente);
    adicionarEventosInputsClientes(cpfCliente);
    formEditarClientes.addEventListener('submit', verificarAutenticacaoFormAtualizarCliente);
  }

  preencherCampos(cliente);
  alterarDisplayElementos();
  btnVoltarHeader.addEventListener('click', restaurarDisplayElementos);
  iconeBtnVoltarHeader.addEventListener('click', restaurarDisplayElementosMobile);
}

function verificarAutenticacaoFormAtualizarCliente(event) {
  event.preventDefault();
  
  const { 
    nomePassouNaRegra, 
    emailPassouNaRegra, 
    telefonePassouNaRegra, 
    cpfPassouNaRegra } = autenticarDadosClientes();

  const inputsClientesPassaramNasRegras = 
    nomePassouNaRegra && 
    emailPassouNaRegra && 
    telefonePassouNaRegra && 
    cpfPassouNaRegra

  if (inputsClientesPassaramNasRegras) {
    const telefoneFormatado = telefoneCliente.value.replace(/[^0-9]+/g,'');
    const cpfFormatado = cpfCliente.value.replace(/[^0-9]+/g,'');

    atualizarClienteResponse(
      id,
      nomeCliente.value,
      emailCliente.value,
      telefoneFormatado,
      cpfFormatado
    );
    
    manipularPopup('popup-editar-registro', 'finalizar-edicao');
  }
}

async function atualizarClienteResponse(idCliente, nomeCliente, emailCliente, telefoneCliente, cpfCliente) {
  const { conteudoPopupEditarCliente } = obterElementosDOM();
  const bodyAdicionarCliente = {
    id: idCliente,
    nome: nomeCliente,
    email: emailCliente,
    telefone: telefoneCliente,
    cpf: cpfCliente
  }
  const respostaApi = await ApiService.put('Cliente/atualizar', bodyAdicionarCliente, usuario.token);
  const notificacoes = respostaApi.notificacoes;
  
  if (respostaApi.sucesso) {
    conteudoPopupEditarCliente.innerHTML = respostaApi.dados;
    return
  }

  notificacoes.forEach(notificacao => conteudoPopupEditarCliente.innerHTML = notificacao.message);
  aplicarEstilosPagEditar();
}

function preencherCampos({ nome, email, telefone, cpf }) {
  const { tabelaClientes } = obterElementosDOM();

  if (tabelaClientes) {
    nomeCliente.value = nome;
    emailCliente.value = email;
    telefoneCliente.value = telefone;
    cpfCliente.value = cpf
  }
}

export { atualizarCliente }