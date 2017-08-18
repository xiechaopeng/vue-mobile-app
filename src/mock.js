const Mock = require('mockjs')
Mock.mock('/catgory/getNode',{
  status:200,
  data:{
    test:'test'
  }
})
