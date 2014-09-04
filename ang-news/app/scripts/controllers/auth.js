/*global news*/
(function (app) {
    "use strict";

    /**
     * @ngdoc function
     * @name angNewsApp.controller:AuthCtrl
     * @description
     * # AuthCtrl
     * Controller of the angNewsApp
     */
    app.controller("AuthCtrl", function ($scope, $location, $log, Auth, User) {
        if (Auth.signedIn()) {
            $location.path("/");
        }

        $scope.$on("$firebaseSimpleLogin:login", function () {
            $location.path("/");
        });

        $scope.login = function () {
            Auth.login($scope.user).then(function () {
                $location.path("/");
            }, function (error) {
                $scope.error = error.toString();
            });
        };

        $scope.register = function () {
            Auth.register($scope.user).then(function (authUser) {
                //$log.debug(authUser);
                User.create(authUser, $scope.user.username);
                $location.path("/");
            }, function (error) {
                $scope.error = error.toString();
            });
        };
    });
}(news));