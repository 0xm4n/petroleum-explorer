import axios from 'axios'

const http = axios.create({
  baseURL: 'http://127.0.0.1:3000/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

export default http

