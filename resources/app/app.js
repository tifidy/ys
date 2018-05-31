var application=angular.module("application",
[
	"ui.router", 
	"templatePartials"
], 
function($interpolateProvider) 
{
		$interpolateProvider.startSymbol('{!');
		$interpolateProvider.endSymbol('!}');
});

