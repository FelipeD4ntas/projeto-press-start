import { ApiService } from "../../api/apiService.js";
import { adicionarEventosInputsClientes } from "../../utils/autenticarDados.js";
import resetarInputs from "../../utils/resetarInputs.js";
import { manipularPopup } from "../../utils/popup.js";
import obterElementosDOM from "../../utils/obterElementosDOM.js";
import { autenticarDadosClientes } from "../../utils/autenticarDados.js";

function adicionarCliente() {
  const { formAddCliente } = obterElementosDOM();

  if (formAddCliente) {
    adicionarEventosInputsClientes(nomeCliente);
    adicionarEventosInputsClientes(emailCliente);
    adicionarEventosInputsClientes(telefoneCliente);
    adicionarEventosInputsClientes(cpfCliente);
    formAddCliente.addEventListener('submit', verificarAutenticacaoFormAddCliente);
  }
}

function verificarAutenticacaoFormAddCliente(event) {
  event.preventDefault();
  
  const { 
    nomePassouNaRegra, 
    emailPassouNaRegra, 
    telefonePassouNaRegra, 
    cpfPassouNaRegra } = autenticarDadosClientes();

  const inputsPassaramNasRegras = 
    nomePassouNaRegra && 
    emailPassouNaRegra && 
    telefonePassouNaRegra && 
    cpfPassouNaRegra

  if (inputsPassaramNasRegras) {
    const telefoneFormatado = telefoneCliente.value.replace(/[^0-9]+/g,'');
    const cpfFormatado = cpfCliente.value.replace(/[^0-9]+/g,'');

    adicionarClienteResponse(
      nomeCliente.value, 
      emailCliente.value, 
      telefoneFormatado, 
      cpfFormatado);
  }
}

async function adicionarClienteResponse(nomeCliente, emailCliente, telefoneCliente, cpfCliente) {
  const { conteudoPopupCliente, linkFecharPopupCliente } = obterElementosDOM();
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const bodyAdicionarCliente = {
    nome: nomeCliente,
    email: emailCliente.toLowerCase(),
    telefone: telefoneCliente,
    cpf: cpfCliente
  }
  const respostaApi = await ApiService.post('Cliente/adicionar', bodyAdicionarCliente, usuario.token);
  const notificacoes = respostaApi.notificacoes;

  if (respostaApi.sucesso) {
    conteudoPopupCliente.innerHTML = respostaApi.dados.mensagem;
    linkFecharPopupCliente.forEach(link => link.setAttribute('href', '#clientes'));
    
    resetarInputs('telaAddClientes');
    manipularPopup('popup-adicionar-registro', 'finalizar-registro');
    return
  } 

  notificacoes.forEach(notificacao => conteudoPopupCliente.innerHTML = notificacao.message);
  manipularPopup('popup-adicionar-registro', 'finalizar-registro');

  linkFecharPopupCliente.forEach(link => link.setAttribute('href', '#telaAddClientes'));
}

export { adicionarCliente }