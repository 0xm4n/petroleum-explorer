import axios from 'axios'

const http = axios.create({
  baseURL: 'http://35.238.228.84:3000/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

export default http
