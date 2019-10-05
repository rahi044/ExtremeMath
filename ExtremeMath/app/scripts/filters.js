define([currentApp], function(app) {

    app.filter('stringToDate', function($filter) {
        return function(date) {
            if (date == undefined) {
                return null;
            }
            if (typeof date === 'string' || date instanceof String) {
                date = new Date(date);
                return date;
            }
            return null;
        };
    });

    app.filter('toDateString', function($filter) {
        return function(date) {
            if (date == undefined) {
                return "";
            }
            if (typeof date === 'string' || date instanceof String) {
                date = new Date(date);
                if (date == "Invalid Date") {
                    return "";
                }
            }
            var monthNames = new Array("Jan", "Feb", "Mar", "Apr",
                "May", "Jun", "Jul", "Aug",
                "Sep", "Oct", "Nov", "Dec");

            var currDate = date.getDate();
            var currMonth = date.getMonth();
            var currYear = date.getFullYear();

            return monthNames[currMonth] + " " + currDate + ", " + currYear;
        };
    });
});