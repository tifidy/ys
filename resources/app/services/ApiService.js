var application = angular.module("application")
.factory("ApiService", function($http,$q,RESOURCES, $rootScope, $state)
{

	//dışarıya açık
	var ApiObject = {};
	/**
	 * Kategoriler > Menü isimlerinin yazıldığı object'tir.
	 */
	ApiObject.menuData=null;

	/**
	 * Kategorilerin xhr ile çekilip cachelendiği kısımdır
	 */
	ApiObject.getXhrMenuData = function() 
	{
		if(this.menuData===null)
		{
			return  $http.get(RESOURCES.ROOT+"/api/menuler.json");	
		}
		else
		{
			//veriyi promise objesi olarak beklediğimiz için,
			//data önceden yüklenmiş olsa dahi
			//promise objesi olarak return edilmelidir
			var deferred = $q.defer();
			deferred.resolve(this.menuData);
			return deferred.promise;
		}
		return this;
	}
	/**
	 * @param {object}
	 * Veri Xhr ile çekildiğinde burdan ApiObject.menuData'ya atanır ve sonraki modifikasyonlar bu propertyde yapılır.
	 */
	ApiObject.setXhrMenuData = function(menuData) 
	{
		if(this.menuData===null)
		{
			var d = menuData.data.d;
			return this.menuData=d;
		}
		return this.menuDat;
	}

	return ApiObject;
})