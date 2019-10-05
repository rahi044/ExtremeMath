"use strict";
define([currentApp, Constants.Services.MathsService.Path], function (app) {
    app.register.controller(Constants.ControllerNames.Maths,
        ['$scope', '$filter', '$uibModal', 'toastr', Constants.Services.MathsService.Name, function ($scope, $filter, $uibModal, toastr, service) {

            var loadMaths = function () {
                MainContentBlockUI.start('Loading maths ...');
                service.getMaths($scope.queryParams).then(function (response) {
                    $scope.maths = response.data;
                    $scope.gridOptions.data = response.data.Items;
                    $scope.gridOptions.totalItems = response.data.TotalItems;
                    toastr.success('Loading successfull', 'Success');
                }, function (err) {
                    toastr.error('Failed to load maths', 'Error');
                }).finally(function () {
                    MainContentBlockUI.stop();
                });
            };

            var openNewMathModal = function (math) {
                require([UidList.NewMathModal.Controller], function () {
                    var newMathModal = $uibModal.open({
                        templateUrl: UidList.NewMathModal.Template,
                        controller: UidList.NewMathModal.ControllerName,
                        resolve: {
                            modalParams: {
                                math: angular.copy(math)
                            }
                        },
                        backdrop: 'static'
                    });
                    newMathModal.result.then(function (item) {
                        if (item)
                            toastr.success('Math created successfully', 'Confirmation');
                        loadMaths();
                    });
                });
            };

            var setGridOptions = function () {
                $scope.gridOptions = {
                    paginationPageSizes: $scope.queryParams.PaginationPageSizes,
                    paginationPageSize: $scope.queryParams.PageSize,
                    useExternalPagination: true,
                    selectionRowHeaderWidth: 35,
                    rowHeight: 35
                };
                $scope.gridOptions.columnDefs = [
                    {
                        name: 'Date', width: 120,
                        cellTemplate: '<div style="padding: 7px;"' +
                            ' class="ui-grid-cell-contents">{{row.entity.Date | toDateString}}</div>'
                    },
                    {
                        name: 'UserName', minWidth: 150,
                        cellTemplate: '<div style="padding: 7px;"' +
                            ' class="ui-grid-cell-contents" ' +
                            ' tooltip-class="uiGridCellTooltip" ' +
                            ' uib-tooltip-html="row.entity.User.UserName" ' +
                            ' tooltip-placement="top" ' +
                            ' tooltip-append-to-body="true">{{row.entity.User.UserName}}</div>'
                    },
                    {
                        name: 'FirstNumber', minWidth: 150,
                        cellTemplate: '<div style="padding: 7px;"' +
                            ' class="ui-grid-cell-contents" ' +
                            ' tooltip-class="uiGridCellTooltip" ' +
                            ' uib-tooltip-html="row.entity.FirstNumber" ' +
                            ' tooltip-placement="top" ' +
                            ' tooltip-append-to-body="true">{{row.entity.FirstNumber}}</div>'
                    },
                    {
                        name: 'SecondNumber', minWidth: 150,
                        cellTemplate: '<div style="padding: 7px;"' +
                            ' class="ui-grid-cell-contents" ' +
                            ' tooltip-class="uiGridCellTooltip" ' +
                            ' uib-tooltip-html="row.entity.SecondNumber" ' +
                            ' tooltip-placement="top" ' +
                            ' tooltip-append-to-body="true">{{row.entity.SecondNumber}}</div>'
                    },
                    {
                        name: 'Result', minWidth: 150,
                        cellTemplate: '<div style="padding: 7px;"' +
                            ' class="ui-grid-cell-contents" ' +
                            ' tooltip-class="uiGridCellTooltip" ' +
                            ' uib-tooltip-html="row.entity.Result" ' +
                            ' tooltip-placement="top" ' +
                            ' tooltip-append-to-body="true">{{row.entity.Result}}</div>'
                    },
                    {
                        name: 'Action',
                        width: 100,
                        cellTemplate:
                            '<span class="dropdown" style="padding: 2px;">' +
                                '<button class="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown">' +
                                    'Actions&nbsp;' +
                                    '<span class="glyphicon glyphicon-menu-down"></span>' +
                                '</button>' +
                                '<ul class="dropdown-menu dropdown-menu-right">' +
                                    '<li>' +
                                        '<a href="" class="formLabel" ng-click="grid.appScope.createProjectBankTransaction(row.entity)">' +
                                            '<span class="floatNone glyphicon glyphicon-pencil">&nbsp;</span>' +
                                            '<span class="formLabel floatNone">Edit Transaction</span>' +
                                        '</a>' +
                                    '</li>' +
                                    '<li class="dropdownMenuDivider"><label><hr></label></li>' +
                                    '<li>' +
                                        '<a href="" style="color: red;" class="formLabel" ng-click="grid.appScope.removeProjectBankTransaction(row.entity)">' +
                                            '<span style="color: red;" class="floatNone glyphicon glyphicon-trash">&nbsp;</span>' +
                                            '<span style="color: red;" class="formLabel floatNone">Delete Transaction</span>' +
                                        '</a>' +
                                    '</li>' +
                                '</ul>' +
                            '</span>'
                    }
                ];
                $scope.gridOptions.multiSelect = true;
                $scope.gridOptions.onRegisterApi = function (gridApi) {
                    $scope.gridApi = gridApi;
                    gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                        $scope.queryParams.PageNumber = newPage;
                        $scope.queryParams.PageSize = pageSize;
                        loadMaths();
                    });
                };
            };

            var setDateOptions = function () {
                $scope.format = 'MMM d, yyyy';
                $scope.dateOptions = {
                    formatYear: 'yyyy'
                };
            };

            var init = function () {
                $scope.queryParams = angular.copy(QueryParams);
                setGridOptions();
                $scope.openNewMathModal = openNewMathModal;
                loadMaths();
            };
            init();
        }]);
});