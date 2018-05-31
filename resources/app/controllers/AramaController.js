var application = angular.module("application")
//AramaController@KategoriSec metodu
//Bu methodta kullanıcı arama yapacağı kategoriyi seçiyor
.controller('AramaController@KategoriSec', ['$scope', '$state', '$rootScope', 'ApiService', '$stateParams', '$filter', function($scope, $state, $rootScope, ApiService, $stateParams, $filter) 
{

	//burada Xhr yapılır ve menü listesi getirilir.
	$scope.searchFilter = "";
	var promise = ApiService.getXhrMenuData();
	promise.then(function(data)
	{
		ApiService.setXhrMenuData(data);
		$scope.kategoriler = ApiService.menuData;
	},function(err)
	{

	});
	//Arama ekranında Kategori tıklandığında kategori sayfasına gider
	$scope.kategoriSec = function(Oid)
	{
		
		if(ApiService.menuData !==null)
		{
			var index = findWithAttr(ApiService.menuData.ResultSet, "Oid", Oid);
			if(index !==-1)
			{
				$state.go('root.kategori.go', {categoryname:ApiService.menuData.ResultSet[index].CategoryName});
			}
		}
	}

}])
//AramaController@KategoriSec metodu
//Bu methodta kullanıcı seçim yaptığı kategoride arama yapıyor
.controller('AramaController@KategoriArama', ['$scope', '$rootScope', 'ApiService', '$stateParams', '$filter', function($scope, $rootScope, ApiService, $stateParams, $filter) 
{
	
	//Eğer sayfaya ilk kez geliniyorsa veri dışardan çağrılır
	if(ApiService.menuData===null)
	{
		var promise = ApiService.getXhrMenuData();
		promise.then(function(data)
		{
			ApiService.setXhrMenuData(data);
			var index = findWithAttr(ApiService.menuData.ResultSet, "CategoryName", $stateParams.categoryname);
			$scope.kategori = ApiService.menuData.ResultSet[index];
		},function(err)
		{

		});

	}//sayfaya içerden ulaşılıyorsa veri zaten içerdedir.
	else
	{
		var index = findWithAttr(ApiService.menuData.ResultSet, "CategoryName", $stateParams.categoryname);
		$scope.kategori = ApiService.menuData.ResultSet[index];
	}

}]);