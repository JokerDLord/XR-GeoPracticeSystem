$(function () {
    //35e608bbea0944f5872ceefcb462b157
    //fca96b4df7324044a08b29b8b7306dc9   吴老师制作的页面
    var customID = "51e33702905441d883f8e7b2ed4c1bb7";
    initDefaultMap(customID);
});

//初始化地图
function initDefaultMap(customID) {
    require([
        "geoscene/layers/FeatureLayer",
        "geoscene/Map",
        "geoscene/views/MapView",
        "geoscene/views/SceneView",
        "geoscene/PopupTemplate",
        "geoscene/widgets/LayerList",
        "geoscene/WebScene",
        "geoscene/layers/GraphicsLayer",
        "geoscene/widgets/Sketch/SketchViewModel",
        "geoscene/tasks/support/PrintTemplate",
        "geoscene/widgets/Home"
    ], function (FeatureLayer, Map, MapView, SceneView, PopupTemplate, LayerList, WebScene,
        GraphicsLayer, SketchViewModel, PrintTemplate, Home) {
        const map = new WebScene({
            portalItem: {
                id: customID
            }
        });
        const view = new SceneView({
            container: "viewDiv",
            map: map,
        });

        const homeBtn = new Home({
            view: view
        });
        view.ui.add(homeBtn, "top-left");
        view.ui.remove('attribution');//清除底部powered by ESRI

        //region 绘制多边形
        const gLayer = new GraphicsLayer(
            {
                elevationInfo: {
                    mode: "relative-to-ground" // default value
                }
            }
        );
        gLayer.title = "绘制流域范围";
        map.layers.add(gLayer);
        const blue = [82, 82, 122, 0.9];
        const white = [255, 255, 255, 0.8];
        const extrudedPolygon = {
            type: "polygon-3d",
            symbolLayers: [
                {
                    type: "extrude",
                    size: 20, // extrude by 10 meters
                    material: {
                        color: white
                    },
                    edges: {
                        type: "solid",
                        size: "4px",
                        color: blue
                    }
                }
            ]
        };
        const sketchViewModel = new SketchViewModel({
            layer: gLayer,
            view: view,
            polygonSymbol: extrudedPolygon,
            defaultCreateOptions: { hasZ: true }
        });
        sketchViewModel.on("create", function (event) {
            if (event.state === "complete") {
                sketchViewModel.update(event.graphic);
                deactivateButtons();
            }
        });
        const drawButtons = Array.prototype.slice.call(document.getElementsByClassName("esri-button"));
        drawButtons.forEach(function (btn) {
            btn.addEventListener("click", function (event) {
                deactivateButtons();
                event.target.classList.add("esri-button--secondary");
                sketchViewModel.create(event.target.getAttribute("data-type"));
            });
        });

        function deactivateButtons() {
            drawButtons.forEach(function (element) {
                element.classList.remove("esri-button--secondary");
            });
        }


        //endregion

        //加图层控制框
        const layerList = new LayerList({
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

        //获取webScene所有图层，处理弹框
        // map.load()
        //     .then(function () {
        //         return map.load();
        //     })
        //     .then(function () {
        //         // grab all the layers and load them
        //         var allLayers = map.allLayers;
        //         var promises = allLayers.map(function (layer) {
        //             return layer.load();
        //         });
        //         return Promise.all(promises.toArray());
        //     })
        //     .then(function (layers) {
        //
        //         // for (let i = 0; i < layers.length; i++) {
        //         //     if (layers[i].title == "植被实习点") {
        //         //         plantLayerClickEvent(layers[i]);
        //         //     }
        //         //     if (layers[i].title == "地貌实习点") {
        //         //         landLayerClickEvent(layers[i]);
        //         //     }
        //         //     if (layers[i].title == "土壤实习点") {
        //         //         soilLayerClickEvent(layers[i]);
        //         //     }
        //         //     if (layers[i].title == "等高线") {
        //         //         queryHeight(layers[i]);
        //         //     }
        //         // }
        //
        //     })
        //     .catch(function (error) {
        //         console.error(error);
        //     });

        view.popup.on("trigger-action", function (event) {
            if (event.action.id === "idQJT") {
                popQJT();
            } else if (event.action.id === "idVideo") {
                popVideo();
            }
        });
        //截图
        //region 3D时 截图
        const screenshotBtn = document.getElementById("screenshotBtn");
        const maskDiv = document.getElementById("maskDiv");
        const screenshotDiv = document.getElementById("screenshotDiv");

        screenshotBtn.addEventListener("click", function () {
            screenshotBtn.classList.add("active");
            view.container.classList.add("screenshotCursor");
            let area = null;

            // listen for drag events and compute the selected area
            const dragHandler = view.on("drag", function (event) {
                // prevent navigation in the view
                event.stopPropagation();

                // when the user starts dragging or is dragging
                if (event.action !== "end") {
                    // calculate the extent of the area selected by dragging the cursor
                    const xmin = clamp(
                        Math.min(event.origin.x, event.x),
                        0,
                        view.width
                    );
                    const xmax = clamp(
                        Math.max(event.origin.x, event.x),
                        0,
                        view.width
                    );
                    const ymin = clamp(
                        Math.min(event.origin.y, event.y),
                        0,
                        view.height
                    );
                    const ymax = clamp(
                        Math.max(event.origin.y, event.y),
                        0,
                        view.height
                    );
                    area = {
                        x: xmin,
                        y: ymin,
                        width: xmax - xmin,
                        height: ymax - ymin
                    };
                    // set the position of the div element that marks the selected area
                    setMaskPosition(area);
                }
                // when the user stops dragging
                else {
                    // remove the drag event listener from the SceneView
                    dragHandler.remove();
                    // the screenshot of the selected area is taken
                    view
                        .takeScreenshot({ area: area, format: "png" })
                        .then(function (screenshot) {
                            // display a preview of the image
                            showPreview(screenshot);

                            // create the image for download
                            document.getElementById("downloadBtn").onclick = function () {
                                const text = document.getElementById("textInput").value;
                                // if a text exists, then add it to the image
                                if (text) {
                                    const dataUrl = getImageWithText(screenshot, text);
                                    downloadImage(
                                        map.portalItem.title + ".png",
                                        dataUrl
                                    );
                                }
                                // otherwise download only the map screenshot
                                else {
                                    downloadImage(
                                        map.portalItem.title + ".png",
                                        screenshot.dataUrl
                                    );
                                }
                            };

                            // the screenshot mode is disabled
                            screenshotBtn.classList.remove("active");
                            view.container.classList.remove("screenshotCursor");
                            setMaskPosition(null);
                        });
                }
            });

            function setMaskPosition(area) {
                if (area) {
                    maskDiv.classList.remove("hide");
                    maskDiv.style.left = area.x + "px";
                    maskDiv.style.top = area.y + "px";
                    maskDiv.style.width = area.width + "px";
                    maskDiv.style.height = area.height + "px";
                } else {
                    maskDiv.classList.add("hide");
                }
            }

            function clamp(value, from, to) {
                return value < from ? from : value > to ? to : value;
            }
        });

        // creates an image that will be appended to the DOM
        // so that users can have a preview of what they will download
        function showPreview(screenshot) {
            screenshotDiv.classList.remove("hide");
            // add the screenshot dataUrl as the src of an image element
            const screenshotImage = document.getElementsByClassName(
                "js-screenshot-image"
            )[0];
            screenshotImage.width = screenshot.data.width;
            screenshotImage.height = screenshot.data.height;
            screenshotImage.src = screenshot.dataUrl;
        }

        // returns a new image created by adding a custom text to the webscene image
        function getImageWithText(screenshot, text) {
            const imageData = screenshot.data;

            // to add the text to the screenshot we create a new canvas element
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.height = imageData.height;
            canvas.width = imageData.width;

            // add the screenshot data to the canvas
            context.putImageData(imageData, 0, 0);
            context.font = "20px Arial";
            context.fillStyle = "#000";
            context.fillRect(
                0,
                imageData.height - 40,
                context.measureText(text).width + 20,
                30
            );

            // add the text from the textInput element
            context.fillStyle = "#fff";
            context.fillText(text, 10, imageData.height - 20);

            return canvas.toDataURL();
        }

        function downloadImage(filename, dataUrl) {
            // the download is handled differently in Microsoft browsers
            // because the download attribute for <a> elements is not supported
            if (!window.navigator.msSaveOrOpenBlob) {
                // in browsers that support the download attribute
                // a link is created and a programmatic click will trigger the download
                const element = document.createElement("a");
                element.setAttribute("href", dataUrl);
                element.setAttribute("download", filename);
                element.style.display = "none";
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            } else {
                // for MS browsers convert dataUrl to Blob
                const byteString = atob(dataUrl.split(",")[1]);
                const mimeString = dataUrl
                    .split(",")[0]
                    .split(":")[1]
                    .split(";")[0];
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([ab], { type: mimeString });

                // download file
                window.navigator.msSaveOrOpenBlob(blob, filename);
            }
        }

        // button to hide the print preview html element
        document
            .getElementById("closeBtn")
            .addEventListener("click", function () {
                screenshotDiv.classList.add("hide");
            });
        //endregion

        //修改测试版截图（已注释）
        //region 3D时 截图
        // const screenshotBtn = document.getElementById("screenshotBtn");
        // const maskDiv = document.getElementById("maskDiv");
        // const screenshotDiv = document.getElementById("screenshotDiv");
        //
        // screenshotBtn.addEventListener("click", function () {
        //     screenshotBtn.classList.add("active");
        //     let area = null;
        //     const xmin = document.getElementById("viewDiv").getBoundingClientRect().left;
        //     const xmax = document.getElementById("viewDiv").getBoundingClientRect().right;
        //     const ymin = document.getElementById("viewDiv").getBoundingClientRect().top;
        //     const ymax = document.getElementById("viewDiv").getBoundingClientRect().bottom;
        //     area = {
        //         x: xmin,
        //         y: ymin,
        //         width: xmax - xmin,
        //         height: ymax - ymin
        //     };
        //     setMaskPosition(area);
        //     view.takeScreenshot({area: area, format: "png"})
        //         .then(function (screenshot) {
        //             // 截图预览
        //             showPreview(screenshot);
        //
        //             // 创建图片保存链接
        //             document.getElementById("downloadBtn").onclick = function () {
        //                 const text = document.getElementById("textInput").value;
        //                 // if a text exists, then add it to the image
        //                 if (text) {
        //                     const dataUrl = getImageWithText(screenshot, text);
        //                     downloadImage(
        //                         map.portalItem.title + ".png",
        //                         dataUrl
        //                     );
        //                 }
        //                 // otherwise download only the map screenshot
        //                 else {
        //                     downloadImage(
        //                         map.portalItem.title + ".png",
        //                         screenshot.dataUrl
        //                     );
        //                 }
        //             };
        //
        //             // 取消，返回场景
        //             screenshotBtn.classList.remove("active");
        //             view.container.classList.remove("screenshotCursor");
        //             setMaskPosition(null);
        //         });
        //
        //     function setMaskPosition(area) {
        //         if (area) {
        //             maskDiv.classList.remove("hide");
        //             maskDiv.style.left = area.x + "px";
        //             maskDiv.style.top = area.y + "px";
        //             maskDiv.style.width = area.width + "px";
        //             maskDiv.style.height = area.height + "px";
        //         } else {
        //             maskDiv.classList.add("hide");
        //         }
        //     }
        //
        // });
        //
        // // 预览图片
        // function showPreview(screenshot) {
        //     screenshotDiv.classList.remove("hide");
        //     // add the screenshot dataUrl as the src of an image element
        //     const screenshotImage = document.getElementsByClassName(
        //         "js-screenshot-image"
        //     )[0];
        //     screenshotImage.width = screenshot.data.width;
        //     screenshotImage.height = screenshot.data.height;
        //     screenshotImage.src = screenshot.dataUrl;
        //     initImg(screenshotImage.src);
        // }
        //
        // // returns a new image created by adding a custom text to the webscene image
        // function getImageWithText(screenshot, text) {
        //     const imageData = screenshot.data;
        //
        //     // to add the text to the screenshot we create a new canvas element
        //     const canvas = document.createElement("canvas");
        //     const context = canvas.getContext("2d");
        //     canvas.height = imageData.height;
        //     canvas.width = imageData.width;
        //
        //     // add the screenshot data to the canvas
        //     context.putImageData(imageData, 0, 0);
        //     context.font = "20px Arial";
        //     context.fillStyle = "#000";
        //     context.fillRect(
        //         0,
        //         imageData.height - 40,
        //         context.measureText(text).width + 20,
        //         30
        //     );
        //
        //     // add the text from the textInput element
        //     context.fillStyle = "#fff";
        //     context.fillText(text, 10, imageData.height - 20);
        //
        //     return canvas.toDataURL();
        // }
        //
        // function downloadImage(filename, dataUrl) {
        //     // the download is handled differently in Microsoft browsers
        //     // because the download attribute for <a> elements is not supported
        //     if (!window.navigator.msSaveOrOpenBlob) {
        //         // in browsers that support the download attribute
        //         // a link is created and a programmatic click will trigger the download
        //         const element = document.createElement("a");
        //         element.setAttribute("href", dataUrl);
        //         element.setAttribute("download", filename);
        //         element.style.display = "none";
        //         document.body.appendChild(element);
        //         element.click();
        //         document.body.removeChild(element);
        //     } else {
        //         // for MS browsers convert dataUrl to Blob
        //         const byteString = atob(dataUrl.split(",")[1]);
        //         const mimeString = dataUrl
        //             .split(",")[0]
        //             .split(":")[1]
        //             .split(";")[0];
        //         const ab = new ArrayBuffer(byteString.length);
        //         const ia = new Uint8Array(ab);
        //         for (let i = 0; i < byteString.length; i++) {
        //             ia[i] = byteString.charCodeAt(i);
        //         }
        //         const blob = new Blob([ab], {type: mimeString});
        //
        //         // download file
        //         window.navigator.msSaveOrOpenBlob(blob, filename);
        //     }
        // }
        //
        // // button to hide the print preview html element
        // document
        //     .getElementById("closeBtn")
        //     .addEventListener("click", function () {
        //         screenshotDiv.classList.add("hide");
        //     });
        // //endregion

    });
}



var popupFeature = null;
function setContentInfo(feature) {
    popupFeature = feature;
    console.dir("popupFeature:" + popupFeature);
    if (popupFeature.graphic.layer.title == "植被实习点" && popupFeature.graphic.attributes.OBJECTID == "1") {
        var node = "<p style='color: gray'>实习点位置：禅源寺前</p>";
    } else if (popupFeature.graphic.layer.title == "土壤实习点" && popupFeature.graphic.attributes.OBJECTID == "2") {
        var node = "<p style='color: gray'>实习点位置：大有村</p>";
    } else {
        var node = "<p style='color: gray'>实习点位置：往三里亭路上</p>";
    }

    if (popupFeature.graphic.layer.title == "土壤实习点" && popupFeature.graphic.attributes.OBJECTID == "1") {
        var node = "<p style='color: gray'>实习点位置：浮玉山庄附近</p>";
    } else if (popupFeature.graphic.layer.title == "土壤实习点" && popupFeature.graphic.attributes.OBJECTID == "2") {
        var node = "<p style='color: gray'>实习点位置：红庙附近</p>";
    } else {
        var node = "<p style='color: gray'>实习点位置：{说明}</p>";
    }
    return node;
}

//植被实习点
function plantLayerClickEvent(targetLayer) {
    debugger
    var popupTemplate = {
        title: "<strong>植被实习点</strong>",
        content: setContentInfo,
        actions: [
            {
                title: "查看全景",
                id: "idQJT",
                image: base_url + "commons/image/index/tuxiang_v.png"
            }, {
                title: "查看视频",
                id: "idVideo",
                image: base_url + "commons/image/index/demfenxi_v.png"
            }
        ],
        fieldInfos: [
            {
                fieldName: "说明",
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }
        ]
    };

    targetLayer.popupTemplate = popupTemplate;

}

//地貌实习点
function landLayerClickEvent(targetLayer) {
    debugger
    var popupTemplate = {
        title: "<strong>地貌实习点</strong>",
        content: setContentInfo,
        actions: [
            {
                title: "查看全景",
                id: "idQJT",
                image: base_url + "commons/image/index/tuxiang_v.png"
            }
        ],
        fieldInfos: [
            {
                fieldName: "说明",
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }
        ]
    };
    targetLayer.popupTemplate = popupTemplate;
}

//土壤实习点
function soilLayerClickEvent(targetLayer) {
    var popupTemplate = {
        title: "<strong>土壤实习点</strong>",
        content: setContentInfo,
        actions: [
            {
                title: "查看全景",
                id: "idQJT",
                image: base_url + "commons/image/index/tuxiang_v.png"
            }, {
                title: "查看视频",
                id: "idVideo",
                image: base_url + "commons/image/index/demfenxi_v.png"
            }
        ],
        fieldInfos: [
            {
                fieldName: "说明",
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }
        ]
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
                    visible: false
                },
                {
                    fieldName: "CONTOUR",
                    label: "高度(m)",
                    visible: true,
                }]
        }]
    };

    targetLayer.popupTemplate = popupTemplate;

}

//打开全景图
function popQJT() {
    var OBJECTID = popupFeature.graphic.attributes.OBJECTID;
    var mark = popupFeature.graphic.attributes.说明;
    var type = popupFeature.graphic.layer.title;
    console.log("您点击的当前点位位置为：" + mark);
    var url = "";
    if (type == "植被实习点" && OBJECTID == "2") {//植被实习点2_2  大有村
        url = base_url + "resource/Photo_SphereViewer/example/Plant01.html";
    } else if (type == "植被实习点" && OBJECTID == "3") {//植被实习点2_1  往三里亭路上
        url = base_url + "resource/Photo_SphereViewer/example/Plant021.html";
    } else if (type == "植被实习点" && OBJECTID == "1") {//植被实习点1  禅源寺前
        url = base_url + "resource/Photo_SphereViewer/example/Plant022.html";
    } else if (type == "土壤实习点" && OBJECTID == "1") {//土壤剖面1
        url = base_url + "resource/Photo_SphereViewer/example/Soil01.html";
    } else if (type == "土壤实习点" && OBJECTID == "2") {//土壤剖面2
        url = base_url + "resource/Photo_SphereViewer/example/Soil02.html";
    } else if (type == "地貌实习点" && mark == "浮玉山庄——") {//地貌实习点1
        url = base_url + "resource/Photo_SphereViewer/example/Land01.html";
    } else if (type == "地貌实习点" && mark == "朱陀岭水库西") {//地貌实习点2
        url = base_url + "resource/Photo_SphereViewer/example/Land02.html";
    } else if (type == "土地利用") {
        url = base_url + "resource/Photo_SphereViewer/example/Water.html";
    } else {
        url = "";
    }
    window.open(url, "_blank");
}

//打开视频
function popVideo() {
    var OBJECTID = popupFeature.graphic.attributes.OBJECTID;
    var mark = popupFeature.graphic.attributes.说明;
    var type = popupFeature.graphic.layer.title;
    var url = "";
    if (type == "植被实习点") {
        url = base_url + "resource/Videos/video_plant01.html";
    } else if (type == "土壤实习点" && OBJECTID == "1") {
        url = base_url + "resource/Videos/video_soil01.html";
    } else if (type == "土壤实习点" && OBJECTID == "2") {
        url = base_url + "resource/Videos/video_soil02.html";
    } else if (name == "地貌剖面1") {
        url = "";
    } else if (name == "地貌剖面2") {
        url = "";
    } else if (name == "土地利用") {
        url = "";
    }
    window.open(url, "_blank");
}

//展示地貌
function showLand() {
    $("#div_roam").css("display", "none");
    $("#div_land").css("display", "inline-block");
    $("#div_water").css("display", "none");
    $("#div_plant").css("display", "none");
    $("#div_soil").css("display", "none");
    $("#div_RSimgs").css("display", "none");
}

//展示水文
function showWater() {
    $("#div_roam").css("display", "none");
    $("#div_land").css("display", "none");
    $("#div_water").css("display", "inline-block");
    $("#div_plant").css("display", "none");
    $("#div_soil").css("display", "none");
    $("#div_RSimgs").css("display", "none");
}

//展示植被
function showPlant() {
    $("#div_roam").css("display", "none");
    $("#div_land").css("display", "none");
    $("#div_water").css("display", "none");
    $("#div_plant").css("display", "inline-block");
    $("#div_soil").css("display", "none");
    $("#div_RSimgs").css("display", "none");
}

//展示土壤
function showSoil() {
    $("#div_roam").css("display", "none");
    $("#div_land").css("display", "none");
    $("#div_water").css("display", "none");
    $("#div_plant").css("display", "none");
    $("#div_soil").css("display", "inline-block");
    $("#div_RSimgs").css("display", "none");
}

//展示虚拟漫游
function showRoam() {
    $("#div_roam").css("display", "inline-block");
    $("#div_land").css("display", "none");
    $("#div_water").css("display", "none");
    $("#div_plant").css("display", "none");
    $("#div_soil").css("display", "none");
    $("#div_RSimgs").css("display", "none");
}

function closeItem(item) {
    switch (item) {
        case "虚拟漫游":
            $("#div_roam").css("display", "none");
            break;
        case "地貌":
            $("#div_land").css("display", "none");
            break;
        case "水文":
            $("#div_water").css("display", "none");
            break;
        case "植被":
            $("#div_plant").css("display", "none");
            break;
        case "土壤":
            $("#div_soil").css("display", "none");
            break;
        case "遥感":
            $("#div_RSimgs").css("display", "none");
            break;

    }
}

function getDivPosition(div) {
    var x = div.getBoundingClientRect().left;
    var y = div.getBoundingClientRect().top;
    return { x: x, y: y };
}