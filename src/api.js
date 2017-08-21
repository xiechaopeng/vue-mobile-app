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
  //获取首页推荐商品
  getIndexActivity(){
    return api.get('/index/recommend')
  },
  //获取所有分类
  getCatgory(parentId) {
    return api.post('/catgory/getNode', {parentId:parentId})
  },
  //获取商品简介
  getGoodsById(id){
    return api.post('/wx/product/getProductById',{id:id})
  },
  //获取商品详情
  getGoodsDetailById(id){
    return api.post('/wx/product/getProductDescriptionByProductId',{productId:id})
  },
  //获取商品评论内容
  getGoodsReview(id){
    return api.post('/wx/product/getProductReviewsByProductId',{productId:id})
  }
}
