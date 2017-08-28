webpackJsonp([6],{129:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(78),o=i.n(n),a=i(79),s=i.n(a);e.default={name:"app",components:{bottomNav:o.a,shoppingCartSheet:s.a}}},130:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{fixed:{type:Boolean,default:!1},activeColor:{type:String,default:"#ff5252"}},data:function(){return{bottomNavIndex:0,bottomNav:[{span:"首页",icon:"loyalty",path:"/index"},{span:"分类",icon:"format_list_bulleted",path:"/classify"},{span:"菜篮",icon:"shopping_basket",path:"/shoppingCart"},{span:"我的",icon:"face",path:"/face"}]}},computed:{activePath:function(){return this.$route.matched[0]?this.$route.matched[0].path:"/"},shoppingCartList:function(){return this.$store.state.shoppingCartList}},methods:{bottomNavChange:function(t){this.bottomNavIndex=t,this.$router.push(this.bottomNav[t].path)}}}},131:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{goodsId:{type:String,default:"c4ca4238a0b923820dcc509a6f75849b"},width:{type:String,default:"100%"},height:{type:String,default:"200px"},subTitle:{type:String,default:""},hidTitle:{type:Boolean,default:!1},data:{type:Object,default:function(){return{}}}},methods:{clickImg:function(){this.$emit("clickImg",this.data)},clickShop:function(){this.$emit("clickShop",this.data),this.$store.commit("openShoppingCart",this.data)}}}},132:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{size:{type:Number||String,default:50},bgColor:{type:String,default:"#1B9AF7"},shadowColor:{type:String,default:"#0880d7"},preset:{type:Number,default:-1}},computed:{style:function(){for(var t=[],e=0;e<Number(this.size)/2;e++)t.push(e+"px "+e+"px "+this.shadowColor);return{overflow:"hidden",height:this.size+"px",width:this.size+"px",textShadow:t.join(","),backgroundColor:this.bgColor}},presetColor:function(){return""}}}},133:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{bottomSheet:!1,count:0,topPopup:!1,popupText:""}},computed:{goodsData:function(){var t=this.$store.state.shoppingCartSheetItem;return this.bottomSheet=this.$store.state.shoppingCartSheetOpen,t}},methods:{closeBottomSheet:function(){this.count=0,this.$store.commit("closeShoppingCart")},countAdd:function(){this.count++},countDel:function(){this.count>0&&this.count--},intoShoppingCart:function(){var t=this;if(this.count<1)this.topPopup=!0,this.popupText="购买数量不能为0",setTimeout(function(){t.topPopup=!1},2e3);else{var e=this.goodsData;e.count=this.count,e.check=!0,this.$store.commit("pushShoppingCartList",e),this.closeBottomSheet()}}}}},134:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{marginTop:{type:String,default:"0px"},marginBottom:{type:String,default:"0px"}},methods:{scrollTopChange:function(t){this.$emit("scrollTopChange",t)}},directives:{scroll:function(t,e,i){t.addEventListener("scroll",function(t){i.context.scrollTopChange(t.target.scrollTop)})}}}},135:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(7),o=i(44),a=i.n(o),s=i(53),c=i(54),r=i(48),p=i.n(r),u=i(49),l=(i.n(u),i(50)),d=(i.n(l),i(47)),h=i.n(d),f=i(46),m=i.n(f),g=i(45),v=i.n(g),_=i.i(c.a)();n.default.use(p.a),n.default.component("scrollContiner",h.a),n.default.component("longShadowBtn",m.a),n.default.component("goodsCard",v.a),n.default.prototype.api=i(51).default,i(52),n.default.config.productionTip=!1,new n.default({el:"#app",store:_,router:s.a,template:"<App/>",components:{App:a.a}})},136:function(t,e,i){"use strict";e.a={FETCH_LIST_DATA:function(t,e){var i=t.commit,n=t.dispatch,o=(t.state,e.type);return i("SET_ACTIVE_TYPE",{type:o}),fetchIdsByType(o).then(function(t){return i("SET_LIST",{type:o,ids:t})}).then(function(){return n("ENSURE_ACTIVE_ITEMS")})}}},137:function(t,e,i){"use strict";e.a={activeIds:function(t){},activeItems:function(t,e){}}},138:function(t,e,i){"use strict";i(7);e.a={openShoppingCart:function(t,e){t.shoppingCartSheetItem=e,t.shoppingCartSheetOpen=!0},closeShoppingCart:function(t){t.shoppingCartSheetOpen=!1},pushShoppingCartList:function(t,e){var i=!0;t.shoppingCartList.forEach(function(t){t.id==e.id&&(t.count=t.count+e.count,i=!1)}),i&&t.shoppingCartList.push(e)},popShoppingCartList:function(t,e){t.shoppingCartList.splice(e,1)},shoppingCartListCheck:function(t,e){var i=e.index,n=e.flag,o=t.shoppingCartList[i];o.check=n,t.shoppingCartList.splice(i,1,o)},shoppingCartListAllCheck:function(t,e){t.shoppingCartList.forEach(function(i,n){var o=i;i.check=e,t.shoppingCartList.splice(n,1,o)})},shoppingCartListChangeCount:function(t,e){var i=e.index,n=e.count,o=t.shoppingCartList[i];o.count=n,t.shoppingCartList.splice(i,1,o)}}},44:function(t,e,i){function n(t){i(90)}var o=i(3)(i(129),i(84),n,null,null);t.exports=o.exports},45:function(t,e,i){function n(t){i(91)}var o=i(3)(i(131),i(85),n,"data-v-e75e68a8",null);t.exports=o.exports},46:function(t,e,i){function n(t){i(87)}var o=i(3)(i(132),i(81),n,null,null);t.exports=o.exports},47:function(t,e,i){function n(t){i(86)}var o=i(3)(i(134),i(80),n,"data-v-15fce232",null);t.exports=o.exports},49:function(t,e){},50:function(t,e){},51:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(56),o=i.n(n),a=i(58),s=i.n(a),c=s.a.create({baseURL:"http://119.23.174.214",timeout:2e3,headers:{"Content-Type":"application/json"}});c.interceptors.response.use(function(t){if(200===t.data.status)return t.data;alert("数据获取失败")},function(t){return o.a.reject(t)}),e.default={getIndexActivity:function(){return c.get("/index/recommend")},getCatgory:function(t){return c.post("/catgory/getNode",{parentId:t})},getGoodsById:function(t){return c.post("/wx/product/getProductById",{id:t})},getGoodsDetailById:function(t){return c.post("/wx/product/getProductDescriptionByProductId",{productId:t})},getGoodsReview:function(t){return c.post("/wx/product/getProductReviewsByProductId",{productId:t})}}},52:function(t,e,i){var n=i(76);n.mock("http://119.23.174.214/index/recommend",{status:200,data:{activity:[{type:1,title:"火爆活动",imgUrl:"http://www.z4a.net/images/2017/08/19/xlx.jpg",desc:"啤酒加龙虾 夏天不回家!"},{type:0,title:"新鲜速递",list:[{title:"新鲜牛百叶",desc:"新鲜的食材了",price:6,id:"1",imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503083223611&di=cf164f158516c5b86a570778b29905e1&imgtype=0&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140306%2F20140306143236-911538519.jpg"},{title:"鲜摘莴笋尖",desc:"新鲜的食材了",price:2,id:"2",imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503083893339&di=569ffb72adb2122a14d279a96fcb016d&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2017-2%2F201702231521486256925.png"},{title:"精品西红柿",desc:"新鲜的食材了",price:3,id:"3",imgUrl:"http://imgqn.koudaitong.com/upload_files/2015/07/03/Fvnoudy4QZV2mhPO454d3I8-QC8y.jpg!730x0.jpg"},{title:"上品黑猪肉",desc:"新鲜的食材了",price:11,id:"4",imgUrl:"http://www.sdhmnm.com/upfiles/file/201509/20150902175118362.jpg"}]},{type:0,title:"水果超市",list:[{title:"品质车厘子",desc:"水果特卖了",price:25,id:"5",imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503085449769&di=a86094bff77cf3758f8b37fe239e2a1b&imgtype=0&src=http%3A%2F%2Fwww.baicaolu.com%2Farticle%2Fwp-content%2Fuploads%2F2017%2F06%2F201701231627087273024.png"},{title:"特甜大西瓜",desc:"水果特卖了",price:7,id:"6",imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503085539518&di=b4a19d3d40957e944ea5781d6843fbaa&imgtype=0&src=http%3A%2F%2Fimgqn.koudaitong.com%2Fupload_files%2F2015%2F06%2F25%2FFtafseWWLAJaFNBhF3YoDnOMrawe.jpg%2521730x0.jpg"},{title:"香甜水蜜桃",desc:"水果特卖了",price:5,id:"7",imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503085805993&di=c7540907d439eb5cfa04e0f29dd96529&imgtype=0&src=http%3A%2F%2Fimgqn.koudaitong.com%2Fupload_files%2F2015%2F07%2F31%2FFh8Q5xhVLUD7StXIey3o4k3Z5nu9.jpg%2521730x0.jpg"},{title:"脆爽青苹果",desc:"水果特卖了",price:4.5,id:"14",imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503086047141&di=34ca7f13e40342d739c0a0d6e20bf467&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D176922221%2C2913422568%26fm%3D214%26gp%3D0.jpg"}]}]}}),n.mock("http://119.23.174.214/wx/product/getProductByProductId",{status:200,data:{title:"重庆荣昌营养猪肉",unit:"500g",price:12,sales:34975,desc:"荣获全国营养猪肉奖的明星猪肉品牌 找回回锅肉的味道",imgUrl:"http://www.z4a.net/images/2017/08/19/zhurou.jpg"}}),n.mock("http://119.23.174.214/wx/product/getProductReviewsByProductId",{status:200,data:[{createTime:"2017-8-19 20:10",user:{name:"梨涡浅笑",coverUrl:"http://www.z4a.net/images/2017/08/19/mulai.jpg"},rate:5,content:"荣获全国营养猪肉奖的明星猪肉品牌 找回回锅肉的味道,荣获全国营养猪肉奖的明星猪肉品牌 找回回锅肉的味道"},{createTime:"2017-8-19 19:32",user:{name:"似把君邀",coverUrl:"http://www.z4a.net/images/2017/08/19/mulai.jpg"},rate:4,content:"荣获全国营养猪肉奖的明星猪肉品牌 找回回锅肉的味道,荣获全国营养猪肉奖的明星猪肉品牌 找回回锅肉的味道"}]}),n.mock("/catgory/getNode",{status:200,data:{test:"test"}})},53:function(t,e,i){"use strict";var n=i(7),o=i(127);n.default.use(o.a),e.a=new o.a({routes:[{path:"/",redirect:"/index"},{path:"/index",name:"index",component:function(t){return i.e(1).then(function(){var e=[i(144)];t.apply(null,e)}.bind(this)).catch(i.oe)}},{path:"/classify",name:"classify",component:function(t){return i.e(3).then(function(){var e=[i(141)];t.apply(null,e)}.bind(this)).catch(i.oe)}},{path:"/shoppingCart",name:"shoppingCart",component:function(t){return i.e(2).then(function(){var e=[i(145)];t.apply(null,e)}.bind(this)).catch(i.oe)}},{path:"/face",name:"face",component:function(t){return i.e(4).then(function(){var e=[i(143)];t.apply(null,e)}.bind(this)).catch(i.oe)}},{path:"/detail/:id",name:"detail",component:function(t){return i.e(0).then(function(){var e=[i(142)];t.apply(null,e)}.bind(this)).catch(i.oe)}}]})},54:function(t,e,i){"use strict";function n(){return new a.a.Store({state:{shoppingCartSheetOpen:!1,shoppingCartSheetItem:{},shoppingCartList:[]},actions:s.a,mutations:c.a,getters:r.a})}e.a=n;var o=i(7),a=i(92),s=i(136),c=i(138),r=i(137);o.default.use(a.a)},78:function(t,e,i){function n(t){i(89)}var o=i(3)(i(130),i(83),n,null,null);t.exports=o.exports},79:function(t,e,i){function n(t){i(88)}var o=i(3)(i(133),i(82),n,null,null);t.exports=o.exports},80:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"g-sc",style:{height:"calc(100vh - "+t.marginTop+" - "+t.marginBottom+")"}},[i("div",{directives:[{name:"scroll",rawName:"v-scroll"}],staticClass:"sc"},[t._t("default")],2)])},staticRenderFns:[]}},81:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("mu-float-button",{style:t.style},[t._t("default")],2)},staticRenderFns:[]}},82:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("mu-bottom-sheet",{attrs:{open:t.bottomSheet},on:{close:t.closeBottomSheet}},[i("div",{staticClass:"shopping-cat"},[i("div",{staticStyle:{"text-align":"center"}},[i("div",{staticStyle:{"font-size":"1rem"}},[t._v("购买商品")]),t._v(" "),i("div",{staticStyle:{color:"#ccc","font-size":".8rem","font-weight":"300"}},[t._v("shopping")]),t._v(" "),i("mu-divider")],1),t._v(" "),i("div",{staticClass:"main"},[i("mu-paper",{staticClass:"img",style:{"background-image":"url("+t.goodsData.imgUrl+")"},attrs:{zDepth:2}}),t._v(" "),i("div",{staticClass:"content"},[i("div",{staticClass:"header"},[t._v("\n          "+t._s(t.goodsData.title)+"\n        ")]),t._v(" "),i("div",{staticClass:"price"},[t._v("\n          ¥"+t._s(t.goodsData.price)+"\n        ")]),t._v(" "),i("div",{staticClass:"stock"},[t._v("\n          库存："+t._s(t.goodsData.stock||0)+"\n        ")]),t._v(" "),i("div",{staticClass:"count"},[i("span",[t._v("\n            数量：\n          ")]),t._v(" "),i("i",{staticClass:"material-icons icon",on:{click:t.countDel}},[t._v("remove_circle")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.count,expression:"count"}],attrs:{type:"text"},domProps:{value:t.count},on:{input:function(e){e.target.composing||(t.count=e.target.value)}}}),t._v(" "),i("i",{staticClass:"material-icons icon",on:{click:t.countAdd}},[t._v("add_circle")])])])],1),t._v(" "),i("mu-raised-button",{attrs:{secondary:"",label:t.count*t.goodsData.price>0?"甩进菜篮（ "+t.count*t.goodsData.price+"元 ）":"甩进菜篮",fullWidth:""},nativeOn:{click:function(e){t.intoShoppingCart(e)}}})],1),t._v(" "),i("mu-popup",{attrs:{position:"top",popupClass:"topPopup",overlay:!1,open:t.topPopup}},[t._v("\n    "+t._s(t.popupText)+"\n  ")])],1)},staticRenderFns:[]}},83:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("mu-paper",{class:{"bottom-nav":t.fixed},attrs:{zDepth:1}},[i("mu-bottom-nav",{on:{change:t.bottomNavChange}},t._l(t.bottomNav,function(e,n){return 2!=n?i("mu-bottom-nav-item",{key:n,staticClass:"bottom-item",style:{color:e.path==t.activePath?t.activeColor:""},attrs:{value:n,title:e.span,icon:e.icon}}):i("mu-bottom-nav-item",{key:n,staticClass:"bottom-item",style:{color:e.path==t.activePath?t.activeColor:""},attrs:{value:n,title:e.span,icon:e.icon}},[t.shoppingCartList.length>0?i("div",{staticStyle:{position:"absolute",right:"10%",top:"1%"}},[i("mu-badge",{attrs:{content:""+t.shoppingCartList.length,badgeClass:"badgeClass",circle:"",secondary:""}})],1):t._e()])}))],1)},staticRenderFns:[]}},84:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("transition",{attrs:{name:"fade",mode:"out-in"}},[i("router-view")],1),t._v(" "),i("bottom-nav",{attrs:{fixed:""}}),t._v(" "),i("shopping-cart-sheet")],1)},staticRenderFns:[]}},85:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"goos-card",style:{width:t.width}},[i("div",{staticClass:"main",style:{height:t.height,"background-image":"url("+t.data.imgUrl+")"},on:{click:t.clickImg}},[t._t("subTitle",[t.subTitle?i("div",{staticClass:"sub-title"},[i("span",[t._v(t._s(t.subTitle))])]):t._e()])],2),t._v(" "),t._t("title",[t.data.title&&!t.hidTitle?i("div",{staticClass:"title"},[t.data.price?i("span",{staticClass:"price"},[t._v("¥"+t._s(t.data.price))]):t._e(),t._v(" "),i("span",{staticClass:"tetx"},[t._v("\n        "+t._s(t.data.title)+"\n      ")]),t._v(" "),t.data.price?i("i",{staticClass:"material-icons add",on:{click:t.clickShop}},[t._v("add_shopping_cart")]):t._e()]):t._e()])],2)},staticRenderFns:[]}},86:function(t,e){},87:function(t,e){},88:function(t,e){},89:function(t,e){},90:function(t,e){},91:function(t,e){}},[135]);
//# sourceMappingURL=app.8a7f4c5925fbe0493269.js.map