'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngCookies'])
	.service('sharedProperties', function ($cookieStore, $http) {

		var users = [],
			authentication = false,
			expenses = {},
			currentUser = "";

		//$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

		$http.get('https://api.mongolab.com/api/1/databases/expensesharer/collections/users?apiKey=OlzCTduvk_xWdPnBwrYXR0idW-kHHQRU').success(function (data) {
			users = data;
		});

		function setUserInfo (userid) {
			$cookieStore.put('userid', userid);
		}
		function setAuth () {
			$cookieStore.put('auth', true);
		}
		function getUserInfo () {
			return $cookieStore.get('userid');
		}


		this.session = {
			setInfo: function (userid) {
				setUserInfo(userid);
			},
			setAuthentication: function () {
				setAuth();
			},
			getInfo: function () {
				return getUserInfo();
			},
			isAuthenticated: function (userid, password) {
				var oThis = this, i, length = users.length, success = false;
				for (i = 0; i < length; i++) {
					if (users[i].id === userid && users[i].pwd === password) {
    					oThis.setInfo(userid);
    					oThis.setAuthentication();
    					success = true;
    					break;
    				}
    			}
    			return success;
			}
		};

		this.addUser =  function (user) {
			var length = users.length, success = true, i;

			function pushData() {
				var promise = $http.post('https://api.mongolab.com/api/1/databases/expensesharer/collections/users?apiKey=OlzCTduvk_xWdPnBwrYXR0idW-kHHQRU ', {"id": user.id, "pwd": user.pwd})
				.success(function (data, status, headers, config) {
					alert("success");
				}).error( function (data, status, headers, config) {
					alert("error");
					success = false;
				});
				return promise;
			}
			for (i = 0; i < length; i++) {
				if (users[i].id === user.id) {
					alert("User already exist with this email.");
					success = false;
					break;
				}
			}
			if (success) {
				/*$http({
                method: 'POST',
                url: 'https://api.mongolab.com/api/1/databases/expensesharer/collections/users?apiKey=OlzCTduvk_xWdPnBwrYXR0idW-kHHQRU',
                data: {"id": user.id, "pwd": user.pwd}
            }).success(function() {
            	alert("success");
            }).error( function() {
            	alert("error");
            });*/
				/*$http.post('https://api.mongolab.com/api/1/databases/expensesharer/collections/users?apiKey=OlzCTduvk_xWdPnBwrYXR0idW-kHHQRU ', {"id": user.id, "pwd": user.pwd})
				.then(function (data) {
					alert("Added");
				});*/
				/*pushData().then(function (data){
					alert('In');
					return success;
				});*/
			var url = 'https://api.mongolab.com/api/1/databases/expensesharer/collections/users?apiKey=OlzCTduvk_xWdPnBwrYXR0idW-kHHQRU';
			$.post( url, {"id": user.id, "pwd": user.pwd})
  				.done(function( data ) {
    				alert( "Data Loaded: " + data );
  				});

			}
		}

		this.getExpenseList = function () {
			var id = getUserInfo(), expenses = [];
			$http.get('expenseList.json').then(function (data) {
				expenses = data;
				return expenses;
			});

		}

});