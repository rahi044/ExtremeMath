"use strict";
define(['jquery', 'angularAMD', 'angular-route', 'block-ui', 'ui-bootstrap', 'ui-grid', 'angular-toastr'], function ($, angularAMD) {
    var app = angular
        .module('mainModule', ['ngRoute', 'blockUI', 'ui.bootstrap'
            , 'ui.grid', 'ui.grid.pinning', 'ui.grid.pagination', 'ui.grid.edit', 'ui.grid.cellNav', 'ui.grid.validate', 'ui.grid.selection', 'ui.grid.treeView', 'ui.grid.resizeColumns', 'ui.grid.moveColumns'
            , 'toastr'])
        .config(['$routeProvider', '$locationProvider', 'blockUIConfig', '$sceProvider', function ($routeProvider, $locationProvider, blockUIConfig, $sceProvider) {
            blockUIConfig.blockBrowserNavigation = true;
            blockUIConfig.message = 'Loading...';
            blockUIConfig.autoBlock = false;
            $sceProvider.enabled(false);
            $routeProvider
                .when("/", angularAMD.route({
                    templateUrl: "app/components/maths/mathsView.html",
                    controller: "mathsController",
                    controllerUrl: 'app/components/maths/mathsController'
                }))
                //.when("/mathLog", angularAMD.route({
                //    templateUrl: "mathLogView.html",
                //    controller: "mathLogController",
                //    controllerUrl: 'mathLogController'
                //}))
                .otherwise({ redirectTo: '/' });
            $locationProvider.html5Mode(true);
        }]);

    require(['indexController', 'ajaxService'],
        function (indexController, ajaxService) {
            app.service(Constants.Services.AjaxService.Name, ['$http', ajaxService]);
            app.controller('indexController', ['$scope', 'blockUI', indexController]);
            angularAMD.bootstrap(app);
        });

    return app;
});