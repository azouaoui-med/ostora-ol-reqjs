// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: '././',
    paths: {
        config: 'js/config',
        app: 'app',
        js:'js',
        domReady: 'libs/requirejs/plugins/domReady',
        text: 'libs/requirejs/plugins/text',
        i18n: 'libs/requirejs/plugins/i18n',
        openlayers: 'libs/openlayers/js/ol'
    }

});

// Start loading the main app file. Put all of
// your application logic in there.

require(['js/main'], function (main) {
    main.starter();
});


requirejs.onError = function (err) {
    console.log(err);
    if (err.requireType === 'timeout') {
        console.log('modules: ' + err.requireModules);
    }

    throw err;
};