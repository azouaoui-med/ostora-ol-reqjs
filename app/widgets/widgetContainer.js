define(["text!app/widgets/widgetContainer.html"], function (content) {

    return function widgetContainer() {
        this.minimizedWidget;
        this.htmlContent = $($.parseHTML(content));
        this.starter = function () {
            //maximize widget to full width|height - header's height
            this.htmlContent.find('.widgetMaximize').click($.proxy(function () {
                this.htmlContent.toggleClass('maximized');
            }, this));
            //close widget
            this.htmlContent.find('.widgetClose').click($.proxy(function () {
                this.htmlContent.fadeOut(200);
            }, this));
            //minimize widget and display an icon to restore it
            this.htmlContent.find('.widgetMinimize').click($.proxy(function () {

                this.htmlContent.addClass('minimized');
                //save current style to apply it again when restoring the widget
                this.currentStyle = {
                    opacity: 1,
                    left: this.htmlContent.position().left,
                    top: this.htmlContent.position().top,
                    height: this.htmlContent.outerHeight(),
                    width: this.htmlContent.outerWidth()
                }

                if ($(".minimizedWidgets").length == 0) {
                    this.minimizedWidget = $('<div/>', {
                        class: 'minimizedWidgets'
                    }).appendTo('#footer');
                }

                this.minimizedWidget = $('<div/>', {
                    class: 'minimizedWidget',
                    html: this.htmlContent.find('.widgetTitle i').clone()
                }).appendTo('.minimizedWidgets');


                this.minimizedWidget.click($.proxy(function (e) {
                    e.preventDefault();
                    this.restoreWidget();
                   
                }, this));

            }, this));
            // bring widget to front when mousedown on it
            this.htmlContent.mousedown($.proxy(function () {
                $('.widgetContainer').css('z-index', 40);
                this.htmlContent.css('z-index', 50);
            }, this));

            //using draggable of jquery ui 
            //Note: jquery ui file only has the draggable fonction
            this.htmlContent.draggable({
                handle: ".widgetTitle",
                containment: $("#main")                
            });

            this.htmlContent.resizable({
                containment: $("#main")
            });

            if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                this.htmlContent.find(".widgetContent").mCustomScrollbar({
                    scrollInertia: 500
                });
            }

        }
        this.restoreWidget = function () {
            $('.widgetContainer').css('z-index', 40);
            this.htmlContent.css('z-index', 50);
            this.htmlContent.removeClass('minimized');
            this.minimizedWidget.remove();

        }

    }

});