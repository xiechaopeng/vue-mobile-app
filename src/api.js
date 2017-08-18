import axios from 'axios'

const api = axios.create({
  baseURL: 'http://119.23.174.214',
  timeout: 2000,
  headers: {
    'Content-Type':'application/json'
  }
})
api.interceptors.response.use(response => {
  if (response.data.status === 200) {
    return response.data
  }else {
    alert('数据获取失败')
  }
}, error => {
  return Promise.reject(error)
})

export default {
  //获取首页商品所有分类
  getIndexCatgory(parentId) {
    return api.post('/catgory/getNode', {parentId:parentId})
  },
  getIndexActive(){
    return api.get('/catgory/getNode')
  }
}
