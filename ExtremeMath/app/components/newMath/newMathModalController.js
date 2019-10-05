"use strict";
define([currentApp, Constants.Services.MathsService.Path], function (app) {
    app.register.controller(Constants.ControllerNames.NewMathModal, [
        '$scope', 'blockUI', 'toastr', '$uibModalInstance', Constants.Services.MathsService.Name, 'modalParams',
        function ($scope, blockUI, toastr, $uibModalInstance, service, modalParams) {
            
            var doSum = function () {
                MainContentBlockUI.start();
                service.doSum($scope.newMath).then(function (response) {
                    $uibModalInstance.close(true);
                }, function (err) {
                    toastr.error('Failed to do math!', 'Error');
                    console.log(err);
                }).finally(function () {
                    MainContentBlockUI.stop();
                });
            };

            var ok = function () {
                doSum();
            };

            var cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            var init = function () {
                $scope.ok = ok;
                $scope.cancel = cancel;
                $scope.title = "New Math";
                $scope.newMath = {};
                $scope.newMath.User = {};
            }
            init();
        }]);
});