define(["text!app/widgets/draw/draw.html", "openlayers"], function (content, ol) {

    return {
        htmlContent: content,
        starter: function () {

            this.source = new ol.source.Vector({
                wrapX: false
            });

            var vector = new ol.layer.Vector({
                source: this.source
            });

            this.snap = new ol.interaction.Snap({
                source: this.source
            });
            this.map.addLayer(vector);
            $("#btn-draw-point").click($.proxy(function (e) {
                e.preventDefault();
                this.removeInteraction();
                this.addInteraction("Point");
            }, this));
            $("#btn-draw-line").click($.proxy(function (e) {
                e.preventDefault();
                this.removeInteraction();
                this.addInteraction("LineString");
            }, this));
            $("#btn-draw-polygon").click($.proxy(function (e) {
                e.preventDefault();
                this.removeInteraction();
                this.addInteraction("Polygon");
            }, this));
            $("#btn-draw-circle").click($.proxy(function (e) {
                e.preventDefault();
                this.removeInteraction();
                this.addInteraction("Circle");
            }, this));

            $("#btn-draw-modify").click($.proxy(function (e) {
                e.preventDefault();
                this.removeInteraction();
                this.modifyInteraction();
            }, this));
            $("#btn-draw-stop").click($.proxy(function (e) {
                e.preventDefault();
                this.removeInteraction();
            }, this));
            $("#btn-draw-clear").click($.proxy(function (e) {
                e.preventDefault();
                this.clearGraphics();
            }, this));
        },
        addInteraction: function (type) {
            var freeHand = false;
            var snap = false;

            if ($('#cb_freehand').is(":checked")) {
                freeHand = true;
            }

            if ($('#cb_snap').is(":checked")) {
                snap = true;
            }
            this.draw = new ol.interaction.Draw({
                source: this.source,
                type: type,
                freehand: freeHand
            });
            this.map.addInteraction(this.draw);

            if (snap) {
                this.map.addInteraction(this.snap);
            } else {
                this.map.removeInteraction(this.snap);
            }

        },
        modifyInteraction: function () {
            this.modify = new ol.interaction.Modify({
                source: this.source
            });
            this.map.addInteraction(this.modify);
        },
        removeInteraction: function () {
            if (this.draw) {
                this.map.removeInteraction(this.draw);
            }
            if (this.modify) {
                this.map.removeInteraction(this.modify);
            }
        },
        clearGraphics: function () {
            this.source.clear();
        }

    }

});