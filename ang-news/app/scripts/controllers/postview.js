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

        $scope.addComment = function () {
            Post.addComment($routeParams.postId, $scope.comment);
            $scope.comment = "";
        };
    });
}(news));
