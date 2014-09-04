/*global news*/
(function (app) {
    "use strict";

    /**
     * @ngdoc function
     * @name angNewsApp.controller:PostviewCtrl
     * @description
     * # PostviewCtrl
     * Controller of the angNewsApp
     */
    app.controller("PostviewCtrl", function ($scope, $routeParams, Post) {
        $scope.post = Post.find($routeParams.postId);
    });
}(news));
