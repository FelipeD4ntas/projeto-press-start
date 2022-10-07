import { autenticarLogin, adicionarEventosInputsLogin } from './autenticarDados.js';
import obterElementosDOM from './obterElementosDOM.js';

export default () => {
  const { formLogin } = obterElementosDOM();

  if (formLogin) {
    function fazerLogin(event) {
      event.preventDefault();
  
      const { emailLoginPassouNaRegra, senhaLoginPassouNaRegra  } = autenticarLogin();
  
      const inputsLoginPassramNaRegra = 
        emailLoginPassouNaRegra && 
        senhaLoginPassouNaRegra
  
      if (inputsLoginPassramNaRegra) {
        console.log('entrou')
      }
    }

    adicionarEventosInputsLogin(emailUsuario);
    adicionarEventosInputsLogin(senhaUsuario);
    formLogin.addEventListener('submit', fazerLogin);
  }  
}
