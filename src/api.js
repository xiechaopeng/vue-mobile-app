import axios from 'axios'

const api = axios.create({
  baseURL: 'http://119.23.174.214',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(function(config) {
  if(localStorage.getItem('token')) {
    // config.headers.Authorization = `user-token ${localStorage.getItem('token')}`
    // .replace(/(^\")|(\"$)/g, '')
    config.headers['user-token'] = localStorage.getItem('token')
	}
  return config
}, function(error) {
  return Promise.reject(error);
});
api.interceptors.response.use(response => {
  if (response.data.status === 200) {
    console.log('请求成功了!!!!');
    return response.data
  } else {
    alert(response.data.msg||'数据获取失败')
  }
}, error => {
  return Promise.reject(error)
})

export default {
  //获取首页数据
  getIndexData() {
    return api.post('/wx/product/getHomePage')
  },
  //获取首页推荐商品
  getIndexActivity() {
    return api.get('/index/recommend')
  },
  //获取所有分类
  getCatgory(parentId) {
    return api.post('/wx/catgory/getNode', {
      parentId: parentId
    })
  },
  //获取二级分类下的商品
  getGoodsByClassId(id) {
    return api.post('/wx/product/getProductsByCategoryId/'+id)
  },
  //获取商品简介
  getGoodsById(id) {
    return api.post('/wx/product/getProductById', {
      id: id
    })
  },
  //获取商品详情
  getGoodsDetailById(id) {
    return api.post('/wx/product/getProductDescriptionByProductId', {
      productId: id
    })
  },
  //获取商品评论内容
  getGoodsReview(data) {
    return api.post('/wx/product/getProductReviewsByProductId/' + data.id, data)
  },
  //获取用户信息
  getUserInfo(id) {
    return api.post('/user/readById', {
      id: id
    })
  },
  checkUsername(phone){
    return api.post('/wx/member/examineUsername',{ "username":phone })
  },
  getCode(phone){
    return api.post('/wx/member/getIdentifyingCode',{ "username":phone })
  },
  login(data){
    return api.post('wx/user/login',data)
  },
  reg(data){
    return api.post('/wx/user/register',data)
  },
  getUserInfo(){
    return api.post('/wx/user/getUser')
  },
  getUserAddress(){
    return api.post('/wx/address/selectAddressByUserId')
  },
  addAddress(data){
    return api.post('/wx/address/save',data)
  }
}
