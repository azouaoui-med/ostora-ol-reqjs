define(["openlayers"], function (ol) {

    return {
        map:null,
        starter: function () {
            this.loadMap();
        },
        loadMap: function () {
            $('<div/>', {
                id: 'map',
            }).appendTo('#main');
            this.map = new ol.Map({
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                target: 'map',
                interactions: ol.interaction.defaults().extend([
                    new ol.interaction.DragRotateAndZoom()
                ]),
                view: new ol.View({
                    center: [0, 0],
                    zoom: 3
                })
            });
        }

    }

});