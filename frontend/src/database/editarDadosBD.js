import obterElementosDOM from '../services/obterElementosDOM.js';
import obterDadosBD from './obterDadosBD.js';
import addItemLocalStorage from './adicionarDadosBD.js';
import alterarTextoConteudo from '../utils/alterarTextoConteudo.js';
import alterarEstadosLeituraInputs from '../utils/alterarEstadoLeituraInputs.js';
import { manipularPopup } from '../utils/popup.js';
import { autenticarDadosClientes, adicionarEventosInputsClientes, autenticarDadosVendas } from '../services/autenticarDados.js'
import { aplicarEstiloNeutroInputs, aplicarEstilos } from '../services/aplicarEstilos.js';
import { listarElementosTabela } from '../services/listarElementosTabela.js';
import { iterarInputsParaAdicionarEventos, atualizarValorTotal } from '../services/adicionarNovaVenda.js';

let cliente  = {};
let bancoItensEditados = [];
let idVendaAtual = 0;
let idClienteAtual = 0;

function preencherCampos({ nome, email, telefone, cpf, vendas, id }, idVenda) {
  const { tabelaClientes, tabelaVendas } = obterElementosDOM();

  if (tabelaClientes) {
    nomeCliente.value = nome;
    emailCliente.value = email;
    telefoneCliente.value = telefone;
    cpfCliente.value = cpf
  }

  if (tabelaVendas) {
    const { descricoesItens, precosUnitario, quantidadesItens, valoresTotais, saidaValorTotal } = obterElementosDOM();
    const bancoLocalStorage = obterDadosBD();
    
    vendas.forEach(venda => {
      if (venda.idVenda == idVenda) {
        for (let indice = 0; indice < quantidadesItens.length; indice++) {
          descricoesItens[indice].value = venda.descricaoProduto
          precosUnitario[indice].value = venda.precoUnitario
          quantidadesItens[indice].value = venda.qtd
          valoresTotais[indice].value = venda.valorTotal
        }

        selectCliente.innerHTML = `<option data-cliente="${id}">${nome}</option>`;
        dataFaturamento.value = venda.dataFaturamento;
        atualizarValorTotal(bancoLocalStorage, saidaValorTotal, id);
      }
    })
  }
}

function aplicarEstilosPagEditar() {
  const { 
    iconeBtnEditarHeader, iconeBtnDeletarHeader, 
    btnSalvar, tituloHeader, tituloForm, 
    descricoesItens, precosUnitario, quantidadesItens, 
    tabelaClientes, tabelaVendas } = obterElementosDOM();
    const clientes = obterDadosBD();
  
  if (tabelaClientes) {
    alterarEstadosLeituraInputs(nomeCliente, false);
    alterarEstadosLeituraInputs(emailCliente, false);
    alterarEstadosLeituraInputs(telefoneCliente, false);
    alterarEstadosLeituraInputs(cpfCliente, false);
    alterarTextoConteudo(tituloForm, 'Editar cliente');
    aplicarEstiloNeutroInputs('telaClientes');
    clientes.forEach(cliente => {
      if (cliente.id == idClienteAtual) {
        if (cliente.inativo == true) {
          aplicarEstilos(iconeBtnDeletarHeader, 'display', 'none');
          return
        }
        aplicarEstilos(iconeBtnDeletarHeader, 'display', 'block');
      }
    });
  }

  if (tabelaVendas) {
    descricoesItens.forEach(descricao => alterarEstadosLeituraInputs(descricao, false));
    precosUnitario.forEach(preco => alterarEstadosLeituraInputs(preco, false));
    quantidadesItens.forEach(quantidadeItem => alterarEstadosLeituraInputs(quantidadeItem, false));
    alterarEstadosLeituraInputs(dataFaturamento, false);
    alterarTextoConteudo(tituloForm, 'Editar venda');
    aplicarEstiloNeutroInputs('telaVendas');
    aplicarEstilos(iconeBtnDeletarHeader, 'display', 'block');
  }

  aplicarEstilos(btnSalvar, 'display', 'flex');
  aplicarEstilos(iconeBtnEditarHeader, 'display', 'none');
  alterarTextoConteudo(tituloHeader, 'Editar');
}

function editarDadosBD(idItem, idVenda) {
  aplicarEstilosPagEditar();
  manipularElementosPagEditar(idItem, idVenda);
}

function editarClientes(event) {
  event.preventDefault();
  const { corpoTabelaClientes } = obterElementosDOM();
  
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
    cliente.nome = nomeCliente.value;
    cliente.email = emailCliente.value;
    cliente.telefone = telefoneCliente.value;
    cliente.cpf = cpfCliente.value;

    corpoTabelaClientes.innerHTML = '';
    bancoItensEditados.forEach(listarElementosTabela);
    addItemLocalStorage(bancoItensEditados);
    manipularPopup('popup-editar-registro', 'finalizar-edicao');
  }
}

function editarVenda(event) {
  event.preventDefault();
  const { 
    corpoTabelaVendas, descricoesItens, 
    precosUnitario, quantidadesItens, 
    valoresTotais, saidaValorTotal } = obterElementosDOM();
  const { 
    dataPassouNaRegra, 
    descricaoItemPassouNaRegra, 
    precoUnitarioPassouNaRegra, 
    quantidadeItemPassouNaRegra } = autenticarDadosVendas();
    
  const inputsVendaPassaramNasRegras = 
  dataPassouNaRegra && 
  descricaoItemPassouNaRegra &&
  precoUnitarioPassouNaRegra &&
  quantidadeItemPassouNaRegra
  
  if (inputsVendaPassaramNasRegras) {
    cliente.vendas.forEach(venda => {
      if (venda.idVenda == idVendaAtual) {
        for (let indice = 0; indice < quantidadesItens.length; indice++) {
          venda.descricaoProduto = descricoesItens[indice].value
          venda.precoUnitario = precosUnitario[indice].value
          venda.qtd = quantidadesItens[indice].value 
          venda.valorTotal = valoresTotais[indice].value
        }
        venda.dataFaturamento = dataFaturamento.value;
      }
    });

    corpoTabelaVendas.innerHTML = '';
    bancoItensEditados.forEach(listarElementosTabela);
    addItemLocalStorage(bancoItensEditados);
    manipularPopup('popup-editar-registro', 'finalizar-edicao');
    atualizarValorTotal(bancoItensEditados, saidaValorTotal, cliente.id); 
  }
}

function manipularElementosPagEditar(id, idVenda) {
  const { 
    tabelaClientes, tabelaVendas, headerClientesVendas, btnVoltarHeader, 
    iconeBtnVoltarHeader, btnAdicionarHeader, formEditarClientes, formEditarVenda, btnMaisItens } = obterElementosDOM();
  const bancoLocalStorage = obterDadosBD();
  const clienteEmFoco = bancoLocalStorage.filter(itemLista => itemLista.id == id);

  idClienteAtual = id;
  idVendaAtual = idVenda;
  
  function setarDisplayElementos(
    displayheaderClientesVendas, displaytabelaClientes, displaytabelaVendas, 
    displayformEditarClientes, displayformEditarVenda, displaybtnVoltar, displaybtnAdicionar) {
    
    if (tabelaClientes) {
      aplicarEstilos(tabelaClientes, 'display', displaytabelaClientes);
      aplicarEstilos(formEditarClientes, 'display', displayformEditarClientes);
    }

    if (tabelaVendas) {
      aplicarEstilos(tabelaVendas, 'display', displaytabelaVendas);
      aplicarEstilos(formEditarVenda, 'display', displayformEditarVenda);
    }

    aplicarEstilos(headerClientesVendas, 'display', displayheaderClientesVendas);
    aplicarEstilos(btnVoltarHeader, 'display', displaybtnVoltar);
    aplicarEstilos(btnAdicionarHeader, 'display', displaybtnAdicionar);
  }

  function restaurarDisplayElementosMobile() {
    const { menuLateral, conteudoPrincipal, headerTelasComMenu, headerTelasSemMenu } = obterElementosDOM();
    const telaMobile = window.matchMedia("(max-width: 610px)");
    const entrouNoMobile = telaMobile.matches;

    if (tabelaClientes) {
      aplicarEstilos(tabelaClientes, 'display', 'flex'); 
      aplicarEstilos(formEditarClientes, 'display', 'none');
    }

    if (tabelaVendas) {
      aplicarEstilos(tabelaVendas, 'display', 'flex');
      aplicarEstilos(formEditarVenda, 'display', 'none');
    }

    aplicarEstilos(menuLateral, 'display', 'grid');
    aplicarEstilos(headerTelasComMenu, 'display', 'flex');
    aplicarEstilos(headerTelasSemMenu, 'display', 'none');
    aplicarEstilos(headerClientesVendas, 'display', 'flex');
    aplicarEstilos(btnAdicionarHeader, 'display', 'block');
    aplicarEstilos(btnVoltarHeader, 'display', 'none');
   
    if (entrouNoMobile) {
      aplicarEstilos(conteudoPrincipal, 'marginBottom', '100px');
    } else {
      aplicarEstilos(conteudoPrincipal, 'marginBottom', '25px');
    }
  }

  function restaurarDisplayElementos() {
    setarDisplayElementos('flex', 'flex', 'flex', 'none', 'none', 'none', 'block');
  }

  function alterarDisplayElementos() {
    setarDisplayElementos('none', 'none', 'none', 'block', 'block', 'block', 'none');
  }

  cliente = clienteEmFoco.shift();
  bancoItensEditados = bancoLocalStorage;

  if (formEditarClientes) {
    adicionarEventosInputsClientes(nomeCliente);
    adicionarEventosInputsClientes(emailCliente);
    adicionarEventosInputsClientes(telefoneCliente);
    adicionarEventosInputsClientes(cpfCliente);
    formEditarClientes.addEventListener('submit', editarClientes);
  }

  if (formEditarVenda) {
    aplicarEstilos(btnMaisItens, 'display', 'none');
    iterarInputsParaAdicionarEventos();
    formEditarVenda.addEventListener('submit', editarVenda);
  }
 
  alterarDisplayElementos();
  preencherCampos(cliente, idVenda);
  btnVoltarHeader.addEventListener('click', restaurarDisplayElementos);
  iconeBtnVoltarHeader.addEventListener('click', restaurarDisplayElementosMobile);
}

export { manipularElementosPagEditar, editarClientes, editarDadosBD, aplicarEstilosPagEditar }