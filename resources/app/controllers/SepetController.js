var application = angular.module("application")
.controller('SepetController@Sepet', ['$scope', '$rootScope', 'ApiService', '$stateParams', '$filter', 'SepetService', function($scope, $rootScope, ApiService, $stateParams, $filter, SepetService) {

	$scope.urunler = SepetService.all().urunler;
	$scope.total = SepetService.all().total;


	$scope.updateMiktar = function(urun)
	{
		SepetService.updateMiktar(urun.ProductId,urun.Miktar);
		$scope.total = SepetService.all().total;
	}

	$scope.removeProduct = function(urun)
	{
		SepetService.remove(urun.ProductId);
		$scope.total = SepetService.all().total;
	}
}]);