Constants = {
    Default: 'default',
    DateFormatString: 'MMM d, yyyy',
    EmailPattern: '/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/',
    API: {
        GetMaths: 'api/ExtremeMath/GetMaths',
        DoSum: 'api/ExtremeMath/DoSum'
    },
    Events: {
    },
    Services: {
        AjaxService: { Name: 'AjaxService', Path: 'app/scripts/ajaxService' },
        MathsService: { Name: 'MathsService', Path: 'app/components/maths/mathsService' },
    },
    Directives: {
    },
    ControllerNames: {
        NavBar: 'navBarController',
        SideBar: 'sideBarController',
        Footer: 'footerController',
        NewMathModal: 'newMathModalController',
        Maths: 'mathsController'
    }
};

var UidList = {
    NavBar: {
        Template: 'app/shared/navBar/navBarView.html',
        Controller: 'app/shared/navBar/navBarController',
        ControllerName: Constants.ControllerNames.NavBar
    },
    SideBar: {
        Template: 'app/shared/sideBar/sideBarView.html',
        Controller: 'app/shared/sideBar/sideBarController',
        ControllerName: Constants.ControllerNames.SideBar
    },
    Footer: {
        Template: 'app/shared/footer/footerView.html',
        Controller: 'app/shared/footer/footerController',
        ControllerName: Constants.ControllerNames.Footer
    },
    NewMathModal: {
        Template: 'app/components/newMath/newMathModalView.html',
        Controller: 'app/components/newMath/newMathModalController',
        ControllerName: Constants.ControllerNames.NewMathModal
    }
};

var QueryParams = {
    PaginationPageSizes: [20, 50, 100, 250, 300],
    PageSize: 20,
    PageNumber: 1,
    SearchText: "",
    Date: null,
    StartDate: null,
    EndDate: null
};

var MainContentBlockUI;