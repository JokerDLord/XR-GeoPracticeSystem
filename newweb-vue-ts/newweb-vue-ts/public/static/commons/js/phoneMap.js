$(function () {
    //35e608bbea0944f5872ceefcb462b157
    //fca96b4df7324044a08b29b8b7306dc9   吴老师制作的页面
    var customID = "fca96b4df7324044a08b29b8b7306dc9";
    initDefaultMap(customID);
});

//初始化地图
function initDefaultMap(customID) {
    require([
        "esri/layers/FeatureLayer",
        "esri/Map",
        "esri/core/watchUtils",
        "esri/views/MapView",
        "esri/views/SceneView",
        "esri/WebMap",
        "esri/PopupTemplate",
        "esri/widgets/LayerList",
        "esri/WebScene",
        "esri/widgets/Track",
    ], function (FeatureLayer, Map, watchUtils, MapView, SceneView, WebMap, PopupTemplate, LayerList, WebScene,Track,) {
        var switchButton = document.getElementById("switch-btn");//切换2/3D按钮
        var resetButton = document.getElementById("resetScene-btn");//重置场景视图按钮

        var appConfig = {
            mapView: null,
            sceneView: null,
            activeView: null,
            container: "viewDiv"
        };

        var initialViewParams = {
            container: appConfig.container
        };
        var map = new WebScene({
            portalItem: {
                id: customID
            }
        });
        var webmap = new WebMap({
            portalItem: {
                id: "d0942c803ae84d57b9dbd51c9dee05fb"
            }
        });

        appConfig.mapView = createView(initialViewParams, "2d");
        appConfig.mapView.map = webmap;
        appConfig.mapView.ui.remove('attribution')//清除底部powered by ESRI

        initialViewParams.map = map;
        appConfig.sceneView = createView(initialViewParams, "3d");
        appConfig.activeView = appConfig.sceneView;
        appConfig.sceneView.ui.remove('attribution')//清除底部powered by ESRI

        // 切换2D、3D
        switchButton.addEventListener("click", function () {
            switchView();
        });
        // 重置视图
        resetButton.addEventListener("click",function () {
            var is3D = appConfig.activeView.type === "3d";
            if(is3D){
                initialViewParams.map = map;
                appConfig.sceneView = createView(initialViewParams, "3d");
                appConfig.activeView = appConfig.sceneView;
                appConfig.sceneView.ui.remove('attribution')//清除底部powered by ESRI
            }else {
                appConfig.mapView = createView(initialViewParams, "2d");
                appConfig.mapView.map = webmap;
                appConfig.mapView.ui.remove('attribution')//清除底部powered by ESRI
            }
        });

        function switchView() {
            var is3D = appConfig.activeView.type === "3d";
            var activeViewpoint = appConfig.activeView.viewpoint.clone();

            appConfig.activeView.container = null;

            if (is3D) {
                appConfig.mapView.viewpoint = activeViewpoint;
                appConfig.mapView.container = appConfig.container;
                appConfig.activeView = appConfig.mapView;
                switchButton.value = "3D";
            } else {
                appConfig.sceneView.viewpoint = activeViewpoint;
                appConfig.sceneView.container = appConfig.container;
                appConfig.activeView = appConfig.sceneView;
                switchButton.value = "2D";
            }
        }

        // 创建2D、3D视图，并添加图层控制框
        function createView(params, type) {
            var view;
            var is2D = type === "2d";
            if (is2D) {
                view = new MapView(params);
                return view;
            }
            else {
                view = new SceneView(params);
                view.when(function () {
                    //加图层控制框
                    var layerList = new LayerList({
                        view: view,
                        //图例
                        listItemCreatedFunction: function (event) {
                            const item = event.item;
                            if (item.layer.type != "group") {
                                // 确保同组下的图层不会重复显示
                                item.panel = {
                                    content: "legend",
                                    open: false
                                };
                            }
                        },
                    });
                    view.ui.add(layerList, "top-right");
                    var track = new Track({
                        view: view
                    });
                    view.ui.add(track, "top-left");
                    track.start();
                    //获取webScene所有图层，处理弹框
                    map.load()
                        .then(function () {
                            return map.basemap.load();
                        })
                        .then(function () {
                            var allLayers = map.allLayers;
                            var promises = allLayers.map(function (layer) {
                                return layer.load();
                            });
                            return Promise.all(promises.toArray());
                        })
                        .then(function (layers) {

                            for (let i = 0; i < layers.length; i++) {
                                if (layers[i].title == "植被实习点") {
                                    plantLayerClickEvent(layers[i]);
                                }
                                if (layers[i].title == "地貌实习点") {
                                    landLayerClickEvent(layers[i]);
                                }
                                if (layers[i].title == "土壤实习点") {
                                    soilLayerClickEvent(layers[i]);
                                }
                                if (layers[i].title == "等高线") {
                                    queryHeight(layers[i]);
                                }
                            }

                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                });

            }
            return view;
        }

    });
}


//植被实习点
function plantLayerClickEvent(targetLayer) {
    var popupTemplate = {
        title: "<strong>植被实习点</strong>",
        content: [{
            type: "fields",
            fieldInfos: [
                {
                    fieldName: "说明",
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }]
        }]
    };
    targetLayer.popupTemplate = popupTemplate;
}

//地貌实习点
function landLayerClickEvent(targetLayer) {
    var popupTemplate = {
        title: "<strong>地貌实习点</strong>",
        content: [{
            type: "fields",
            fieldInfos: [
                {
                    fieldName: "说明",
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }]
        }]
    };
    targetLayer.popupTemplate = popupTemplate;
}

//土壤实习点
function soilLayerClickEvent(targetLayer) {
    var popupTemplate = {
        title: "<strong>土壤实习点</strong>",
        content: [{
            type: "fields",
            fieldInfos: [
                {
                    fieldName: "说明",
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }]
        }]
    };
    targetLayer.popupTemplate = popupTemplate;
}

//等高线
function queryHeight(targetLayer) {
    var popupTemplate = {
        title: "<strong>等高线</strong> ",
        content: [{
            type: "fields",
            fieldInfos: [
                {
                    fieldName: "type",
                    label: "类型",
                    visible:false
                },
                {
                    fieldName: "CONTOUR",
                    label: "高度(m)",
                    visible:true,
                }]
        }]
    };

    targetLayer.popupTemplate = popupTemplate;

}
