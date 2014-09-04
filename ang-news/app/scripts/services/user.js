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
                users[authUser.md5_hash] = {
                    md5_hash: authUser.md5_hash,
                    username: username,
                    $priority: authUser.uid
                };/*jshint camelcase: true */

                users.$save().then(function () {
                    setCurrentUser(users);
                });
            },
            findByUsername: function (users) {
                if (users) {
                    $log.debug(users);
                    return users;
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
