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
        $scope.user = User.findByUsername($routeParams.username);

        function populatePosts() {
            $scope.posts = {};

            angular.forEach($scope.user.posts, function (postId) {
                $scope.posts[postId] = Post.find(postId);
            });
        }

        $scope.user.$loaded().then(function () {
            populatePosts();
        });
    });
}(news));