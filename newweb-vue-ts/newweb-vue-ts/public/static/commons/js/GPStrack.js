$(function () {
    initMap();
});

function initMap() {
    require([
        "esri/widgets/Track",
        "esri/views/SceneView",
        "esri/WebScene",
        "esri/widgets/Locate",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
    ], function(Track, SceneView, WebScene, Locate, Graphic, GraphicsLayer) {
        var map = new WebScene({
            portalItem: {
                id: "3d23f7bf8ae34664aa3a8f666c60acbd"
            }
        });

        var view = new SceneView({
            map: map,
            container: "viewDiv"
        });

        var graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

        //定位
        var locateBtn = new Locate({
            view: view,
            graphic: new Graphic({
                symbol: { type: "simple-marker" }
            })
        });
        locateBtn.locate().then(function(){
            // Fires after the user's location has been found
        });
        view.ui.add(locateBtn, {
            position: "top-left"
        });

        //追踪
        var track = new Track({
            view: view
        });
        view.ui.add(track, "top-left");
        view.when(function() {
            track.start();
        });

    });
}
