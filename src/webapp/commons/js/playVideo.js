$(function () {
    //全屏幕播放
    function launchFullScreen(element) {
        if (element.requestFullScreen) {
            element.requestFullScreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        }
    }

    function linkApp(url) {
        window.open(url, "_blank");
    };

    $('#video').css("controls width","1000");
});
