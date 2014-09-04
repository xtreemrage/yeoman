"use strict";

/**
 * @ngdoc function
 * @name mytodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mytodoApp
 */
angular.module("mytodoApp")
  .controller("MainCtrl", function ($scope, localStorageService) {
        var todosInStores = localStorageService.get("todos");

        $scope.todos = todosInStores && todosInStores.split("\n") || [];

        $scope.$watch("todos", function () {
            localStorageService.add("todos", $scope.todos.join("\n"));
        }, true);

        $scope.addTodo = function () {
            $scope.todos.push($scope.todo);
            $scope.todo = "";
        };

        $scope.removeTodo = function (index) {
            $scope.todos.splice(index, 1);
        };
  });
