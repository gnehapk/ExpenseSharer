'use strict';

var expmodule = angular.module('myApp.controllers', []);

expmodule.controller('expenseForm', function($scope, sharedProperties) {
  var id, expenses = {};
  $scope.new = {};
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
    id: "gnehapk1@gmail.com",
    name: "Neha",
    share: 200,
    paid: 400,
    owesTo: "200 to Sneha",
    getsFrom: "400 from Nikita"
  }];
  $scope.expenses = {
    "gnehapk@gmail.com" : {
      title: "Hotel Bill",
      amount: 2000,
      typeOfShare: "Equal",
      date: "04/03/2014",
      members: $scope.members
    }
  }
  $scope.counter = $scope.members.length + 1;
  $scope.present = false;
  $scope.submitExpense = function (expenseInfo) {
    id = sharedProperties.session.getInfo();
    //$scope.members = expenseInfo.members = [];
    if (!$scope.expenses[id]) {
        $scope.expenses[id] = {};
    }
    $scope.expenses[id] = expenseInfo;
    //$scope.expenses[id].members = $scope.members;
    alert('Expense Added Successfully');
    window.location = "memberList.html";
    //$scope.present = true;
  }
  $scope.addRow = function () {
    $scope.show = true;
    return $scope.newRow = true;
  }
  $scope.deleteRow = function () {
    var index = this.row.rowIndex;
    $scope.gridOptions.selectItem(index, false);
    $scope.members.splice(index, 1);
  }
  $scope.addMember = function () {
    id = sharedProperties.session.getInfo();
    $scope.new.sNo = $scope.counter;
    $scope.new.owesTo = "to be added";
    $scope.new.getsFrom = "to be added";
    $scope.expenses[id].members.push($scope.new);
    alert('Member Added Successfully');
    $scope.new = {};
  }
});
