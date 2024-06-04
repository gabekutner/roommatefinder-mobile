import axios from 'axios';


export const ADDRESS = '10.18.245.166:8000'

export default api = axios.create({
  baseURL: 'http://' + ADDRESS + '/',
  headers: {
    'Content-type': 'application/json'
  }
})