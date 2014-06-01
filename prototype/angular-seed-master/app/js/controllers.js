'use strict';

/* Controllers */

var expmodule = angular.module('myApp.controllers', []);

expmodule.controller('loginForm', function($scope, sharedProperties) {
    var auth;
  	$scope.login = function (userid, password) {
      auth = sharedProperties.session.isAuthenticated(userid, password);
      if (auth) {
        alert("Welcome "+userid);
        window.location = "home.html";
      } else {
        alert("Invalid Login");
      }
    }
    $scope.register = function () {
      window.location = "register.html";
    }
  });

expmodule.controller('expenseForm', function($scope, sharedProperties) {
  var id, expenses = {};
  $scope.show = false;
  $scope.members = [{
    sNo: "1",
    id: "gnehapk@gmail.com",
    name: "Neha",
    share: 200,
    paid: 400,
    owesTo: "200 to Sneha",
    getsFrom: "400 from Nikita"
  }, {
    sNo: "2",
    id: "gnehapk@gmail.com",
    name: "Neha",
    share: 200,
    paid: 400,
    owesTo: "200 to Sneha",
    getsFrom: "400 from Nikita"
  }];
  $scope.counter = $scope.members.length + 1;
  $scope.submitExpense = function (expenseInfo) {
    id = sharedProperties.session.getInfo();
    $scope.members = expenseInfo.members = [];
    if (!expenses[id]) {
        expenses[id] = [];
    }
    expenses[id].push(expenseInfo);
    alert('Expense Added Successfully');
  }
  $scope.addRow = function () {
    $scope.show = true;
    return $scope.newRow = true;
  }
  $scope.addMember = function (newMember) {

});

expmodule.controller('registrationForm', function($scope, sharedProperties) {
  var success;
  $scope.register = function (user) {
    if (user.pwd !== user.cpwd) {
      alert("The Confirm Password field does not match the Password field.");
    } else {
      success = sharedProperties.addUser(user);
      if (success) {
        alert("Successfully Registered.");
        window.location = "home.html";
      } else {
        alert("User already exist with this email.");
      }
    }
  }

  });


