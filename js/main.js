define(["js/loadMap","js/loadComponents" ], function (loadMap,loadComponents) {

    return {
        starter: function () {
            loadMap.starter();
            var map = loadMap.map;
            loadComponents.starter(map);
            
            $(".ol-rotate-reset .ol-compass").html('<i class="fab fa-ethereum"></i>');
        }

    }

});