import { aplicarEstiloNeutroInputs } from "../services/aplicarEstilos.js";
import obterElementosDOM from "../services/obterElementosDOM.js";

function resetarInputs(telaEmFoco) {
  const { descricoesItens, precosUnitario, quantidadesItens, valoresTotais } = obterElementosDOM();
  switch (telaEmFoco) {
    case 'telaClientes':
      nomeCliente.value = '';
      emailCliente.value = '';
      telefoneCliente.value = '';
      cpfCliente.value = '';
      aplicarEstiloNeutroInputs('telaClientes');
      break
    case 'telaVendas':
      for (let indice = 0; indice < quantidadesItens.length; indice++) {
        descricoesItens[indice].value = '';
        precosUnitario[indice].value = '';
        quantidadesItens[indice].value = '';
        valoresTotais[indice].value = '';
      }
      dataFaturamento.value = '';
      aplicarEstiloNeutroInputs('telaVendas');
      break
  }
 
  
}

export default resetarInputs;