import axios from 'axios'

const api = axios.create({
  baseURL: 'http://119.23.174.214',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(function(config) {
  if (window.localStorage) {
    if(localStorage.token) {
      config.headers['user-token'] = localStorage.token
  	}
  }
  return config
}, function(error) {
  return Promise.reject(error);
});
api.interceptors.response.use(response => {
  if (response.data.status === 200) {
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
  //获取收藏商品列表
  getCollections(){
    return api.post('/wx/collection/getCollections')
  },
  //是否已经收藏
  goods_isCollection(id){
    return api.post('/wx/collection/isCollection',{id:id})
  },
  //收藏商品
  goods_collection(id){
    return api.post('/wx/collection/addCollection',{id:id})
  },
  //取消收藏
  goods_delCollections(data){
    return api.post('/wx/collection/delCollections',data)
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
  logout(){
    return api.post('/wx/user/logout')
  },
  forgot(data){
    return api.post('/wx/user/forgot',data)
  },
  getUserInfo(){
    return api.post('/wx/user/getUser')
  },
  getUserAddress(){
    return api.post('/wx/address/selectAddressByUserId')
  },
  addAddress(data){
    return api.post('/wx/address/save',data)
  },
  getOrderlist(status){
    return api.post('/wx/order/getUserOrdersByStatus',{status:status})
  },
  order(data){
    return api.post('/wx/order/saveOrderInfo',data)
  },
  cancelOrder(id){
    return api.post('/wx/order/cancel',{id:id})
  },
  getArea(){
    return api.post('/wx/district/getArea')
  },
  getStreetByArea(area){
    return api.post('/wx/district/getStreetByArea',{area:area})
  },
  //修改地址信息
  updateAddress(data){
    return api.post('/wx/address/updateAddressById',data)
  },
  //删除地址
  deleteAddress(id){
    return api.post('/wx/address/delteAddressById',{id:id})
  },
  //搜索
  search(str){
    return api.post('/wx/search/query',{
      parameter:str
    })
  },
  //获取经常购买商品
  getOften(){
    return api.post('/wx/user/getOftenPurchased')
  },
  //获取特价商品
  getDiscount(){
    return api.post('/wx/product/getDiscountProduct',{
      currentPage:1,
      pageSize:20
    })
  },
  //获取openid
  getOpenid(code){
    return api.post('/wx/user/obtainOpenId',{
      code:code
    })
  },
  getOrderlistCount(){
    return api.post('/wx/order/getUserOrdersNum')
  }
}
