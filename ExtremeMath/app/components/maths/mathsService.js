define([currentApp], function(app) {
    app.register.service(Constants.Services.MathsService.Name, [
        Constants.Services.AjaxService.Name, function(ajaxService) {
            this.getMaths = function (queryParams) {
                return ajaxService.PostWithParams(Constants.API.GetMaths, {}, queryParams);
            };
            this.doSum = function (newMath) {
                return ajaxService.PostWithParams(Constants.API.DoSum, {}, newMath);
            };
        }
    ]);
});