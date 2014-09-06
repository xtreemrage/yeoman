/*global news*/
(function (app) {
    "use strict";

    /**
     * @ngdoc function
     * @name angNewsApp.controller:ProfileCtrl
     * @description
     * # ProfileCtrl
     * Controller of the angNewsApp
     */
    app.controller("ProfileCtrl", function ($scope, $routeParams, Post, User) {
        var postsRef;

        $scope.commentedPosts = {};

        $scope.user = User.findByUsername($routeParams.username);

        postsRef = Post.all;

        function populatePosts() {
            $scope.posts = {};

            angular.forEach($scope.user.posts, function (postId) {
                var index;
                index = parseInt(postsRef.$indexFor(postId), 10);
                $scope.posts[index] = Post.find(postId);
            });
        }

        function populateComments() {
            $scope.comments = {};

            angular.forEach($scope.user.comments, function (comment) {
                var post = Post.find(comment.postId);

                post.$loaded().then(function () {
                    $scope.comments[comment.id] = post.comments[comment.id];

                    $scope.commentedPosts[comment.postId] = post;
                });
            });
        }

        postsRef.$loaded().then(function () {
            populatePosts();
            populateComments();
        });
    });
}(news));