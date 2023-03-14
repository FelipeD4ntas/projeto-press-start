import { createApp } from 'vue';
import { API_URL }  from '@/common/config/config';
import axios from 'axios';
import VueAxios from 'vue-axios';

const app = createApp();

app.use(VueAxios, axios);

const ApiService = {
  token: '',

  getToken(token) {
    this.token = token
  },

  init() {
    app.axios.defaults.baseURL = API_URL;
    app.axios.defaults.headers = { Authorization: `Bearer ${this.token}` };
  },

  get(resource) {
    this.init();
    return app.axios.get(`${resource}`)
  },

  post(resource, params) {
    this.init();
    return app.axios.post(`${resource}`, params)
  },

  delete(resource, id) {
    this.init();
    return app.axios.delete(`${resource}?id=${id}`)
  },

  put(resource, params) {
    this.init();
    return app.axios.put(`${resource}`, params)
  }
}

export default ApiService;