import axios from 'axios';

class CrudRestClient {
  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async get(resource, id = null) {
    const url = id ? `${resource}/${id}` : resource;
    const response = await this.client.get(url);
    return response.data;
  }

  async post(resource, data) {
    const response = await this.client.post(resource, data);
    return response.data;
  }

  async put(resource, id, data) {
    const url = `${resource}/${id}`;
    const response = await this.client.put(url, data);
    return response.data;
  }

  async delete(resource, id) {
    const url = `${resource}/${id}`;
    const response = await this.client.delete(url);
    return response.data;
  }
}

export default CrudRestClient;