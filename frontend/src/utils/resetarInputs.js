import { aplicarEstiloNeutroInputs } from "./aplicarEstilos.js";
import obterElementosDOM from "./obterElementosDOM.js";

function resetarInputs(telaEmFoco) {
  const { descricoesItens, precosUnitario, quantidadesItens, valoresTotais, formAddCliente, formAddVenda, fomrAddUsuario } = obterElementosDOM();
  if (formAddCliente || formAddVenda || fomrAddUsuario) {
    switch (telaEmFoco) {
      case 'telaAddClientes':
        nomeCliente.value = '';
        emailCliente.value = '';
        telefoneCliente.value = '';
        cpfCliente.value = '';

        aplicarEstiloNeutroInputs('telaAddClientes');
        break
      case 'telaAddVendas':
        for (let indice = 0; indice < quantidadesItens.length; indice++) {
          descricoesItens[indice].value = '';
          precosUnitario[indice].value = '';
          quantidadesItens[indice].value = '';
          valoresTotais[indice].value = '';
        }
        dataFaturamento.value = '';
        aplicarEstiloNeutroInputs('telaAddVendas');
        break
      case 'telaAddUsuario':
        nomeCriarUsuario.value = '';
        emailCriarUsuario.value = '';
        senhaCriarUsuario.value = '';
        confirmarSenhaUsuario.value = '';
        break
    }
  }
}

export default resetarInputs;