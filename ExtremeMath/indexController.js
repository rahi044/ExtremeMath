"use strict";
define(function () {
    return function ($scope, blockUI) {

        var init = function () {
            MainContentBlockUI = blockUI.instances.get('mainContentBlockUI');

            require([UidList.NavBar.Controller], function () {
                $scope.navBar = UidList.NavBar.Template;
                $scope.$apply();
            });
            require([UidList.SideBar.Controller], function () {
                $scope.sideBar = UidList.SideBar.Template;
                $scope.$apply();
            });
            require([UidList.Footer.Controller], function () {
                $scope.footer = UidList.Footer.Template;
                $scope.$apply();
            });
        };
        init();
    };
});