async function addItemLocalStorage(bancoLocalStorage) {
  const lista = await buscarItensBD(); 

  bancoLocalStorage.length == 0 
    ? localStorage.setItem('clientes', JSON.stringify(lista)) 
    : localStorage.setItem('clientes', JSON.stringify(bancoLocalStorage));
}

async function buscarItensBD() {
  const resposta = await fetch('../json/clientes.json');
  
  return await resposta.json();
}

export default addItemLocalStorage;