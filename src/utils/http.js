import axios from 'axios'

const http = axios.create({
  baseURL: 'http://35.238.247.40:3000/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

export default http

