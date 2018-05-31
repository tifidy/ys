angular.module("application")
.config(function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider, RESOURCES) 
{ /*#####START CONFIG#####*/

$httpProvider.useApplyAsync([true]);
$httpProvider.interceptors.push(function($q, $rootScope, $injector, $timeout) {
	return {
	'responseError': function(response) {

		if(response.status === 401)
		{
			$rootScope.hata404 = true;          
		}
			return $q.reject(response);
		}
	};
});



$urlMatcherFactoryProvider.strictMode(false)

$locationProvider.html5Mode(true)


/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^CREATE ROUTES START^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
$stateProvider
	.state('root', 
	{
		url: '/',
		abstract: true,
		template: '<ui-view/>'
	})
	/*	*/
	/*	ANASAYFA	
	/*	url: "/"
	/*	
	/*	*/
	.state('/', 
	{
		url: '', 
		templateUrl: 'tpl-arama/kategori.sec.html',
		controller: "AramaController@KategoriSec"
	})



	.state('root.kategori', 
	{
		url: 'kategori',
		abstract: true,
		template: '<ui-view/>'
	})
	.state('root.kategori.go', 
	{
		url: '/:categoryname', 
		templateUrl: 'tpl-arama/kategori.arama.html',
		controller: "AramaController@KategoriArama"
	})

	/*	*/
	/*	SEPET	
	/*	url: "/sepet"
	/*	
	/*	*/
	.state('root.sepet', 
	{
		url: 'sepet',
		abstract: true,
		template: '<ui-view/>'
	})
	.state('root.sepet.init', 
	{
		url: '', 
		templateUrl: 'tpl-sepet/index.html',
		controller: "SepetController@Sepet"
	})



/*-----------------------------------------------------------------------------------*/






}).run( 
function($rootScope, $location, $window) 
{
	$rootScope.$on('$stateChangeSuccess', function (event) 
	{
	});
	$rootScope.back = function(){
		$window.history.back();
	}
});