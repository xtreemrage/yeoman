/*global news*/
(function (app) {
    "use strict";

    /**
     * @ngdoc function
     * @name angNewsApp.controller:NavCtrl
     * @description
     * # NavCtrl
     * Controller of the angNewsApp
     */
    app.controller("NavCtrl", function ($scope, $location, Post, Auth) {
        $scope.post = {
            url: "http://",
            title: ""
        };

        $scope.submitPost = function () {
            Post.create($scope.post).then(function (postId) {
                $location.path("/posts/" + postId);
                $scope.post = {
                    url: "http://",
                    title: ""
                };
            });
        };

        $scope.logout = function () {
            Auth.logout();
        };
    });
}(news));
