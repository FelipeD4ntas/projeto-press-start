import ApiService from "@/common/api/api.service";

const servicesUsuario = {
  async criarUsuario(URL, params) {
    try {
      let response = await ApiService.post(URL, params)
   
      return response.data;
    } catch(e) {
      return e.response.data;
    }
  },

  async login(URL, params) {
    try {
      let response = await ApiService.post(URL, params)
   
      return response.data;
    } catch(e) {
      return e.response.data;
    }
  },

  async validarToken(URL) {
    try {
      let response = await ApiService.get(URL);
      const estadoResponse = {
        status: response ? response.status : 401
      }
      return estadoResponse;
    } catch(e) {
      const estadoResponse = {
        status: e.response ? e.response.status : 401
      }
      return estadoResponse;
    }
  }
}

export { servicesUsuario }