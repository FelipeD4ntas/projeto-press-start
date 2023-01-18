import { ApiService } from "../api/apiService.js";

async function validarToken(usuario) {
  const respostaApi = await ApiService.validarToken('Usuario/validar-token', usuario ? usuario.token : usuario);
  
  const response = {
    status: respostaApi ? respostaApi.status : 401
  }

  return response;
}

export { validarToken }