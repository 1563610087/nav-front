import axios from 'axios'
// const service = axios.create({
//   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
//   // withCredentials: true, // send cookies when cross-domain requests
//   timeout: 5000 // request timeout
// })

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '' : 'https://service-ij349dpk-1258823847.gz.apigw.tencentcs.com/release/'

axios.interceptors.response.use(function(res) {
  if (res.status === 200) {
    return res.data
  }
}, function(error) {
  return Promise.reject(error)
})

export const allSites = (data) => axios.post('/data/allSites', data)
export const addClass = (data) => axios.post('/data/addClass', data)
export const delClass = (data) => axios.post('/data/delClass', data)
export const updateClass = (data) => axios.post('/data/updateClass', data)
export const addWeb = (data) => axios.post('/data/addWeb', data)
export const delWeb = (data) => axios.post('/data/delWeb', data)
export const updateWeb = (data) => axios.post('/data/updateWeb', data)
export const addSite = (data) => axios.post('/data/addSite', data)
export const delSite = (data) => axios.post('/data/delSite', data)
export const updateSite = (data) => axios.post('/data/updateSite', data)
