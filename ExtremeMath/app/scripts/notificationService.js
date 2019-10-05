define(function () {
    return function (toastr) {
        this.success = toastr.success;
        this.info = toastr.info;
        this.error = toastr.error;
        this.warning = toastr.warning;
    };
});