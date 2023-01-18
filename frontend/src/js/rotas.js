import dashboard from '../pages/dashboard/dashboard.js';
import clientes from '../pages/clientes/clientes.js';
import vendas from '../pages/vendas/vendas.js';
import telaAddClientes from '../pages/clientes/telaAddClientes.js';
import telaAddVendas from '../pages/vendas/telaAddVendas.js';

export default {
  dashboard: dashboard(),
  clientes: clientes(),
  vendas: vendas(),
  telaAddClientes: telaAddClientes(),
  telaAddVendas: telaAddVendas(),
}