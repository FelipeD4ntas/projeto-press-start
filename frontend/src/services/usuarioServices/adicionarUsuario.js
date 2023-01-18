import obterElementosDOM from "../../utils/obterElementosDOM.js";
import { autenticarCriacaoUsuario, adicionarEventosInputsCriarUsuario } from "../../utils/autenticarDados.js";
import { ApiService } from "../../api/apiService.js";
import { manipularPopup } from "../../utils/popup.js";
import { aplicarEstiloNeutroInputs } from "../../utils/aplicarEstilos.js";

async function salvarUsuario(event) {
  event.preventDefault();
  const { conteudoPopupCriarUsuario, linkFecharPopupCriarUsuario } = obterElementosDOM();
  const { 
    emailCriarUsuarioPassouNaRegra, 
    senhaCriarUsuarioPassouNaRegra, 
    confirmacaoSenhaPassouNaRegra, 
    nomeCriarUsuarioPassouNaRegra } = autenticarCriacaoUsuario();

  if (emailCriarUsuarioPassouNaRegra &&
    senhaCriarUsuarioPassouNaRegra &&
    confirmacaoSenhaPassouNaRegra &&
    nomeCriarUsuarioPassouNaRegra) {

      const bodyCriarUsuario = {
        nome: nomeCriarUsuario.value,
        email: emailCriarUsuario.value.toLowerCase(),
        senha: senhaCriarUsuario.value,
        confirmacaoSenha: confirmarSenhaUsuario.value
      }

      const respostaApi = await ApiService.criarUsuario("Usuario/adicionar", bodyCriarUsuario);
      const notificacoes = respostaApi.notificacoes;
      
      if (respostaApi.sucesso) {
        conteudoPopupCriarUsuario.innerHTML = respostaApi.dados.mensagem;
        manipularPopup('popup-adicionar-registro', 'finalizar-registro');
        linkFecharPopupCriarUsuario.forEach(itemFechar => itemFechar.addEventListener('click', voltarPaginaLogin));
        return
      }

      notificacoes.forEach(notificacao => conteudoPopupCriarUsuario.innerHTML = notificacao.message);
      manipularPopup('popup-adicionar-registro', 'finalizar-registro');  
    }
}

function voltarPaginaLogin() {
  const { boxFormCriarUsuario } = obterElementosDOM();
  boxFormCriarUsuario.style.left = '100%';
  aplicarEstiloNeutroInputs('telaAddUsuario');
}

function criarConta() {
  const { fomrAddUsuario } = obterElementosDOM();
  
  adicionarEventosInputsCriarUsuario(nomeCriarUsuario);
  adicionarEventosInputsCriarUsuario(emailCriarUsuario);
  adicionarEventosInputsCriarUsuario(senhaCriarUsuario);
  adicionarEventosInputsCriarUsuario(confirmarSenhaUsuario);
  fomrAddUsuario.addEventListener('submit', salvarUsuario);
}

export { criarConta }