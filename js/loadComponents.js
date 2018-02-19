define(["require", "config/widgetsConfig"], function (require, widgetsConfig) {

    return {
        starter: function (map) {
            this.loadWidgets(map);
        },
        loadWidgets: function (map) {
            require(["app/header/header", "app/widgets/widgetContainer"], function (header, widgetContainer) {

                var headerContent = $($.parseHTML(header.htmlContent))[0];
                $('#header').append(headerContent);
                var menuList = widgetsConfig.menuList;

                for (let i = 0; i < menuList.length; i++) {
                    if (menuList[i].type == 'simple') {
                        let menu = $('<li/>', {
                            class: 'nav-item',
                            html: '<a class="nav-link" href="#">' + menuList[i].title + '</a>'
                        }).appendTo('ul#menuList');
                        require([menuList[i].widget.path], function (widget) {

                            var widgetContainerC = new widgetContainer();
                            var widgetContainerHtml = widgetContainerC.htmlContent;
                            widgetContainerC.htmlContent.find('.widgetTitle .widgetText')[0].innerHTML = menuList[i].widget.title;
                            widgetContainerC.htmlContent.find('.widgetTitle .widgetIcon')[0].innerHTML = menuList[i].widget.icon;

                            var widgetHtml = $.parseHTML(widget.htmlContent)[0];

                            $(widgetContainerHtml).find('.widgetContent')[0].innerHTML = widget.htmlContent;
                            $("main#main").append(widgetContainerHtml);
                          
                            menu.click(function (e) {
                                e.preventDefault();
                                widgetContainerC.htmlContent.fadeIn(200);
                                if (widgetContainerC.minimizedWidget) {
                                    widgetContainerC.restoreWidget();
                                }

                                $('.widgetContainer').css('z-index', 40);
                                widgetContainerC.htmlContent.css('z-index', 50);
                            });

                            widgetContainerC.starter();
                            widget.map = map;
                            widget.starter();


                        });

                    }
                }

            });

        }
    }

});