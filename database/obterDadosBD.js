export default () => {
  const listaItens = JSON.parse(localStorage.getItem('clientes')) ?? [];
  return listaItens;
}
