/*global news*/
(function (app) {
    "use strict";

    /**
     * @ngdoc service
     * @name angNewsApp.auth
     * @description
     * # auth
     * Factory in the angNewsApp.
     */

    app.factory("Auth", function ($firebaseSimpleLogin, FIREBASE_URL, $rootScope) {
        var reference, auth, Auth;

        reference = new Firebase(FIREBASE_URL);
        auth = $firebaseSimpleLogin(reference);

        Auth = {
            register: function (user) {
                return auth.$createUser(user.email, user.password);
            },
            signedIn: function () {
                return auth.user !== null;
            },
            login: function (user) {
                return auth.$login("password", user);
            },
            logout: function () {
                auth.$logout();
            }
        };

        $rootScope.signedIn = function () {
            return Auth.signedIn();
        };

        return Auth;
    });
}(news));
