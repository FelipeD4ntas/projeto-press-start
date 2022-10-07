import obterElementosDOM from './obterElementosDOM.js';

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
    mensagemQuantidadeInvalida, mensagemPrecoInvalida
  } = obterElementosDOM();

  switch (telaEmFoco) {
    case 'telaClientes':
      nomeCliente.setAttribute('class', 'input-neutro');
      emailCliente.setAttribute('class', 'input-neutro');
      telefoneCliente.setAttribute('class', 'input-neutro');
      cpfCliente.setAttribute('class', 'input-neutro');
      mensagemNomeInvalido.setAttribute('class', 'mensagem-input-valido');
      mensagemEmailInvalido.setAttribute('class', 'mensagem-input-valido');
      mensagemTelefoneInvalido.setAttribute('class', 'mensagem-input-valido');
      mensagemCpfInvalido.setAttribute('class', 'mensagem-input-valido');
      break
    case 'telaVendas':
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
      break
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

export {
  aplicarEstilos, aplicarNovosEstilos, restaurarEstilos,
  aplicarEstilosTabela, aplicarEstiloNeutroInputs,
  aplicarEstiloValidoInvalidoInputs, restaurarEstilosTabela
};