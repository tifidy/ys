var application = angular.module("application")
.controller('masterController', ['$scope', '$location', '$timeout', '$window', '$rootScope', '$filter', '$state', 'ApiService', 'SepetService', 'NotifyService', function($scope, $location, $timeout, $window, $rootScope, $filter, $state, ApiService, SepetService, NotifyService) 
{
	$rootScope.urunCount = 0;

	$rootScope.bildirimler=NotifyService.queue;

	$scope.$on("notify:message",function(e){
		$rootScope.bildirimler=NotifyService.queue;
	});


	$scope.notifyRemove = function(bildirim)
	{
		NotifyService.remove(bildirim.id);
	}



	$scope.addProduct = function(product)
	{
		SepetService.add(product);
	}



}]);