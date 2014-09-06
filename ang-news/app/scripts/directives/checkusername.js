/*global news*/
(function (app) {
    "use strict";

    /**
     * @ngdoc directive
     * @name angNewsApp.directive:checkUsername
     * @description
     * # checkUsername
     */
    app.directive("checkUsername", function (User) {
        var usernameRegexp = /^[^.$\[\]#\/\s]+$/;

        return {
            require: "ngModel",
            link: function postLink(scope, element, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    if (usernameRegexp.test(viewValue)) {
                        if (User.findUsername(viewValue)) {
                            ctrl.$setValidity('taken', true);
                            ctrl.$setValidity('invalid', true);

                            return viewValue;
                        }

                        ctrl.$setValidity('taken', false);
                        ctrl.$setValidity('invalid', true);

                        return undefined;
                    }

                    ctrl.$setValidity('taken', true);
                    ctrl.$setValidity('invalid', false);

                    return undefined;
                });
            }
        };
    });
}(news));
