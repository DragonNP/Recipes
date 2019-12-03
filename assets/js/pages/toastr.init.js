/*
Template Name: Minton - Responsive Bootstrap 4 Admin Dashboard
Author: CoderThemes
Website: https://coderthemes.com/
Contact: support@coderthemes.com
File: Toastr init js
*/

!function($) {
    'use strict';

    var NotificationApp = function() {
    };


    /**
     * Send Notification
     * @param {*} heading heading text
     * @param {*} body body text
     * @param {*} position position e.g top-right, top-left, bottom-left, etc
     * @param {*} loaderBgColor loader background color
     * @param {*} icon icon which needs to be displayed
     * @param {*} hideAfter automatically hide after seconds
     * @param {*} stack
     */
    NotificationApp.prototype.send = function(heading, body, position, loaderBgColor, icon, hideAfter, stack, showHideTransition) {
        // default
        if (!hideAfter)
            hideAfter = 3000;
        if (!stack)
            stack = 1;

        var options = {
            heading: heading,
            text: body,
            position: position,
            loaderBg: loaderBgColor,
            icon: icon,
            hideAfter: hideAfter,
            stack: stack
        };

        if(showHideTransition)
            options.showHideTransition = showHideTransition;

        console.log(options);
        $.toast().reset('all');
        $.toast(options);
    },

        $.NotificationApp = new NotificationApp, $.NotificationApp.Constructor = NotificationApp


}(window.jQuery),
    //initializing main application module
    function($) {
        "use strict";

        // notification examples

        $("#toastr-one").on('click', function (e) {
            $.NotificationApp.send("Heads up!", "This alert needs your attention, but it is not super important.", 'top-right', '#3b98b5', 'info');
        });

        $("#toastr-three").on('click', function (e) {
            $.NotificationApp.send("Well Done!", "You successfully read this important alert message", 'top-right', '#5ba035', 'success');
        });

        $("#toastr-four").on('click', function (e) {
            $.NotificationApp.send("Oh snap!", "Change a few things up and try submitting again.", 'top-right', '#bf441d', 'error');
        });
    }(window.jQuery);