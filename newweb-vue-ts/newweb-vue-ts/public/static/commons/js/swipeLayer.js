$(function () {
    mapid_left = $('#select_left option:selected').val();
    mapid_right = $('#select_right option:selected').val();
    initMap(mapid_left,mapid_right);
    mapid_left1 = $('#select_left1 option:selected').val();
    mapid_right1 = $('#select_right1 option:selected').val();
    $("#select_left1").addClass(' hide');
    $("#select_right1").addClass(' hide');
    $("#viewDiv_left").addClass(' hide');
    $("#viewDiv_right").addClass(' hide');
});

var host = "122.112.231.165";
var mapid_left,mapid_right;
var mapid_left1,mapid_right1;

function initMap(mapid_left,mapid_right) {
    require([
        "geoscene/Map",
        "geoscene/views/MapView",
        // "geoscene/layers/TileLayer",
        "geoscene/layers/ImageryLayer",
        "geoscene/widgets/LayerList",
        "geoscene/widgets/Swipe",
        "geoscene/widgets/Expand",
        "geoscene/Graphic"
    ], function(Map, MapView, ImageryLayer, LayerList, Swipe, Expand, Graphic) {
        const map = new Map({});

        //region 原本的多时相遥感影像对比
        // const infrared = new TileLayer({
        //     // url: "http://180.168.147.181:7081/PBS/rest/services/tms2010/MapServer",
        //     url: "http://" + host + ":7081/PBS/rest/services/tms2010_4_12/MapServer",
        //     maxScale: 288895,
        //     // minScale:
        // });
        // const infrared2 = new TileLayer({
        //     // url: "http://180.168.147.181:7081/PBS/rest/services/tms2010/MapServer",
        //     url: "http://" + host + ":7081/PBS/rest/services/tms2010_13_17/MapServer",
        //     maxScale: 4514,
        //     minScale: 288895
        // });
        // const infrared3 = new TileLayer({
        //     // url: "http://180.168.147.181:7081/PBS/rest/services/tms2010/MapServer",
        //     url: "http://" + host + ":7081/PBS/rest/services/tms2010_18_20/MapServer",
        //     maxScale: 0,
        //     minScale: 4514
        // });
        // map.add(infrared);
        // map.add(infrared2);
        // map.add(infrared3);
        //
        // const nearInfrared = new TileLayer({
        //     // url: "http://180.168.147.181:7081/PBS/rest/services/tms2019/MapServer",
        //     url: "http://" + host + ":7081/PBS/rest/services/tms2019_4_12/MapServer",
        //     maxScale: 288895,
        // });
        // const nearInfrared2 = new TileLayer({
        //     // url: "http://180.168.147.181:7081/PBS/rest/services/tms2019/MapServer",
        //     url: "http://" + host + ":7081/PBS/rest/services/tms2019_13_17/MapServer",
        //     maxScale: 4514,
        //     minScale: 288895
        // });
        // const nearInfrared3 = new TileLayer({
        //     // url: "http://180.168.147.181:7081/PBS/rest/services/tms2019/MapServer",
        //     url: "http://" + host + ":7081/PBS/rest/services/tms2019_18_20/MapServer",
        //     maxScale: 1128,
        //     minScale: 4514
        // });
        // map.add(nearInfrared3);
        // map.add(nearInfrared);
        // map.add(nearInfrared2);
        //endregion

        const infrared = new ImageryLayer({
            portalItem: {  // autocasts as new PortalItem()
                id: mapid_left
            },
        });
        // var layer = new ImageryLayer({
        //     // url: "https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer"
        //     // url: "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer"
        //     url: "https://www.geosceneonline.cn/image/rest/services/Hosted/tms1990/ImageServer"
            
        // });
        map.add(infrared);
        // map.add(layer);

        const nearInfrared = new ImageryLayer({
            portalItem: {  // autocasts as new PortalItem()
                id: mapid_right
            },
        });
        // var layer1 = new ImageryLayer({
        //     // url: "https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer"
        //     url: "https://www.geosceneonline.cn/image/rest/services/Hosted/tms1990/ImageServer"
        // });
        map.add(nearInfrared);
        // map.add(layer1);

        const view = new MapView({
            container: "viewDiv",
            map: map,
            center: [119.43099, 30.3243795], // longitude, latitude
            constraints: {
                // maxZoom: 19,
                // minZoom: 8,
                // minScale: 2888950,
                // maxScale: 1128
            }
        });

        const swipe = new Swipe({
            leadingLayers: [infrared,],
            trailingLayers: [nearInfrared,],
            position: 50, // set position of widget to 35%
            view: view
        });
        view.ui.add(swipe);

        view.on("click", function(event) {

            // debugger

        });

        //创建红色边框
        var polygon = {
            type: "polygon", // autocasts as new Polygon()
            rings: [
                [119.39, 30.28],
                [119.39, 30.37],
                [119.47, 30.37],
                [119.47, 30.28]
            ]
        };
        var fillSymbol = {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [227, 139, 79, 0.1],
            outline: {
                // autocasts as new SimpleLineSymbol()
                color: [255, 0, 0],
                width: 2
            }
        };
        var polygonGraphic = new Graphic({
            geometry: polygon,
            symbol: fillSymbol
        });
        view.graphics.addMany([polygonGraphic]);
    });
}

//切换左右两边多时相遥感时间
function onLeftChanged(){
    mapid_left = $('#select_left option:selected').val();
    initMap(mapid_left,mapid_right);
    console.log("select_left变成了：" + mapid_left);
}

function onRightChanged(){
    mapid_right = $('#select_right option:selected').val();
    initMap(mapid_left,mapid_right);
    console.log("select_right变成了：" + mapid_right);
}

function secMap(mapid_left1,mapid_right1) {
    require([
        "geoscene/Map",
        "geoscene/views/MapView",
        // "geoscene/layers/TileLayer",
        "geoscene/layers/ImageryLayer",
        "geoscene/core/watchUtils",
  
    ], function(Map, MapView, ImageryLayer,watchUtils) {
        const left_image = new ImageryLayer({
            portalItem: {  // autocasts as new PortalItem()
                id: mapid_left1
            },
        });

       // map.add(left_image);
        const right_image = new ImageryLayer({
            portalItem: {  // autocasts as new PortalItem()
                id: mapid_right1
            },
        });
        //map.add(right_image);
        viewleft = new MapView({
            container:"viewDiv_left",
            map : new Map({
                layers:[left_image]            }),
            center: [119.43099, 30.3243795],
            zoom:1
        });
        viewright = new MapView({
            container:"viewDiv_right",
            map : new Map({
                layers:[right_image]            }),
            center: [119.43099, 30.3243795],
            zoom:1
        });
        // watchUtils.init(viewleft,"extent",function(extent){
        //     if(viewleft.stationary){
        //         viewright.goTo({
        //             center:viewleft.center,
        //             scale:viewleft.scale
        //         });
        //     }
        // })

        //view
        viewleft.on("drag", function(event) {
            updateView();
            });
        viewleft.on("pointer-move", function (event) {
            updateView();
        });

        viewright.on("drag", function(event) {
            updateView1();
            });
        viewright.on("pointer-move", function (event) {
            updateView1();
        });

    }
)
    function updateView() {
        viewright.goTo({
            center:viewleft.center,
            zoom:viewleft.zoom
        });
    }
    function updateView1() {
        viewleft.goTo({
            center:viewright.center,
            zoom:viewright.zoom
        });
    }
}
//切换左右两边多时相遥感时间
function onLeftChanged1(){
    mapid_left1 = $('#select_left1 option:selected').val();
    secMap(mapid_left1,mapid_right1);
    console.log("select_left1变成了：" + mapid_left1);
}

function onRightChanged1(){
    mapid_right1 = $('#select_right1 option:selected').val();
    secMap(mapid_left1,mapid_right1);
    console.log("select_right1变成了：" + mapid_right1);
}



//切换展示方式
function onSwitchBtnClicked(value) {
    switch (value){
        case "对照式":
            $("#btn_juanlian").addClass(' chosen');
            $("#btn_duizhao").removeClass(' chosen');
            secMap(mapid_left1,mapid_right1);
            $("#viewDiv_left").removeClass(' hide');
            $("#viewDiv_right").removeClass(' hide');
            $("#viewDiv").addClass(' hide');
            $("#select_left1").removeClass(' hide');
            $("#select_right1").removeClass(' hide');
            $("#select_left").addClass(' hide');
            $("#select_right").addClass(' hide');
            //document.getElementById("viewDiv_left").style.display="";
            //document.getElementById("viewDiv_right").style.display="";

            break;
        case "卷帘式":
            $("#btn_juanlian").removeClass(' chosen');
            $("#btn_duizhao").addClass(' chosen');
            initMap(mapid_left,mapid_right);
            $("#viewDiv_left").addClass(' hide');
            $("#viewDiv_right").addClass(' hide');
            $("#viewDiv").removeClass(' hide');
            $("#select_left1").addClass(' hide');
            $("#select_right1").addClass(' hide');
            $("#select_left").removeClass(' hide');
            $("#select_right").removeClass(' hide');
            break;
    }

}
//点击关闭按钮关闭窗口
function closeItem(value){
        document.getElementById("div_roam").style.display="none"
}