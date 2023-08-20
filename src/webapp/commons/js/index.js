$(".leftsidebar_box dt").css({ "background-color": "#1b2431" });
$(".main_img").attr("src", "commons/image/index/select_xl01.png");
$(function () {
    initToolbar();
    changeIframe('平台介绍');
    //延迟1s执行加载三维场景
    //先加载三维场景就没问题，若先点击其他地方，再加载场景（尤其是植被）就会报错
    // setTimeout(function () {
    //     $("#iframe_ZB").attr("src","./plantSurvey.html");
    //     $("#iframe_TR").attr("src","./soilSurvey.html");
    //     $("#iframe_Water").attr("src","./waterSurvey.html");
    // },10000);

    setIframeHeight($('#iframe'));
    setIframeHeight($('#iframe_ZB'));
    setIframeHeight($('#iframe_TR'));
    // setIframeHeight($('#iframe_Water'));
    setIframeHeight($('#iframe_others'));
});

function setIframeHeight(iframe) {
    if (iframe) {
        var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
        if (iframeWin.document.body) {
            iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
        }
    }
};


//主页左侧下拉菜单
function initToolbar() {
    $(".leftsidebar_box .main_dd").hide();
    $(".leftsidebar_box .middle_dd").hide();
    $(".leftsidebar_box .child_dd").hide();
    /*主下拉框控制*/
    $(".main_dt").click(function () {
        $(".main_dt").css({ "background-color": "#1b2431" });
        $(this).css({ "background-color": "#214f61" });
        $(this).parent().find('.main_dd').removeClass("menu_chioce");
        $(this).parent().find('.middle_dd').removeClass("menu_chioce");
        //下拉菜单切换右侧箭头
        if ($(this).parent().find('.main_img').length > 0) {
            if ($(this).parent().find('.main_img').attr('src').indexOf("select_xl01") > 0) {
                $(this).parent().find('.main_img').attr("src", "commons/image/index/select_xl.png");
            } else {
                $(this).parent().find('.main_img').attr("src", "commons/image/index/select_xl01.png");
            }
        }
        $(".menu_chioce").slideUp();
        $(this).parent().find('.main_dd').slideToggle();//打开对应子菜单
        $(this).parent().find('.middle_dd').slideToggle();//打开对应子菜单
        // $(this).parent().find('.main_dd').addClass("menu_chioce");  //切换菜单隐藏菜单栏
    });
    /*子下拉框控制*/
    $(".child_dt").click(function () {
        $(".child_dt").css({ "background-color": "#1b2431" });
        $(this).parent().find('.middle_dd').css({ "background-color": "#214f61" });
        $(this).parent().find('.child_dd').removeClass("menu_chioce");
        $(".menu_chioce").slideUp();
        $(this).parent().find('.child_dd').slideToggle();//打开对应子菜单
        $(this).parent().find('.child_dd').addClass("menu_chioce");  //切换菜单隐藏菜单栏
    });
}
//左侧菜单栏隐藏/显示控制
function menuController() {
    $("#leftbar").toggleClass("leftsidebar_box_hide");
    $("#btn_popup").toggleClass("btn_left_hide");
    $("#right_part").toggleClass("right_fullfill");
}


function changeIframe(menuName) {
    var childWindow = $("#iframe")[0].contentWindow;//获取子窗体的window对象.
    switch (menuName) {
        case "基本情况":
            $("#iframe_others").css("display", "inline-block");
            $("#iframe_others").attr("src", "./basicInfo.html");
            $("#iframe").css("display", "none");
            $("#iframe_ZB").css("display", "none");
            $("#iframe_TR").css("display", "none");
            $("#iframe_Water").css("display", "none");
            break;
        case "平台介绍":
            $("#iframe_others").css("display", "inline-block");
            $("#iframe_others").attr("src", "./introduction.html");
            $("#iframe").css("display", "none");
            $("#iframe_ZB").css("display", "none");
            $("#iframe_TR").css("display", "none");
            $("#iframe_Water").css("display", "none");
            break;
        case "平台操作步骤":
            $("#iframe_others").css("display", "inline-block");
            $("#iframe_others").attr("src", "./operation.html");
            $("#iframe").css("display", "none");
            $("#iframe_ZB").css("display", "none");
            $("#iframe_TR").css("display", "none");
            $("#iframe_Water").css("display", "none");
            break;
        case "虚拟漫游":
            $("#iframe").css("display", "inline-block");
            $("#iframe_ZB").css("display", "none");
            $("#iframe_TR").css("display", "none");
            $("#iframe_Water").css("display", "none");
            $("#iframe_others").css("display", "none");
            childWindow.showRoam();
            break;
        case "地貌":
            $("#iframe").css("display", "inline-block");
            $("#iframe_ZB").css("display", "none");
            $("#iframe_TR").css("display", "none");
            $("#iframe_Water").css("display", "none");
            $("#iframe_others").css("display", "none");
            childWindow.showLand();
            break;
        case "水文":
            $("#iframe").css("display", "inline-block");
            $("#iframe_ZB").css("display", "none");
            $("#iframe_TR").css("display", "none");
            $("#iframe_Water").css("display", "none");
            $("#iframe_others").css("display", "none");
            childWindow.showWater();
            break;
        case "植被":
            $("#iframe").css("display", "inline-block");
            $("#iframe_ZB").css("display", "none");
            $("#iframe_TR").css("display", "none");
            $("#iframe_Water").css("display", "none");
            $("#iframe_others").css("display", "none");
            childWindow.showPlant();
            break;
        case "土壤":
            $("#iframe").css("display", "inline-block");
            $("#iframe_ZB").css("display", "none");
            $("#iframe_TR").css("display", "none");
            $("#iframe_Water").css("display", "none");
            $("#iframe_others").css("display", "none");
            childWindow.showSoil();
            break;
        case "多时相遥感图像":
            $("#iframe_others").css("display", "inline-block");
            $("#iframe_others").attr("src", "./swipelayer.html");
            $("#iframe").css("display", "none");
            $("#iframe_ZB").css("display", "none");
            $("#iframe_TR").css("display", "none");
            $("#iframe_Water").css("display", "none");
            break;
        case "植被样方调查":
            $("#iframe").css("display", "none");
            $("#iframe_ZB").css("display", "inline-block");
            $("#iframe_ZB").attr("src", "./plantSurvey.html");//加载三维场景
            $("#iframe_TR").css("display", "none");
            $("#iframe_others").css("display", "none");
            break;
        case "土壤剖面观测":
            $("#iframe").css("display", "none");
            $("#iframe_ZB").css("display", "none");
            $("#iframe_TR").css("display", "inline-block");
            $("#iframe_TR").attr("src", "./soilSurvey.html");//加载三维场景
            $("#iframe_Water").css("display", "none");
            $("#iframe_others").css("display", "none");
            break;
        case "水文实习":
            $("#iframe").css("display", "none");
            $("#iframe_ZB").css("display", "none");
            $("#iframe_TR").css("display", "none");
            $("#iframe_Water").css("display", "inline-block");
            $("#iframe_others").css("display", "none");
            break;
        case "移动GIS应用":
            $("#iframe_others").css("display", "inline-block");
            $("#iframe_others").attr("src", "./mobileGIS.html");
            $("#iframe").css("display", "none");
            $("#iframe_ZB").css("display", "none");
            $("#iframe_TR").css("display", "none");
            $("#iframe_Water").css("display", "none");
            break;
        case "植被群落演替":
            $("#iframe_others").css("display", "inline-block");
            $("#iframe_others").attr("src", "./loading.html");
            $("#iframe").css("display", "none");
            $("#iframe_ZB").css("display", "none");
            $("#iframe_TR").css("display", "none");
            $("#iframe_Water").css("display", "none");
            break;
        case "地貌演变":
            $("#iframe_others").css("display", "inline-block");
            $("#iframe_others").attr("src", "./loading.html");
            $("#iframe").css("display", "none");
            $("#iframe_ZB").css("display", "none");
            $("#iframe_TR").css("display", "none");
            $("#iframe_Water").css("display", "none");
            break;
        case "土地利用变化与预测":
            $("#iframe_others").css("display", "inline-block");
            $("#iframe_others").attr("src", "./landusePrediction.html");
            $("#iframe").css("display", "none");
            $("#iframe_ZB").css("display", "none");
            $("#iframe_TR").css("display", "none");
            $("#iframe_Water").css("display", "none");
            break;
        case "在线填写":
            $("#iframe_others").css("display", "inline-block");
            $("#iframe_others").attr("src", "./experimentReport.html");
            $("#iframe").css("display", "none");
            $("#iframe_ZB").css("display", "none");
            $("#iframe_TR").css("display", "none");
            $("#iframe_Water").css("display", "none");
            break;
        case "天目山主要植物介绍":
            $("#iframe_others").css("display", "inline-block");
            $("#iframe_others").attr("src", "./trees3/天目山.html");
            $("#iframe").css("display", "none");
            $("#iframe_ZB").css("display", "none");
            $("#iframe_TR").css("display", "none");
            $("#iframe_Water").css("display", "none");
            break;
        case "植物小测试":
            $("#iframe_others").css("display", "inline-block");
            $("#iframe_others").attr("src", "./quiz/quiz.html");
            $("#iframe").css("display", "none");
            $("#iframe_ZB").css("display", "none");
            $("#iframe_TR").css("display", "none");
            $("#iframe_Water").css("display", "none");
            break;
        case "系统维护":
            $("#iframe_others").css("display", "inline-block");
            $("#iframe_others").attr("src", "./systemMaintenance.html");
            $("#iframe").css("display", "none");
            $("#iframe_ZB").css("display", "none");
            $("#iframe_TR").css("display", "none");
            $("#iframe_Water").css("display", "none");
            break;
        case "数据下载":
            $("#iframe_others").css("display", "inline-block");
            $("#iframe_others").attr("src", "./datadownload/datadownload.html");
            $("#iframe").css("display", "none");
            $("#iframe_ZB").css("display", "none");
            $("#iframe_TR").css("display", "none");
            $("#iframe_Water").css("display", "none");
            break;
    }
}
window.changeIframe = changeIframe;

