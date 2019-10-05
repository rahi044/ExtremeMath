define(function () {
    return function ($http) {
        this.Get = function (route) {
            return $http.get(route);
        }
        this.Post = function (route, data) {
            return $http.post(route, data);
        }
        this.GetWithParams = function (url, params) {
            return $http({ url: url, method: 'GET', params: params });
        }
        this.PostWithParams = function (url, params, data) {
            return $http({ url: url, method: 'POST', params: params, data: data });
        };
    };
});