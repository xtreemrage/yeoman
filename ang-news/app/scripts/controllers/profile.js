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

        postsRef.$loaded().then(function () {
            populatePosts();
        });
    });
}(news));