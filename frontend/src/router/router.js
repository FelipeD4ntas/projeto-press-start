import { createRouter, createWebHistory } from "vue-router";
import Dashboard from '@/pages/dashboard/Dashboard';
import ListaClientes from '@/pages/clientes/Clientes';
import FormularioClientes from '@/components/FormularioClientes';
import Vendas from '@/pages/vendas/Vendas';
import FormularioVendas from '@/components/FormularioVendas';
import Login from '@/pages/login/Login';
import ApiService from "@/common/api/api.service";
import { servicesUsuario } from '@/common/services/usuarioServices/servicesUsuario';

const routeInfos = [
  {
    path: '/',
    component: Dashboard,
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/clientes',
    component: ListaClientes,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cliente/adicionar',
    component: FormularioClientes,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cliente/editar/:id',
    component: FormularioClientes,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/vendas',
    component: Vendas,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/venda/adicionar',
    component: FormularioVendas,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/venda/editar/:id',
    component: FormularioVendas,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path : '/:catchAll(.*)',
     redirect : '/'           
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routeInfos
})

router.beforeEach(async (to) => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const token = usuario ? usuario.token : '';
  
  if (to.meta.requiresAuth && token == '') {
    return '/login'
  } 

  ApiService.getToken(token);
  
  const response = await servicesUsuario.validarToken('Usuario/validar-token');
  const rotaAtual = to.fullPath;

  if (response.status == 200 && rotaAtual == '/login') {
    return '/'
  }
})

export default router;