import obterElementosDOM from "../../utils/obterElementosDOM.js";
import { ApiService } from "../../api/apiService.js";
import { aplicarEstilosPagEditar } from "../../utils/aplicarEstilos.js";
import { alterarDisplayElementos, restaurarDisplayElementos, restaurarDisplayElementosMobile } from "../../utils/aplicarEstilos.js";
import { listarClientes } from "../clienteServices/listarCliente.js";
import { iterarInputsParaAdicionarEventos } from "../vendaServices/adicionarVenda.js";
import { exibirValorVenda } from "./adicionarVenda.js";
import { autenticarDadosVendas } from "../../utils/autenticarDados.js";
import { resetarPaginas } from "../../utils/resetarPaginas.js";
import { manipularPopup } from "../../utils/popup.js";
import { removerItemVenda } from "../../utils/removerItemVenda.js";
import { adicionarMaisItens } from "../../utils/adicionarMaisItensVenda.js";

const usuario = JSON.parse(localStorage.getItem('usuario'));
let idVendaResponse = ''

async function atualizarVenda(idVenda) {
  const { btnVoltarHeader, iconeBtnVoltarHeader, btnMaisItens,
    formEditarVenda, boxMaisItens } = obterElementosDOM();
  
  boxMaisItens.forEach(item => item.innerHTML = "")

  if (formEditarVenda) {
    idVendaResponse = idVenda
    btnMaisItens.addEventListener('click', adicionarMaisItens);
    iterarInputsParaAdicionarEventos();
    formEditarVenda.addEventListener('submit', verificarAutenticacaoFormAtualizarVenda);
  }
  
  preencherCampos(idVenda);
  alterarDisplayElementos();
  btnVoltarHeader.addEventListener('click', restaurarDisplayElementos);
  iconeBtnVoltarHeader.addEventListener('click', restaurarDisplayElementosMobile);
}

async function verificarAutenticacaoFormAtualizarVenda(event) {
  event.preventDefault();
  const { 
    descricoesItens, 
    precosUnitario, 
    quantidadesItens} = obterElementosDOM();
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
    const dataFaturamentoVenda = new Date(dataFaturamento.value.split('/').reverse().join('/')).toISOString();
    const idClienteSelecionado = selectCliente.options[selectCliente.selectedIndex].dataset.cliente;
    const quantidadeTotalItens = descricoesItens.length;
    
    let descricaoItem = [];
    let precoUnitarioFormatado = [];
    let quantidadeItem = [];
    
    for (let indice = 0; indice < descricoesItens.length; indice++) {
      descricaoItem.push(descricoesItens[indice].value);
      precoUnitarioFormatado.push(parseFloat(precosUnitario[indice].value.replace(/[^0-9]+/g,'')) / 100);
      quantidadeItem.push(quantidadesItens[indice].value);
    }
    
    if (quantidadesItens.length == 0) {
      const { conteudoPopupEditarVenda } = obterElementosDOM();
      conteudoPopupEditarVenda.innerHTML = 'Não foi possível atualizar venda.';
      manipularPopup('popup-editar-registro', 'finalizar-edicao');
      return
    }
    
    atualizarVendaResponse(idClienteSelecionado, descricaoItem, precoUnitarioFormatado, quantidadeItem, dataFaturamentoVenda, quantidadeTotalItens)
  }
}

async function atualizarVendaResponse(idClienteSelecionado, descricaoItemVenda, precoUnitarioFormatado, quantidadeItem, dataFaturamentoVenda, quantidadeTotalItens) {
  const { conteudoPopupEditarVenda } = obterElementosDOM();

  const bodyAtualizarVenda = {
    id: idVendaResponse,
    clienteId: idClienteSelecionado,
    dataFaturamento: dataFaturamentoVenda,
    itens: []
  }

  for (let indice = 0; indice < quantidadeTotalItens; indice++) {
    bodyAtualizarVenda.itens.push(
      {
        descricaoItem: descricaoItemVenda[indice],
        quantidade: quantidadeItem[indice],
        precoUnitario: precoUnitarioFormatado[indice]
      }
    )
  }
  
  const respostaApi = await ApiService.put('Venda/atualizar', bodyAtualizarVenda, usuario.token);
  const notificacoes = respostaApi.notificacoes;
 
  if (respostaApi.sucesso) {
    conteudoPopupEditarVenda.innerHTML = respostaApi.dados.mensagem;
    manipularPopup('popup-editar-registro', 'finalizar-edicao');
    aplicarEstilosPagEditar();
    return
  }

  notificacoes.forEach(notificacao => conteudoPopupEditarVenda.innerHTML = notificacao.message);
}

async function preencherCampos(idVenda) {
  const { tabelaVendas } = obterElementosDOM();
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (tabelaVendas) {
    const { boxItensPedido, selectCliente } = obterElementosDOM();
    const respostaApi = await ApiService.get(`Venda/obter/${idVenda}`, usuario.token);
    const listaCliente = await listarClientes();

    resetarPaginas(boxItensPedido);
    resetarPaginas(selectCliente);

    for (let indice = 0; indice < respostaApi.dados.itens.length; indice++) {
      boxItensPedido.innerHTML += `
          <div class="box-itens-do-pedido" data-js="box-itens-do-pedido">
            <button type="button" class="icone-deletar-item" data-js="icone-deletar-item">
                <img src="assets/img/icone-deletar-item.png" alt="icone-deletar-item" />
            </button>
            <div class="box-form-conjunto-input conjunto-input">
              <label for="descricaoItem">
                Descrição do item
                <input type="text" id="descricaoItem" name="descricaoItem" data-js="descricao-item" required value="${respostaApi.dados.itens[indice].descricaoItem}">
                <span class="mensagem-input-valido" data-js="mensagem-descricao-invalida">Descrição deve conter pelo menos sete caracteres.</span>
              </label>
              <label for="precoUnitario">
                Valor unitário
                <input type="text" id="precoUnitario" name="precoUnitario"data-js="preco-unitario" required value="${respostaApi.dados.itens[indice].precoUnitario.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}">
                <span class="mensagem-input-valido" data-js="mensagem-valor-invalido">Valor inválido.</span>
              </label>
            </div>
            <div class="box-form-conjunto-input conjunto-input">
              <label for="quantidadeItem">
                Quantidade
                <input type="number" id="quantidadeItem" name="quantidadeItem" data-js="quantidade-item" required value="${respostaApi.dados.itens[indice].quantidade}">
                <span class="mensagem-input-valido" data-js="mensagem-quantidade-invalida">Escolha uma quantidade.</span>
              </label>
              <label for="valorTotal">
                Valor total
                <input type="text" id="valorTotal" name="valorTotal" data-js="soma-valores" disabled value="${respostaApi.dados.valorTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}">
              </label>
            </div>
          </div>
        </div>
      `
      
      const { btnDeletarItem } = obterElementosDOM();
      btnDeletarItem.forEach(item => item.addEventListener('click', removerItemVenda));
      iterarInputsParaAdicionarEventos();
    }
    
    listaCliente.forEach(cliente => {
      selectCliente.innerHTML += `
          <option data-cliente="${cliente.id}">${cliente.nome}</option>
        `
    });
    
    Array.from(selectCliente.options).forEach(option => {
      if (option.dataset.cliente == respostaApi.dados.clienteId) {
        option.selected = true
      }
    })

    dataFaturamento.value = new Intl.DateTimeFormat('pt-br').format(Date.parse(respostaApi.dados.dataFaturamento));
    exibirValorVenda();
  }
}

export { atualizarVenda }