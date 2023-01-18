import { autenticarLogin, adicionarEventosInputsLogin } from '../../utils/autenticarDados.js';
import obterElementosDOM from '../../utils/obterElementosDOM.js';
import { ApiService } from '../../api/apiService.js'
import { validarToken } from '../../utils/validarToken.js';
import { criarConta } from './adicionarUsuario.js';
import resetarInputs from '../../utils/resetarInputs.js';
import { aplicarEstiloNeutroInputs } from '../../utils/aplicarEstilos.js';

async function verificarLogUsuario() {
  const { formLogin, btnCriarConta, btnCancelarCriarConta } = obterElementosDOM();
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const tokenValidado = await validarToken(usuario); 

  if (tokenValidado.status == 200) {
    window.location.replace("/")
  }

  adicionarEventosInputsLogin(emailUsuario);
  adicionarEventosInputsLogin(senhaUsuario);
  btnCancelarCriarConta.addEventListener('click', voltarTela);
  btnCriarConta.addEventListener('click', mudarTela)
  formLogin.addEventListener('submit', login);
}

function voltarTela() {
  const { boxFormCriarUsuario } = obterElementosDOM();
  boxFormCriarUsuario.style.left = '100%';
  aplicarEstiloNeutroInputs('telaAddUsuario');
}

function mudarTela() {
  const { boxFormCriarUsuario } = obterElementosDOM();
  boxFormCriarUsuario.style.left = 0;
  resetarInputs('telaAddUsuario');
  criarConta();
}

async function login(event) {
  event.preventDefault();
  const { emailLoginPassouNaRegra, senhaLoginPassouNaRegra  } = autenticarLogin();
  const bodyLogin = {
    login: `${emailUsuario.value}`,
    senha: `${senhaUsuario.value}`
   }
  const respostaApi = await ApiService.login("Usuario/login", bodyLogin);
  const dados = respostaApi.dados;
  const notificacoes = respostaApi.notificacoes;

  if (respostaApi.sucesso) {
    localStorage.setItem('usuario', JSON.stringify(dados)) 
  }
  
  const inputsLoginPassramNaRegra = 
    emailLoginPassouNaRegra && 
    senhaLoginPassouNaRegra
    
  if (inputsLoginPassramNaRegra && respostaApi.sucesso) {
    window.location.replace("/")
  } else {
    msgErro.setAttribute('style', 'display: block');
    
    notificacoes.forEach(notificacao => {
      msgErro.innerHTML = notificacao.message
    }); 
  }
}

window.addEventListener('load', verificarLogUsuario)