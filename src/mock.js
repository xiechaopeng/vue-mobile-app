const Mock = require('mockjs')
Mock.mock('http://119.23.174.214/index/recommend',{
  status:200,
  data:{
    activity:[{
      //1:图片类型 作图片展示(如海报,专题,活动策划等) 表示这个activity是图片,返回值中包含图片url
      type: 1,
      title: '火爆活动',
      imgUrl: 'http://www.z4a.net/images/2017/08/19/xlx.jpg',
      desc:'啤酒加龙虾 夏天不回家!'
    }, {
      //0:列表类型 做列表展示(如新品上市列表,打折列表,热门商品列表) 表示这个activity是列表,返回值中包含list
      type: 0,
      title: '新鲜速递',
      list: [{
        title: '新鲜牛百叶',
        desc:'新鲜的食材了',
        price:6,
        id:"1",
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503083223611&di=cf164f158516c5b86a570778b29905e1&imgtype=0&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140306%2F20140306143236-911538519.jpg'
      }, {
        title: '鲜摘莴笋尖',
        desc:'新鲜的食材了',
        price:2,
        id:"2",
        imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503083893339&di=569ffb72adb2122a14d279a96fcb016d&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2017-2%2F201702231521486256925.png'
      },{
        title: '精品西红柿',
        desc:'新鲜的食材了',
        price:3,
        id:"3",
        imgUrl:'http://imgqn.koudaitong.com/upload_files/2015/07/03/Fvnoudy4QZV2mhPO454d3I8-QC8y.jpg!730x0.jpg'
      }, {
        title: '上品黑猪肉',
        desc:'新鲜的食材了',
        price:11,
        id:"4",
        imgUrl:'http://www.sdhmnm.com/upfiles/file/201509/20150902175118362.jpg'
      }]
    }, {
      //0:列表类型 做列表展示(如新品上市列表,打折列表,热门商品列表) 表示这个activity是列表,返回值中包含list
      type: 0,
      title: '水果超市',
      list: [{
        title: '品质车厘子',
        desc:'水果特卖了',
        price:25,
        id:"5",
        imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503085449769&di=a86094bff77cf3758f8b37fe239e2a1b&imgtype=0&src=http%3A%2F%2Fwww.baicaolu.com%2Farticle%2Fwp-content%2Fuploads%2F2017%2F06%2F201701231627087273024.png'
      }, {
        title: '特甜大西瓜',
        desc:'水果特卖了',
        price:7,
        id:"6",
        imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503085539518&di=b4a19d3d40957e944ea5781d6843fbaa&imgtype=0&src=http%3A%2F%2Fimgqn.koudaitong.com%2Fupload_files%2F2015%2F06%2F25%2FFtafseWWLAJaFNBhF3YoDnOMrawe.jpg%2521730x0.jpg'
      },{
        title: '香甜水蜜桃',
        desc:'水果特卖了',
        price:5,
        id:"7",
        imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503085805993&di=c7540907d439eb5cfa04e0f29dd96529&imgtype=0&src=http%3A%2F%2Fimgqn.koudaitong.com%2Fupload_files%2F2015%2F07%2F31%2FFh8Q5xhVLUD7StXIey3o4k3Z5nu9.jpg%2521730x0.jpg'
      }, {
        title: '脆爽青苹果',
        desc:'水果特卖了',
        price:4.5,
        id:"14",
        imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503086047141&di=34ca7f13e40342d739c0a0d6e20bf467&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D176922221%2C2913422568%26fm%3D214%26gp%3D0.jpg'
      }]
    }]
  }
})
// Mock.mock('http://119.23.174.214/wx/product/getProductByProductId',{
//   status:200,
//   data:{
//     title:'重庆荣昌营养猪肉',
//     unit:'500g',
//     price:12,
//     sales:34975,
//     desc:'荣获全国营养猪肉奖的明星猪肉品牌 找回回锅肉的味道',
//     imgUrl:'http://www.z4a.net/images/2017/08/19/zhurou.jpg'
//   }
// })
// Mock.mock('http://119.23.174.214/wx/product/getProductReviewsByProductId',{
//   status:200,
//   data:[{
//     createTime:'2017-8-19 20:10',
//     user:{
//       name:'梨涡浅笑',
//       coverUrl:'http://www.z4a.net/images/2017/08/19/mulai.jpg'
//     },
//     rate:5,
//     content:'荣获全国营养猪肉奖的明星猪肉品牌 找回回锅肉的味道,荣获全国营养猪肉奖的明星猪肉品牌 找回回锅肉的味道'
//   },{
//     createTime:'2017-8-19 19:32',
//     user:{
//       name:'似把君邀',
//       coverUrl:'http://www.z4a.net/images/2017/08/19/mulai.jpg'
//     },
//     rate:4,
//     content:'荣获全国营养猪肉奖的明星猪肉品牌 找回回锅肉的味道,荣获全国营养猪肉奖的明星猪肉品牌 找回回锅肉的味道'
//   }]
// })
// Mock.mock('/catgory/getNode',{
//   status:200,
//   data:{
//     test:'test'
//   }
// })
// Mock.mock('http://119.23.174.214/user/readById',{
//   status:200,
//   data:[]
// })
