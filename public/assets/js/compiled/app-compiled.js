var application=angular.module("application",["ui.router","templatePartials"],["$interpolateProvider",function(t){t.startSymbol("{!"),t.endSymbol("!}")}]);application=angular.module("application").factory("ApiService",["$http","$q","RESOURCES","$rootScope","$state",function(e,a,i,t,r){var o={menuData:null,getXhrMenuData:function(){if(null===this.menuData)return e.get(i.ROOT+"/api/menuler.json");var t=a.defer();return t.resolve(this.menuData),t.promise},setXhrMenuData:function(t){if(null===this.menuData){var e=t.data.d;return this.menuData=e}return this.menuDat}};return o}]),application=angular.module("application").factory("NotifyService",["$http","$q","RESOURCES","$rootScope","$state","$timeout",function(t,e,a,i,r,o){return{queue:[],timerContainer:[],timing:4e3,_index:0,add:function(t){var e=this,a={id:e._index,message:t,promise:null};e.queue.push(a),e._index++,i.$broadcast("notify:message"),e.timeOutNotifications(a)},remove:function(t){var e=findWithAttr(this.queue,"id",t);this.queue.splice(e,1)},removeByTimeOut:function(){var a=this;angular.forEach(a.timerContainer,function(t,e){a.remove(t.message_id),o.cancel(t.promise),a.timerContainer.splice(e,1)})},timeOutNotifications:function(t){var e=this,a={message_id:t.id,promise:o(function(){console.log("timeout çalıştı!"),e.removeByTimeOut()},e.timing)};e.timerContainer.push(a)}}}]),application=angular.module("application").factory("SepetService",["$rootScope","$http","$q","RESOURCES","NotifyService",function(r,t,e,a,o){return{items:[],total:null,add:function(t){var e={Description:t.Description,DisplayName:t.DisplayName,ExtendedPrice:t.ExtendedPrice.replace(",","."),IsTakeAwayOnly:t.IsTakeAwayOnly,ListPrice:t.ListPrice,ProductGroup:t.ProductGroup,ProductId:t.ProductId,Miktar:parseInt(t.Miktar)},a=this;if(0===a.items.length)a.items.push(e),o.add(e.Miktar+" Adet "+e.DisplayName+" Eklendi");else{var i=findWithAttr(a.items,"ProductId",e.ProductId);-1===i?a.items.push(e):a.items[i].Miktar+=e.Miktar,o.add(e.Miktar+" Adet "+e.DisplayName+" Eklendi")}a.calculateTotal(e.ProductId)},remove:function(t){var e=this;if(0!==e.items.length){var a=findWithAttr(e.items,"ProductId",t);-1!==a&&(o.add(e.items[a].DisplayName+" isimli yemek silindi."),e.items.splice(a,1))}e.calculateTotalforAll()},updateMiktar:function(t,e){var a=this;if(e=parseInt(e),0!==a.items.length){var i=findWithAttr(a.items,"ProductId",t);-1!==i&&(0===e?(o.add(a.items[i].DisplayName+" isimli yemek silindi."),a.items.splice(i,1),r.urunCount=a.items.length):(a.items[i].Miktar=e,a.calculateTotal(t),o.add(a.items[i].DisplayName+" isimli yemeğin adeti "+a.items[i].Miktar+" olarak güncellendi.")))}},calculateTotal:function(t){var e=this;if(0!==e.items.length){var a=findWithAttr(e.items,"ProductId",t);-1!==a&&(e.items[a].Total=(parseFloat(e.items[a].ListPrice.replace(",","."))*e.items[a].Miktar).toFixed(2).replace(".",","))}e.calculateTotalforAll()},calculateTotalforAll:function(){var t=this;if(0!==t.items.length){var a=0;angular.forEach(t.items,function(t,e){a=parseFloat(a)+parseFloat(t.Total.replace(",","."))}),t.total=a.toFixed(2).replace(".",",")}r.urunCount=t.items.length},all:function(){return{urunler:this.items,total:this.total}}}}]);angular.module("application").config(["$httpProvider","$stateProvider","$urlRouterProvider","$locationProvider","$urlMatcherFactoryProvider","RESOURCES",function(t,e,a,i,r,o){t.useApplyAsync([!0]),t.interceptors.push(["$q","$rootScope","$injector","$timeout",function(e,a,t,i){return{responseError:function(t){return 401===t.status&&(a.hata404=!0),e.reject(t)}}}]),r.strictMode(!1),i.html5Mode(!0),e.state("root",{url:"/",abstract:!0,template:"<ui-view/>"}).state("/",{url:"",templateUrl:"tpl-arama/kategori.sec.html",controller:"AramaController@KategoriSec"}).state("root.kategori",{url:"kategori",abstract:!0,template:"<ui-view/>"}).state("root.kategori.go",{url:"/:categoryname",templateUrl:"tpl-arama/kategori.arama.html",controller:"AramaController@KategoriArama"}).state("root.sepet",{url:"sepet",abstract:!0,template:"<ui-view/>"}).state("root.sepet.init",{url:"",templateUrl:"tpl-sepet/index.html",controller:"SepetController@Sepet"})}]).run(["$rootScope","$location","$window",function(t,e,a){t.$on("$stateChangeSuccess",function(t){}),t.back=function(){a.history.back()}}]);application=angular.module("application").controller("AramaController@KategoriSec",["$scope","$state","$rootScope","ApiService","$stateParams","$filter",function(e,a,t,i,r,o){e.searchFilter="",i.getXhrMenuData().then(function(t){i.setXhrMenuData(t),e.kategoriler=i.menuData},function(t){}),e.kategoriSec=function(t){if(null!==i.menuData){var e=findWithAttr(i.menuData.ResultSet,"Oid",t);-1!==e&&a.go("root.kategori.go",{categoryname:i.menuData.ResultSet[e].CategoryName})}}}]).controller("AramaController@KategoriArama",["$scope","$rootScope","ApiService","$stateParams","$filter",function(a,t,i,r,e){if(null===i.menuData){i.getXhrMenuData().then(function(t){i.setXhrMenuData(t);var e=findWithAttr(i.menuData.ResultSet,"CategoryName",r.categoryname);a.kategori=i.menuData.ResultSet[e]},function(t){})}else{var o=findWithAttr(i.menuData.ResultSet,"CategoryName",r.categoryname);a.kategori=i.menuData.ResultSet[o]}}]),application=angular.module("application").controller("SepetController@Sepet",["$scope","$rootScope","ApiService","$stateParams","$filter","SepetService",function(e,t,a,i,r,o){e.urunler=o.all().urunler,e.total=o.all().total,e.updateMiktar=function(t){o.updateMiktar(t.ProductId,t.Miktar),e.total=o.all().total},e.removeProduct=function(t){o.remove(t.ProductId),e.total=o.all().total}}]),application=angular.module("application").controller("masterController",["$scope","$location","$timeout","$window","$rootScope","$filter","$state","ApiService","SepetService","NotifyService",function(t,e,a,i,r,o,n,l,u,c){r.urunCount=0,r.bildirimler=c.queue,t.$on("notify:message",function(t){r.bildirimler=c.queue}),t.notifyRemove=function(t){c.remove(t.id)},t.addProduct=function(t){u.add(t)}}]);