/**
 * @ngdoc overview
 * @name angNewsApp
 * @description
 * # angNewsApp
 *
 * Main module of the application.
 */
var news = angular.module("angNewsApp", [
    "ngAnimate",
    "ngCookies",
    "ngResource",
    "ngRoute",
    "ngSanitize",
    "ngTouch",
    "firebase"
]);

(function (app) {
    "use strict";

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/posts.html",
                controller: "PostsCtrl"
            })
            .when("/posts/:postId", {
                templateUrl: "views/postview.html",
                controller: "PostviewCtrl"
            })
            .when("/register", {
                templateUrl: "views/auth.html",
                controller: "AuthCtrl"
            })
            .when("/login", {
                templateUrl: "views/login.html",
                controller: "AuthCtrl"
            })
            .otherwise({
                redirectTo: "/"
            });
    });

    app.config(function ($logProvider) {
        $logProvider.debugEnabled(false);
    });

    app.constant("FIREBASE_URL", "https://flickering-heat-4540.firebaseio.com/");
}(news));

