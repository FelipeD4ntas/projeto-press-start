import obterElementosDOM from './obterElementosDOM.js';
import mascararItem from '../utils/mascararItem.js';
import alterarTextoConteudo from '../utils/alterarTextoConteudo.js';
import { aplicarEstiloValidoInvalidoInputs } from './aplicarEstilos.js';

function aplicarMascaraData(dataFaturamento) {
  return mascararItem(
    dataFaturamento,
    /^(\d{2})(\d{2})/g, "$1/$2",
    /(\d{4})$/, "/$1"
  )
}

function aplicarMascaraPreco(precoUnitario) {
  const estiloDaMoeda = new Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'});
  const valorPrecoBruto = precoUnitario.replace(/\D/g, '');
  const valorFormatado = (estiloDaMoeda.format(parseFloat(valorPrecoBruto / 100)));
  return valorFormatado;
}

function aplicarMascaraCpf(cpfCliente) {
  return mascararItem(
    cpfCliente, 
    /^(\d{3})(\d{3})/g, "$1.$2", 
    /(\d{3})(\d{2})$/,".$1-$2"
  );
}

function aplicarMascaraTelefone(telefoneCliente) {
  return mascararItem(
    telefoneCliente,
    /^(\d{2})(\d{5})/g, "($1) $2",
    /(\d{5})(\d{4})$/, "$1-$2"
  );
}

function validarDataFaturamento() {
  dataFaturamento.value = aplicarMascaraData(dataFaturamento.value);

  const dia = dataFaturamento.value.slice(0, 2);
  const mes = dataFaturamento.value.slice(3,5);
  const ano = dataFaturamento.value.slice(6,10);
  const dataDigitada = new Date(ano, mes - 1, dia);
  const dataPassouNaRegra = 
    dataDigitada.getFullYear() == ano && 
    dataDigitada.getMonth() + 1 == mes && 
    dataDigitada.getDate() == dia;

  return dataPassouNaRegra
}

function validarDescricaoItem() {
  const { descricoesItens } = obterElementosDOM();
  let descricaoItemPassouNaRegra = []

  for (let indice = 0; indice < descricoesItens.length; indice++) {
    descricaoItemPassouNaRegra.push(false);

    if (descricoesItens[indice].value.length >= 7) {
      descricaoItemPassouNaRegra[indice] = true;
    } 
  }

  return descricaoItemPassouNaRegra;
}

function validarPrecoUnitario() {
  const { precosUnitario } = obterElementosDOM();
  let precoUnitarioPassouNaRegra = [];

  for (let indice = 0; indice < precosUnitario.length; indice++) {
    const valorPrecoBruto = precosUnitario[indice].value.replace(/\D/g, '');
    precosUnitario[indice].value = aplicarMascaraPreco(precosUnitario[indice].value);
    precoUnitarioPassouNaRegra.push(false);

    if (valorPrecoBruto != 0) {
      precoUnitarioPassouNaRegra[indice] = true;
    } 
  }

  return precoUnitarioPassouNaRegra;
}

function validarQuantidadeVenda() {
  const { quantidadesItens } = obterElementosDOM();
  let quantidadeVendaPassouNaRegra = [];

  for (let indice = 0; indice < quantidadesItens.length; indice++) {
    const valorBrutoQuantidade = Number(quantidadesItens[indice].value);
    quantidadeVendaPassouNaRegra.push(false);

    if (valorBrutoQuantidade > 0) {
      quantidadeVendaPassouNaRegra[indice] = true;
    } 
  }
  
  return quantidadeVendaPassouNaRegra;
}

function validarNome() {
  const regraNome = /^[a-záàâãéèêíïóôõöúçñ ?]{3,}$/i
  const nomePassouNaRegra = regraNome.test(nomeCliente.value);
  return nomePassouNaRegra;
}

function validarEmail(email) {
  const regraEmail = /^[a-z0-9!#$%&'*.+\/=?^-`{|}~-]{1,}\@{1,1}[a-zA-Z]{1,}\.[a-zA-Z]{2,}$/i
  const emailPassouNaRegra = regraEmail.test(email);
  return emailPassouNaRegra;
}

function validarTelefone() {
  const regraTelefone = /^\(?[1-9]{2}\)? ?[9]{1,1}[6-9]{1}[0-9]{3}\-?[0-9]{4}$/
  telefoneCliente.value = aplicarMascaraTelefone(telefoneCliente.value);
  const telefonePassouNaRegra = regraTelefone.test(telefoneCliente.value);
  return telefonePassouNaRegra;
}

function validarCpf() {
  const regraCPF =  /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/
  cpfCliente.value = aplicarMascaraCpf(cpfCliente.value);
  const cpfPassouNaRegra = regraCPF.test(cpfCliente.value);
  return cpfPassouNaRegra;
}

function validarSenha() {
  const regraSenha = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/
  const senhaLoginPassouNaRegra = regraSenha.test();
  return senhaLoginPassouNaRegra;
}

function verificarSeTemNumerosNoNomeDigitado() {
  const { mensagemNomeInvalido } = obterElementosDOM();
  
  const regraVerificarNumeroNoNome = /^[a-záàâãéèêíïóôõöúçñ ?]{0,}[0-9]{1,}$/i
  const nomeTemNumero = regraVerificarNumeroNoNome.test(nomeCliente.value);

  if (nomeTemNumero) {
    alterarTextoConteudo(mensagemNomeInvalido, 'O nome não pode conter números.');
    return
  }

  alterarTextoConteudo(mensagemNomeInvalido, 'O nome deve conter pelo menos três caracteres.');
}

function verificarAutenticacaoLogin(event) {
  const inputSelecionado = event.target;
  
  const { emailLoginPassouNaRegra, senhaLoginPassouNaRegra } = autenticarLogin();

  aplicarEstiloValidoInvalidoInputs(emailLoginPassouNaRegra, inputSelecionado, emailUsuario);
  aplicarEstiloValidoInvalidoInputs(senhaLoginPassouNaRegra, inputSelecionado, senhaUsuario);
}

function verificarAutenticacaoClientes(event) {
  const inputSelecionado = event.target;
  
  const { 
    nomePassouNaRegra, 
    emailPassouNaRegra, 
    telefonePassouNaRegra, 
    cpfPassouNaRegra } = autenticarDadosClientes();

  verificarSeTemNumerosNoNomeDigitado();
  aplicarEstiloValidoInvalidoInputs(nomePassouNaRegra, inputSelecionado, nomeCliente);
  aplicarEstiloValidoInvalidoInputs(emailPassouNaRegra, inputSelecionado, emailCliente);
  aplicarEstiloValidoInvalidoInputs(telefonePassouNaRegra, inputSelecionado, telefoneCliente);
  aplicarEstiloValidoInvalidoInputs(cpfPassouNaRegra, inputSelecionado, cpfCliente);
}

function verificarAutenticacaoVendas(event) {
  const inputSelecionado = event.target;
  const { descricoesItens, precosUnitario, quantidadesItens } = obterElementosDOM()
  const { dataPassouNaRegra, descricaoItemPassouNaRegra, precoUnitarioPassouNaRegra, quantidadeItemPassouNaRegra } = autenticarDadosVendas();
  
  for (let indice = 0; indice < quantidadesItens.length; indice++) {
    aplicarEstiloValidoInvalidoInputs(descricaoItemPassouNaRegra[indice], inputSelecionado, descricoesItens[indice]);
    aplicarEstiloValidoInvalidoInputs(precoUnitarioPassouNaRegra[indice], inputSelecionado, precosUnitario[indice]);
    aplicarEstiloValidoInvalidoInputs(quantidadeItemPassouNaRegra[indice], inputSelecionado, quantidadesItens[indice]);
  }

  aplicarEstiloValidoInvalidoInputs(dataPassouNaRegra, inputSelecionado, dataFaturamento);
}

function adicionarEventosInputsLogin(elemento) {
  elemento.addEventListener('keyup', verificarAutenticacaoLogin);
}

function adicionarEventosInputsClientes(elemento) {
  elemento.addEventListener('keyup', verificarAutenticacaoClientes);
}

function adicionarEventosInputsVenda(elemento) {
  elemento.addEventListener('keyup', verificarAutenticacaoVendas);
}

function autenticarLogin() {
  const emailLoginPassouNaRegra = validarEmail(emailUsuario.value);
  const senhaLoginPassouNaRegra = validarSenha();
  return { emailLoginPassouNaRegra, senhaLoginPassouNaRegra };
}

function autenticarDadosVendas() {
  const dataPassouNaRegra = validarDataFaturamento();
  const descricaoItemPassouNaRegra = validarDescricaoItem();
  const precoUnitarioPassouNaRegra = validarPrecoUnitario();
  const quantidadeItemPassouNaRegra = validarQuantidadeVenda();
  
  return { dataPassouNaRegra, descricaoItemPassouNaRegra, precoUnitarioPassouNaRegra, quantidadeItemPassouNaRegra }
}

function autenticarDadosClientes() {
  const nomePassouNaRegra = validarNome();
  const emailPassouNaRegra = validarEmail(emailCliente.value);
  const telefonePassouNaRegra = validarTelefone();
  const cpfPassouNaRegra = validarCpf();
  
  return { nomePassouNaRegra, emailPassouNaRegra, telefonePassouNaRegra, cpfPassouNaRegra };
}

export { 
  autenticarDadosClientes, autenticarDadosVendas, 
  autenticarLogin, adicionarEventosInputsClientes, 
  adicionarEventosInputsVenda, adicionarEventosInputsLogin };
