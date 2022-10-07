import dashboard from '../pages/dashboard/dashboard.js';
import clientes from '../pages/clientes/clientes.js';
import vendas from '../pages/vendas/vendas.js';
import telaAddClientes from '../pages/clientes/telaAddClientes.js';
import telaAddVendas from '../pages/vendas/telaAddVendas.js';

async function rotas(){
  const hashPaginaAtual = window.location.hash;

  switch (hashPaginaAtual) {
    case '#dashboard':
      return { dashboard: await dashboard() }
      break
    case '#clientes':
      return { clientes:  await clientes() }
      break
    case '#vendas':
      return { vendas: await vendas() }
      break
    case '#telaAddClientes':
      return { telaAddClientes: await telaAddClientes() }
      break
    case '#telaAddVendas':
      return { telaAddVendas: await telaAddVendas() }
      break
    default:
      return { dashboard: await dashboard() }
      break
  }
}

export default rotas;