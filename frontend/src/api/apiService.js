import { API_URL } from '../config/config.js'

export const ApiService = {
  async validarToken(resource, token) {
    try {
      const response = await fetch((`${API_URL}/${resource}`), {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response;
    } catch (error) {
      return console.log(error);
    }
  },

  async criarUsuario(resource, info) {
    try {
      const response = await fetch((`${API_URL}/${resource}`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info)
      })
      return response.json();
    } catch (error) {
      return console.log(error);
    }
  },

  async login(resource, info) {
    try {
      const response = await fetch((`${API_URL}/${resource}`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info)
      })
      return response.json();
    } catch (error) {
      return console.log(error);
    }
  },

  async get(resource, token) {
    try {
      const response = await fetch((`${API_URL}/${resource}`), {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.json();
    } catch (error) {
      return console.log(error);
    }
  },

  async post(resource, info, token) {
    try {
      const response = await fetch((`${API_URL}/${resource}`), {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(info)
      })
      return response.json();
    } catch(error) {
      return console.log(error);
    }
  },

  async put(resource, info, token) {
    try {
      const response = await fetch((`${API_URL}/${resource}`), {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(info)
      })
      return response.json();
    } catch(error) {
      return console.log(error)
    }
  },

  async delete(resource, id, token) {
    try {
      const response = await fetch((`${API_URL}/${resource}?id=${id}`), {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}` 
        }
      })
      return response.json();
    } catch(error) {
      return console.log(error);
    }
  },
}

