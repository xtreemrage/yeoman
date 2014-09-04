"use strict";

/**
 * @ngdoc overview
 * @name mytodoApp
 * @description
 * # mytodoApp
 *
 * Main module of the application.
 */
angular
  .module("mytodoApp", [
    "ngAnimate",
    "ngCookies",
    "ngResource",
    "ngRoute",
    "ngSanitize",
    "ngTouch",
        "ui.sortable",
        "LocalStorageModule"
  ])
    .config(function (localStorageServiceProvider){
        localStorageServiceProvider.setPrefix("ls");
    })
  .config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "views/main.html",
        controller: "MainCtrl"
      })
      .when("/about", {
        templateUrl: "views/about.html",
        controller: "AboutCtrl"
      })
      .when('/testRoute', {
        templateUrl: 'views/testroute.html',
        controller: 'TestrouteCtrl'
      })
      .otherwise({
        redirectTo: "/"
      });
  });
