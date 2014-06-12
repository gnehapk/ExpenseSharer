'use strict';

/* Controllers */

var expmodule = angular.module('myApp.controllers', []);

expmodule.controller('TabController', function () {
  this.tab = 1;

    this.isSet = function(checkTab) {
      return this.tab === checkTab;
    };

    this.setTab = function(setTab) {
      this.tab = setTab;
    };
});

expmodule.controller('loginForm',function($scope, $http, sharedProperties) {
    var auth;
  	$scope.login = function (userid, password) {
      auth = sharedProperties.session.isAuthenticated(userid, password);
      if (auth) {
        alert("Welcome "+userid);
        window.location = "expenseList.html";
      } else {
        alert("Invalid Login");
      }
    }
    $scope.register = function () {
      window.location = "register.html";
    }
  });

expmodule.controller('listExpense', function ($scope, sharedProperties) {
  $scope.expenses = sharedProperties.getExpenseList();/*[{
    sNo: 1,
    title: "Hotel Bill"
  }, {
    sNo: 2,
    title: "Shopping Expense"
  }];*/
  $scope.goToExpense = function () {
    window.location = "home.html";

  }

});



expmodule.controller('registrationForm', function($scope, sharedProperties) {
  var success;
  $scope.register = function (user) {
    if (user.pwd !== user.cpwd) {
      alert("The Confirm Password field does not match the Password field.");
    } else {
      success = sharedProperties.addUser(user);
      //if (success) {
        alert("Successfully Registered.");
        window.location = "home.html";
      /*} else {
        alert("User already exist with this email.");
      }*/
    }
  }

  });


