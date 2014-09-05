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
    app.controller("PostsCtrl", function ($scope, $location, Post) {
        if ($location.path() === "/") {
            $scope.posts = Post.all;
        }

        $scope.deletePost = function (postIndex, postId) {
            Post.remove(postIndex, postId);
        };
    });
}(news));
