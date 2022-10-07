import { listarElementosTabela } from '../services/listarElementosTabela.js';
import obterDadosBD from './obterDadosBD.js';
import addItemLocalStorage from './adicionarDadosBD.js';
import verificarTabelaAtual from '../utils/verificarAcao.js';

function manipularDadosBD() {
  let bancoLocalStorage = obterDadosBD();

  bancoLocalStorage.forEach(listarElementosTabela);
  addItemLocalStorage(bancoLocalStorage);
  verificarTabelaAtual();
}

export default manipularDadosBD;