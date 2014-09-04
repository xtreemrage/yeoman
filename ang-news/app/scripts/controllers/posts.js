/*global news*/
(function (app) {
    "use strict";

    /**
     * @ngdoc function
     * @name angNewsApp.controller:PostsCtrl
     * @description
     * # PostsCtrl
     * Controller of the angNewsApp
     */
    app.controller("PostsCtrl", function ($scope, Post) {
        $scope.posts = Post.all;

        $scope.deletePost = function (post) {
            Post.remove(post);
        };
    });
}(news));
