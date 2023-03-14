import ApiService from "@/common/api/api.service";

const servicesCliente = {
  async obter(URL) {
    try {
      let response = await ApiService.get(URL)
   
      return response.data;
    } catch(e) {
      return e.response.data;
    }
  },

  async listar(URL) {
    try {
      let response = await ApiService.get(URL)
   
      return response.data;
    } catch(e) {
      return e.response.data;
    }
  },

  async adicionar(URL, params) {
    try {
      let response = await ApiService.post(URL, params)
   
      return response.data;
    } catch(e) {
      return e.response.data;
    }
  },

  async deletar(URL, id) {
    try {
      let response = await ApiService.delete(URL, id)
   
      return response.data;
    } catch(e) {
      return e.response.data.notificacoes;
    }
  },

  async atualizar(URL, id) {
    try {
      let response = await ApiService.put(URL, id)
   
      return response.data;
    } catch(e) {
      return e.response.data;
    }
  },
}

export { servicesCliente }