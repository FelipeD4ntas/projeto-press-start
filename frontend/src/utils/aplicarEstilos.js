import obterElementosDOM from './obterElementosDOM.js';
import alterarEstadosLeituraInputs from './alterarEstadoLeituraInputs.js';
import alterarTextoConteudo from './alterarTextoConteudo.js';

const {
  conteudoPrincipal, iconeBtnEditarHeader,
  menuLateral, headerTelasComMenu,
  headerTelasSemMenu, tituloHeader,
  iconeBtnDeletarHeader, btnAdicionarHeader, btnVoltarHeader
} = obterElementosDOM();

function aplicarEstilos(elemento, tipoDoEstilo, estilo) {
  switch (tipoDoEstilo) {
    case 'display':
      elemento.style.display = estilo;
      break
    case 'marginBottom':
      elemento.style.marginBottom = estilo;
      break
    case 'margin':
      elemento.style.margin = estilo;
      break
    case 'opacity':
      elemento.style.opacity = estilo;
      break
  }
}

function enviarEstilos(
  displayMenuLateral, displayHeaderComMenu, displayHeaderSemMenu,
  displayIconeEditar, displayIconeDeletar, marginContPrincipal) {
  aplicarEstilos(menuLateral, 'display', displayMenuLateral);
  aplicarEstilos(headerTelasComMenu, 'display', displayHeaderComMenu);
  aplicarEstilos(headerTelasSemMenu, 'display', displayHeaderSemMenu);
  aplicarEstilos(iconeBtnEditarHeader, 'display', displayIconeEditar);
  aplicarEstilos(iconeBtnDeletarHeader, 'display', displayIconeDeletar);
  aplicarEstilos(conteudoPrincipal, 'marginBottom', marginContPrincipal);
}

function aplicarEstiloNeutroInputs(telaEmFoco) {
  const {
    mensagemNomeInvalido, mensagemEmailInvalido,
    mensagemTelefoneInvalido, mensagemCpfInvalido,
    mensagemDataInvalida, mensagemDescricaoInvalida, 
    mensagemQuantidadeInvalida, mensagemPrecoInvalida,
    mensagemEmailUsuarioInvalido, mensagemNomeCriarUsuarioInvalido, 
    mensagemEmailCriarUsuarioInvalido, mensagemSenhaCriarUsuarioInvalida, 
    mensagemConfirmarSenhaUsuarioInvalida
  } = obterElementosDOM();

  switch (telaEmFoco) {
    case 'telaAddClientes':
    case 'clientes':
      nomeCliente.setAttribute('class', 'input-neutro');
      emailCliente.setAttribute('class', 'input-neutro');
      telefoneCliente.setAttribute('class', 'input-neutro');
      cpfCliente.setAttribute('class', 'input-neutro');
      mensagemNomeInvalido.setAttribute('class', 'mensagem-input-valido');
      mensagemEmailInvalido.setAttribute('class', 'mensagem-input-valido');
      mensagemTelefoneInvalido.setAttribute('class', 'mensagem-input-valido');
      mensagemCpfInvalido.setAttribute('class', 'mensagem-input-valido');
      break;
    case 'telaAddVendas':
    case 'vendas':
      const { descricoesItens, precosUnitario, quantidadesItens, valoresTotais } = obterElementosDOM();
      for (let indice = 0; indice < quantidadesItens.length; indice++) {
        descricoesItens[indice].setAttribute('class', 'input-neutro');
        precosUnitario[indice].setAttribute('class', 'input-neutro');
        quantidadesItens[indice].setAttribute('class', 'input-neutro');
        valoresTotais[indice].setAttribute('class', 'input-neutro');
      }
      dataFaturamento.setAttribute('class', 'input-neutro');
      mensagemDataInvalida.setAttribute('class', 'mensagem-input-valido');
      mensagemDescricaoInvalida.setAttribute('class', 'mensagem-input-valido');
      mensagemQuantidadeInvalida.setAttribute('class', 'mensagem-input-valido');
      mensagemPrecoInvalida.setAttribute('class', 'mensagem-input-valido');
      break;
    case 'telaLogin':
      mensagemEmailUsuarioInvalido.setAttribute('class', 'mensagem-input-valido');
      break
    case 'telaAddUsuario':
      nomeCriarUsuario.setAttribute('class', 'input-neutro');
      emailCriarUsuario.setAttribute('class', 'input-neutro');
      senhaCriarUsuario.setAttribute('class', 'input-neutro');
      confirmarSenhaUsuario.setAttribute('class', 'input-neutro');
      mensagemNomeCriarUsuarioInvalido.setAttribute('class', 'mensagem-input-valido');
      mensagemEmailCriarUsuarioInvalido.setAttribute('class', 'mensagem-input-valido');
      mensagemSenhaCriarUsuarioInvalida.setAttribute('class', 'mensagem-input-valido');
      mensagemConfirmarSenhaUsuarioInvalida.setAttribute('class', 'mensagem-input-valido');
      break;
  }
}

function aplicarEstiloValidoInvalidoInputs(itemPassouNaRegra, inputSelecionado, input) {
  if (inputSelecionado == input) {
    itemPassouNaRegra
      ? input.setAttribute('class', 'input-valido')
      : input.setAttribute('class', 'input-invalido');

    itemPassouNaRegra
      ? inputSelecionado.nextElementSibling.setAttribute('class', 'mensagem-input-valido')
      : inputSelecionado.nextElementSibling.setAttribute('class', 'mensagem-input-invalido');
  }
}

function aplicarEstilosTabela() {
  const { tabelaClientes, tabelaVendas } = obterElementosDOM();
  const tabelaRenderizada = tabelaClientes ? tabelaClientes : tabelaVendas;

  if (tabelaRenderizada) {
    const tabelaOculta = getComputedStyle(tabelaRenderizada).display == 'none';

    if (tabelaOculta) {
      enviarEstilos('none', 'none', 'flex', 'block', 'none', '25px');
      if (tituloHeader.textContent === 'Editar') {
        aplicarEstilos(iconeBtnEditarHeader, 'display', 'none');
        aplicarEstilos(iconeBtnDeletarHeader, 'display', 'block');
      }
    }
  }
}

function restaurarEstilosTabela() {
  const { tabelaClientes, tabelaVendas, headerClientesVendas,
    btnSalvar, formEditarClientes, formEditarVenda
  } = obterElementosDOM();
  const telaMobile = window.matchMedia("(max-width: 600px)");
  const entrouNoMobile = telaMobile.matches;

  if (tabelaClientes) {
    aplicarEstilos(tabelaClientes, 'display', 'flex');
    aplicarEstilos(formEditarClientes, 'display', 'none');
  }

  if (tabelaVendas) {
    aplicarEstilos(tabelaVendas, 'display', 'flex');
    aplicarEstilos(formEditarVenda, 'display', 'none');
  }

  aplicarEstilos(headerClientesVendas, 'display', 'flex');
  aplicarEstilos(menuLateral, 'display', 'grid');
  aplicarEstilos(headerTelasComMenu, 'display', 'flex');
  aplicarEstilos(headerTelasSemMenu, 'display', 'none');
  aplicarEstilos(btnSalvar, 'display', 'none');
  aplicarEstilos(iconeBtnEditarHeader, 'display', 'none');
  aplicarEstilos(iconeBtnDeletarHeader, 'display', 'none');
  aplicarEstilos(btnAdicionarHeader, 'display', 'block');
  aplicarEstilos(btnVoltarHeader, 'display', 'none');

  if (entrouNoMobile) {
    aplicarEstilos(conteudoPrincipal, 'marginBottom', '100px');
  } else {
    aplicarEstilos(conteudoPrincipal, 'marginBottom', '25px');
  }
}

function aplicarNovosEstilos(paginaTemMenu) {
  if (paginaTemMenu) {
    enviarEstilos('grid', 'flex', 'none', 'none', 'none', '100px');
    aplicarEstilosTabela();
  } else {
    enviarEstilos('none', 'none', 'flex', 'none', 'none', '25px');
  }
}

function restaurarEstilos() {
  enviarEstilos('grid', 'flex', 'none', 'none', 'none', '25px');
  aplicarEstilosTabela();
}

function aplicarEstilosPagEditar() {
  const { 
    iconeBtnEditarHeader, iconeBtnDeletarHeader, 
    btnSalvar, tituloHeader, tituloForm, 
    descricoesItens, precosUnitario, quantidadesItens, 
    tabelaClientes, tabelaVendas } = obterElementosDOM();
  
  if (tabelaClientes) {
    alterarEstadosLeituraInputs(nomeCliente, false);
    alterarEstadosLeituraInputs(emailCliente, false);
    alterarEstadosLeituraInputs(telefoneCliente, false);
    alterarEstadosLeituraInputs(cpfCliente, false);
    alterarTextoConteudo(tituloForm, 'Editar cliente');
    aplicarEstiloNeutroInputs('telaClientes');
  }

  if (tabelaVendas) {
    descricoesItens.forEach(descricao => alterarEstadosLeituraInputs(descricao, false));
    precosUnitario.forEach(preco => alterarEstadosLeituraInputs(preco, false));
    quantidadesItens.forEach(quantidadeItem => alterarEstadosLeituraInputs(quantidadeItem, false));
    alterarEstadosLeituraInputs(dataFaturamento, false);
    alterarTextoConteudo(tituloForm, 'Editar venda');
    aplicarEstiloNeutroInputs('telaVendas');
  }
  
  aplicarEstilos(btnSalvar, 'display', 'flex');
  aplicarEstilos(iconeBtnDeletarHeader, 'display', 'block');
  aplicarEstilos(iconeBtnEditarHeader, 'display', 'none');
  alterarTextoConteudo(tituloHeader, 'Editar');
}

function setarDisplayElementos(
  displayheaderClientesVendas, displaytabelaClientes,
  displayformEditarClientes, displaybtnVoltar, displaybtnAdicionar) {
  
  const { tabelaClientes, headerClientesVendas, formEditarClientes } = obterElementosDOM();

  aplicarEstilos(tabelaClientes, 'display', displaytabelaClientes);
  aplicarEstilos(formEditarClientes, 'display', displayformEditarClientes);
 
  aplicarEstilos(headerClientesVendas, 'display', displayheaderClientesVendas);
  aplicarEstilos(btnVoltarHeader, 'display', displaybtnVoltar);
  aplicarEstilos(btnAdicionarHeader, 'display', displaybtnAdicionar);
}

function setarDisplayElementosVenda(
  displayheaderClientesVendas, displaytabelaVendas,
  displayformEditarVendas, displaybtnVoltar, displaybtnAdicionar) {
  const { tabelaVendas, formEditarVenda, headerClientesVendas } = obterElementosDOM();

  aplicarEstilos(tabelaVendas, 'display', displaytabelaVendas);
  aplicarEstilos(formEditarVenda, 'display', displayformEditarVendas);

  aplicarEstilos(headerClientesVendas, 'display', displayheaderClientesVendas);
  aplicarEstilos(btnVoltarHeader, 'display', displaybtnVoltar);
  aplicarEstilos(btnAdicionarHeader, 'display', displaybtnAdicionar);
}

function restaurarDisplayElementosMobile() {
  const { menuLateral, conteudoPrincipal, 
    headerTelasComMenu, headerTelasSemMenu, 
    tabelaClientes, headerClientesVendas, formEditarClientes 
  } = obterElementosDOM();
  const telaMobile = window.matchMedia("(max-width: 600px)");
  const entrouNoMobile = telaMobile.matches;

  if (tabelaClientes) {
    aplicarEstilos(tabelaClientes, 'display', 'flex'); 
    aplicarEstilos(formEditarClientes, 'display', 'none');
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
  const { tabelaVendas, tabelaClientes } = obterElementosDOM();

  if (tabelaClientes) {
    setarDisplayElementos('flex', 'flex', 'none', 'none', 'block');
  }
  
  if (tabelaVendas) {
    setarDisplayElementosVenda('flex', 'flex', 'none', 'none', 'block')
  } 
}

function alterarDisplayElementos() {
  const { tabelaVendas, tabelaClientes } = obterElementosDOM();
  
  if (tabelaClientes) {
    setarDisplayElementos('none', 'none', 'block', 'block', 'none');
  }
  
  if (tabelaVendas) {
    setarDisplayElementosVenda('none', 'none', 'block', 'block', 'none')
  } 
}

export {
  aplicarEstilos, aplicarNovosEstilos, restaurarEstilos,
  aplicarEstilosTabela, aplicarEstiloNeutroInputs,
  aplicarEstiloValidoInvalidoInputs, restaurarEstilosTabela,
  aplicarEstilosPagEditar, alterarDisplayElementos, restaurarDisplayElementos,
  restaurarDisplayElementosMobile
};