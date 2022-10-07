import obterElementosDOM from './obterElementosDOM.js';
import obterDadosBD from '../database/obterDadosBD.js';
import addItemLocalStorage from '../database/adicionarDadosBD.js';
import resetarInputs from '../utils/resetarInputs.js';
import { manipularPopup } from '../utils/popup.js';
import { autenticarDadosClientes, adicionarEventosInputsClientes } from './autenticarDados.js'

export default () => {
  const { formAddCliente } = obterElementosDOM();

  if (formAddCliente) {
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
        adicionarNovoCliente(
          nomeCliente.value, 
          emailCliente.value, 
          telefoneCliente.value, 
          cpfCliente.value);
      }
    }

    function adicionarNovoCliente(nomeCliente, emailCliente, telefoneCliente, cpfCliente) {
      let bancoLocalStorage = obterDadosBD();
      let ultimoClienteID = 0;

      if (bancoLocalStorage.length > 0) {
        const quantidadeClientes = bancoLocalStorage.length;
        ultimoClienteID = bancoLocalStorage[quantidadeClientes - 1].id;
        ultimoClienteID++
      }

      bancoLocalStorage.push(
        {
          "id": ultimoClienteID,
          "nome": nomeCliente,
          "email": emailCliente.toLowerCase(),
          "telefone": telefoneCliente,
          "cpf": cpfCliente,
          "inativo": false,
          "vendas": []
        }
      )
      
      resetarInputs('telaClientes');
      manipularPopup('popup-adicionar-registro', 'finalizar-registro');
      addItemLocalStorage(bancoLocalStorage);
    }

    adicionarEventosInputsClientes(nomeCliente);
    adicionarEventosInputsClientes(emailCliente);
    adicionarEventosInputsClientes(telefoneCliente);
    adicionarEventosInputsClientes(cpfCliente);
    formAddCliente.addEventListener('submit', verificarAutenticacaoFormAddCliente);
  }
}
