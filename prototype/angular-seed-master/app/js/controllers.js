'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('loginForm', function($scope,  $location) {
  	$scope.users = [{name: "Neha", pwd: "Neha"}, {name: "Sneha", pwd: "Sneha"}];
  	$scope.login = function (userName, password) {
  		if (userName === "Neha" && password === "Neha") {
  			alert("Welcome");
        $location.path("/home");
  		} else {
  			alert("Invalid Login");
  		}
  	}
  })
  .controller('expenseForm', function($scope, $location) {
    $scope.expenses = [{
      exTitle: "",
      amount: "",
      typeOfShare: "",
      date: ""
    }];
    $scope.submitExpense = function (expenseInfo) {
      $scope.expenses.push(expenses.push(JSON.parse(JSON.stringify(expenseInfo)));
    }
  });
