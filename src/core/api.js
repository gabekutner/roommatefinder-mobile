import axios from 'axios';


export const ADDRESS = '172.31.123.129:8000'

export default api = axios.create({
  baseURL: 'http://' + ADDRESS + '/',
  headers: {
    'Content-type': 'application/json'
  }
})