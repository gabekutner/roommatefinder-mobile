import axios from 'axios';


export const ADDRESS = '192.168.31.150:8000'

export default api = axios.create({
  baseURL: 'http://' + ADDRESS + '/',
  headers: {
    'Content-type': 'application/json'
  }
})