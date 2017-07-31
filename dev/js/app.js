var app = angular.module('ContinentsAndCountriesApp', ['angular.filter']);

app.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
});
