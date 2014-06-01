'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngCookies'])
	.service('sharedProperties', function ($cookieStore) {
		var users = [{id: "Neha", pwd: "Neha", auth: false}, {id: "Sneha", pwd: "Sneha", auth: false}],
			authentication = false,
			expenses = {},
			currentUser = "";

			function setUserInfo (userid) {
				$cookieStore.put('userid', userid);
			}
			function setAuth () {
				$cookieStore.put('auth', true);
			}
			function getUserInfo () {
				return $cookieStore.get('userid');
			}


		return {
			session: {
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
					var oThis = this, i, length = users.length;
					for (i = 0; i < length; i++) {
						if (users[i].id === userid && users[i].pwd === password) {
        					oThis.setInfo(userid);
        					oThis.setAuthentication();
        					return true;
        				} else {
        					return false;
        				}
        			}
				}
			},
			addUser: function (user) {
				var length = users.length, success = true, i;
				for (i = 0; i < length; i++) {
					if (users[i].id === user.id) {
    					success = false;
    					break;
    				}
    			}
    			if (success) {
    				users.push(user);
    			}
    			return success;
			}
		}
});