function obterElementosDOM() {
  const tituloForm = document.querySelector('[data-js="titulo-form"]');
  const tituloHeader = document.querySelector('[data-js="titulo-header"]');
  const btnSalvar = document.querySelector('[data-js="box-form-btn-salvar"]');
  const btnVoltarHeader = document.querySelector('[data-js="btn-voltar"]');
  const btnAdicionarHeader = document.querySelector('[data-js="btn-adicionar"]');
  const iconeBtnEditarHeader = document.querySelector('[data-js="icone-btn-editar"]');
  const iconeBtnDeletarHeader = document.querySelector('[data-js="icone-btn-deletar"]');
  const menuLateral = document.querySelector('[data-js="menu-lateral"]');
  const conteudoPrincipal = document.querySelector('[data-js="conteudo-principal"]');
  const headerTelasComMenu = document.querySelector('[data-js="header-telas-com-menu"]');
  const headerTelasSemMenu = document.querySelector('[data-js="header-telas-sem-menu"]');
  const corpoTabelaClientes = document.querySelector('[data-js="corpo-tabela-itens-lista"]');
  const corpoTabelaVendas = document.querySelector('[data-js="corpo-tabela-itens-lista-vendas"]');
  const tabelaClientes = document.querySelector('[data-js="tabela-clientes"]');
  const tabelaVendas = document.querySelector('[data-js="tabela-vendas"]');
  const tituloPag = document.querySelector('[data-js="titulo-pag"]');
  const headerClientesVendas = document.querySelector('[data-js="conteudo-principal-clientes-header"]');
  const iconeBtnVoltarHeader = document.querySelector('[data-js="icone-btn-voltar"]');
  const formEditarClientes = document.querySelector('[data-js="form-editar-clientes"]');
  const formEditarVenda = document.querySelector('[data-js="form-editar-venda"]');
  const inputBuscar = document.querySelector('[data-js="input-buscar"]');
  const mensagemNomeInvalido = document.querySelector('[data-js="mensagem-nome-invalido"]');
  const mensagemEmailInvalido = document.querySelector('[data-js="mensagem-email-invalido"]');
  const mensagemTelefoneInvalido = document.querySelector('[data-js="mensagem-telefone-invalido"]');
  const mensagemCpfInvalido = document.querySelector('[data-js="mensagem-cpf-invalido"]');
  const mensagemDataInvalida = document.querySelector('[data-js="mensagem-data-invalida"]');
  const mensagemDescricaoInvalida = document.querySelector('[data-js="mensagem-descricao-invalida"]');
  const mensagemQuantidadeInvalida = document.querySelector('[data-js="mensagem-quantidade-invalida"]');
  const mensagemPrecoInvalida = document.querySelector('[data-js="mensagem-valor-invalido"]');
  const mensagemEmailUsuarioInvalido = document.querySelector('[data-js="mensagem-email-usuario-invalido"]');
  const selectCliente = document.querySelector('[data-js="select-cliente"]');
  const formAddCliente = document.querySelector('[data-js="form-add-cliente"]');
  const formAddVenda = document.querySelector('[data-js="form-add-venda"]');
  const formLogin = document.querySelector('[data-js="form-login"]');
  const saidaValorTotal = document.querySelector('[data-js="valor-total"]');
  const boxItensPedido = document.querySelector('[data-js="box-itens-do-pedido"]');
  const boxBtnMaisItens = document.querySelector('[data-js="box-btn-mais-itens"]');
  const btnMaisItens = document.querySelector('[data-js="btn-mais-itens"]');
  const boxMaisItens = document.querySelectorAll('[data-js="box-mais-itens"]');
  const conteudoPrincipalLogado = document.querySelector('[data-js="conteudo-principal-logado"]');
  const conteudoPrincipalLogout = document.querySelector('[data-js="conteudo-principal-logout"]');
  const btnSair = document.querySelector('[data-js="btn-sair"]');
  const iconeBtnSair = document.querySelector('[data-js="btn-sair-mobile"]');
  const conteudoPopupCliente = document.querySelector('[data-js="conteudo-popup-adicionar-cliente"]');
  const conteudoPopupEditarCliente = document.querySelector('[data-js="conteudo-popup-editar-clientes"]');
  const conteudoPopupVenda = document.querySelector('[data-js="conteudo-popup-adicionar-cliente"]');
  const conteudoPopupEditarVenda = document.querySelector('[data-js="conteudo-popup-editar-venda"]');
  const linkFecharPopupCliente = document.querySelectorAll('[data-js="link-fechar-popup-adicionar-cliente"]');
  const alertaInaticarCliente = document.querySelector('[data-js="conteudo-alerta-deletar"]');
  const nomeUsuario = document.querySelector('[data-js="nome-usuario"]');
  const descricoesItens = document.querySelectorAll('[data-js="descricao-item"]');
  const precosUnitario = document.querySelectorAll('[data-js="preco-unitario"]');
  const quantidadesItens = document.querySelectorAll('[data-js="quantidade-item"]');
  const valoresTotais = document.querySelectorAll('[data-js="soma-valores"]');
  const popupDeletar = document.querySelector('[data-js="popup-apagar-registro"]');
  const fomrAddUsuario = document.querySelector('[data-js="form-add-usuario"]');
  const btnCriarConta = document.querySelector('[data-js="button-criar-conta"]');
  const btnCancelarCriarConta = document.querySelector('[data-js="box-form-btn-cancelar"]');
  const boxFormCriarUsuario = document.querySelector('[data-js="box-form-criar-usuario"]');
  const conteudoPopupCriarUsuario = document.querySelector('[data-js="conteudo-popup-criar-usuario"]');
  const linkFecharPopupCriarUsuario = document.querySelectorAll('[data-js="link-fechar-popup-criar-usuario"]');
  const mensagemNomeCriarUsuarioInvalido = document.querySelector('[data-js="mensagem-nome-criar-usuario-invalido"]');
  const mensagemEmailCriarUsuarioInvalido = document.querySelector('[data-js="mensagem-email-criar-usuario-invalido"]');
  const mensagemSenhaCriarUsuarioInvalida = document.querySelector('[data-js="mensagem-senha-criar-usuario-invalido"]');
  const mensagemConfirmarSenhaUsuarioInvalida = document.querySelector('[data-js="mensagem-confirmar-senha-invalido"]');
  const btnDeletarItem = document.querySelectorAll('[data-js="icone-deletar-item"]');
  
  return { 
    tituloForm, tituloHeader, btnSalvar, iconeBtnEditarHeader,
    menuLateral, conteudoPrincipal, headerTelasComMenu, headerTelasSemMenu,
    corpoTabelaClientes, corpoTabelaVendas, popupDeletar, btnVoltarHeader, btnAdicionarHeader, tituloPag,
    iconeBtnVoltarHeader, tabelaClientes, tabelaVendas, formEditarClientes, formLogin,
    headerClientesVendas, inputBuscar, mensagemNomeInvalido, mensagemEmailInvalido,
    mensagemTelefoneInvalido, mensagemCpfInvalido, mensagemDataInvalida, mensagemDescricaoInvalida,
    mensagemQuantidadeInvalida, mensagemPrecoInvalida, iconeBtnDeletarHeader, selectCliente,
    formAddCliente, formAddVenda, saidaValorTotal, boxBtnMaisItens, btnMaisItens,
    descricoesItens, precosUnitario, quantidadesItens, valoresTotais, boxMaisItens, formEditarVenda, boxItensPedido,
    conteudoPrincipalLogado, conteudoPrincipalLogout, mensagemEmailUsuarioInvalido, btnSair, conteudoPopupCliente,
    linkFecharPopupCliente, alertaInaticarCliente, conteudoPopupEditarCliente, conteudoPopupVenda, conteudoPopupEditarVenda,
    iconeBtnSair, nomeUsuario, fomrAddUsuario, btnCriarConta, boxFormCriarUsuario, btnCancelarCriarConta, conteudoPopupCriarUsuario,
    linkFecharPopupCriarUsuario, mensagemNomeCriarUsuarioInvalido, mensagemEmailCriarUsuarioInvalido, mensagemSenhaCriarUsuarioInvalida, 
    mensagemConfirmarSenhaUsuarioInvalida, btnDeletarItem
  };
}

export default obterElementosDOM;