var currentApp = 'main-app';

require.config({
    waitSeconds: 100,
    baseUrl: '',
    deps: [currentApp, 'app/scripts/constants', 'filters'],
    paths: {
        'jquery': 'assets/libs/jQuery/jquery-3.0.0',
        'angular': 'assets/libs/angular/angular',
        'angularAMD': 'assets/libs/angular/angularAMD',
        'angular-route': 'assets/libs/angular/angular-route',
        'block-ui': 'assets/libs/angular/angular-block-ui',
        'ui-grid': 'assets/libs/angular/ui-grid',
        'angular-toastr': 'assets/libs/angular/angular-toastr.tpls',
        'ui-bootstrap': 'assets/libs/bootstrap/ui-bootstrap-tpls',
        'bootstrap': 'assets/libs/bootstrap/bootstrap',
        'ajaxService': 'app/scripts/ajaxService',
        'filters': 'app/scripts/filters',
        'footerController': 'app/shared/footer/footerController',
        'navBarController': 'app/shared/navBar/navBarController',
        'sideBarController': 'app/shared/sideBar/sideBarController',
        'indexController': 'indexController',
        'main-app': 'app/main-app'
    },
    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'block-ui': ['angular'],
        'ui-bootstrap': ['angular'],
        'ui-grid': ['angular'],
        'angular-toastr': ['angular'],
        'jquery': {
            exports: 'jquery'
        }
    }
});