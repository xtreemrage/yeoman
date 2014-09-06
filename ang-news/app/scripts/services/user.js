/*global news*/
(function (app) {
    "use strict";

    /**
     * @ngdoc service
     * @name angNewsApp.user
     * @description
     * # user
     * Factory in the angNewsApp.
     */
    app.factory("User", function ($firebase, FIREBASE_URL, $rootScope, $log) {
        var reference, users, User;

        reference = new Firebase(FIREBASE_URL + "users");
        users = $firebase(reference).$asObject();

        function setCurrentUser(username) {
            $rootScope.currentUser = User.findByUsername(username);
            $log.debug($rootScope.currentUser);
        }

        /*jslint unparam: true*/
        $rootScope.$on("$firebaseSimpleLogin:login", function (event, authUser) {
            var query = $firebase(reference).$asArray();

            query.$loaded(function (result) {
                result.some(function (data) {
                    /*jshint camelcase: false */
                    if (data.md5_hash === authUser.md5_hash) {
                        setCurrentUser(data);
                    }
                    /*jshint camelcase: true */
                });
            });
        });
        /*jslint unparam: false*/

        $rootScope.$on("$firebaseSimpleLogin:logout", function () {
            delete $rootScope.currentUser;
        });

        User = {
            create: function (authUser, username) {
                /*jshint camelcase: false */
                users[username] = {
                    md5_hash: authUser.md5_hash,
                    username: username,
                    $priority: authUser.uid
                };/*jshint camelcase: true */

                users.$save().then(function () {
                    setCurrentUser(users);
                });
            },
            findByUsername: function (userDef) {
                if (userDef) {
                    var user;
                    $log.debug(userDef);
                    user = userDef.$id || userDef;

                    return $firebase(reference.child(user)).$asObject();
                }
            },
            findUsername: function (username) {
                if (username) {
                    var isFound = false;

                    angular.forEach(users, function (value, key) {
                        if (key === username) {
                            isFound = true;
                        }
                    });

                    return isFound;
                }
            },
            getCurrent: function () {
                return $rootScope.currentUser;
            },
            signedIn: function () {
                return $rootScope.currentUser !== undefined;
            }
        };

        return User;
    });
}(news));
