var base_url = "http://122.112.231.165/TMS/src/webapp/";

//去掉所有的html标记
function delHtmlTag(str){
    return str.replace(/<[^>]+>/g,"");
}


var dataMapTime,soilTime,plantTime,totalTime;
var count_dataMap = 0,count_plant = 0,count_soil = 0;
var timer_dataMap = null,timer_plant = null,timer_soil = null;
function onMenuClicked() {
    //记录“认识实习区域”时间
    if($('#iframe').css('display') == 'inline-block'
        && $('#iframe_ZB').css('display') == 'none'
        && $('#iframe_TR').css('display') == 'none'
        && $('#iframe_others').css('display') == 'none'){
        console.log("当前页面为：iframe-dataMap");
        //开始计数
        timer_dataMap = setInterval(function() {count_dataMap++;}, 1000);
        dataMapTime = transferToMin(count_dataMap);
        sessionStorage.setItem("dataMapTime",dataMapTime);
    }
    else {
        //暂停计数
        clearInterval(timer_dataMap);
        dataMapTime = transferToMin(count_dataMap);
        sessionStorage.setItem("dataMapTime",dataMapTime);
    }

    //记录植被时间
    if ($('#iframe_ZB').css('display') == 'inline-block') {
        console.log("当前页面为：iframe_ZB");
        //开始计数
        timer_plant = setInterval(function() {count_plant++;}, 1000);
        plantTime = transferToMin(count_plant);
        sessionStorage.setItem("plantSceneTime",plantTime);
    }
    else {
        //暂停计数
        clearInterval(timer_plant);
        plantTime = transferToMin(count_plant);
        sessionStorage.setItem("plantSceneTime",plantTime);
    }

    //记录土壤时间
    if ($('#iframe_TR').css('display') == 'inline-block') {
        console.log("当前页面为：iframe_TR");
        //开始计数
        timer_soil = setInterval(function() {
            count_soil++;
        }, 1000);
        soilTime = transferToMin(count_soil);
        sessionStorage.setItem("soilSceneTime",soilTime);
    }
    else {
        //暂停计数
        clearInterval(timer_soil);
        soilTime = transferToMin(count_soil);
        sessionStorage.setItem("soilSceneTime",soilTime);
    }

    //记录水文时间


    if ($('#iframe_others').css('display') == 'inline-block') {
        console.log("当前页面为：iframe_others");
    }

    totalTime = transferToMin(count_dataMap + count_plant + count_soil);
    sessionStorage.setItem("totalTime",totalTime);
}
//将秒转为分
function transferToMin(seconds) {
    var min = 0;
    min = fomatFloat(seconds / 60,1);
    return min;
}
// num为传入的值，n为保留的小数位
function fomatFloat(num,n){
    var f = parseFloat(num);
    if(isNaN(f)){
        return false;
    }
    f = Math.round(num*Math.pow(10, n))/Math.pow(10, n); // n 幂
    var s = f.toString();
    var rs = s.indexOf('.');
    //判定如果是整数，增加小数点再补0
    if(rs < 0){
        rs = s.length;
        s += '.';
    }
    while(s.length <= rs + n){
        s += '0';
    }
    return s;
}

//获取用户填的值
function confirmTable() {
    sessionStorage.setItem("bamboo_min", $("#bamboo_min").val());
    sessionStorage.setItem("bamboo_max", $("#bamboo_max").val());
    sessionStorage.setItem("green_min", $("#green_min").val());
    sessionStorage.setItem("green_max", $("#green_max").val());
    sessionStorage.setItem("greenFall_min", $("#greenFall_min").val());
    sessionStorage.setItem("greenFall_max", $("#greenFall_max").val());
    sessionStorage.setItem("fall_min", $("#fall_min").val());
    sessionStorage.setItem("fall_max", $("#fall_max").val());
    alert("数据已记录！")
}

//地图页面表格自动填充
function initTable_dataMap() {
    document.getElementById("bamboo_min").innerHTML = sessionStorage.getItem("bamboo_min") == null ? "" : sessionStorage.getItem("bamboo_min");
    document.getElementById("bamboo_max").innerHTML = sessionStorage.getItem("bamboo_max") == null ? "" : sessionStorage.getItem("bamboo_max");
    document.getElementById("green_min").innerHTML = sessionStorage.getItem("green_min") == null ? "" : sessionStorage.getItem("green_min");
    document.getElementById("green_max").innerHTML = sessionStorage.getItem("green_max") == null ? "" : sessionStorage.getItem("green_max");
    document.getElementById("greenFall_min").innerHTML = sessionStorage.getItem("greenFall_min") == null ? "" : sessionStorage.getItem("greenFall_min");
    document.getElementById("greenFall_max").innerHTML = sessionStorage.getItem("greenFall_max") == null ? "" : sessionStorage.getItem("greenFall_max");
    document.getElementById("fall_min").innerHTML = sessionStorage.getItem("fall_min") == null ? "" : sessionStorage.getItem("fall_min");
    document.getElementById("fall_max").innerHTML = sessionStorage.getItem("fall_max") == null ? "" : sessionStorage.getItem("fall_max");
}

//实验报告页面表格自动填充
function initTable_report() {
    document.getElementById("bamboo_min_report").innerHTML = sessionStorage.getItem("bamboo_min");
    document.getElementById("bamboo_max_report").innerHTML = sessionStorage.getItem("bamboo_max");
    document.getElementById("green_min_report").innerHTML = sessionStorage.getItem("green_min");
    document.getElementById("green_max_report").innerHTML = sessionStorage.getItem("green_max");
    document.getElementById("greenFall_min_report").innerHTML = sessionStorage.getItem("greenFall_min");
    document.getElementById("greenFall_max_report").innerHTML = sessionStorage.getItem("greenFall_max");
    document.getElementById("fall_min_report").innerHTML = sessionStorage.getItem("fall_min");
    document.getElementById("fall_max_report").innerHTML = sessionStorage.getItem("fall_max");

    //填充时间（每个区域浏览时间）
    document.getElementById('tb_dataMapTime').innerHTML = sessionStorage.getItem('dataMapTime');
    document.getElementById('tb_plantTime').innerHTML = sessionStorage.getItem('plantSceneTime');
    document.getElementById('tb_soilTime').innerHTML = sessionStorage.getItem('soilSceneTime');
    document.getElementById('tb_totalTime').innerHTML = sessionStorage.getItem('totalTime');

    //填充土壤调查表
    if(sessionStorage.getItem('soil')){
        var soil = JSON.parse(sessionStorage.getItem('soil'));
        initTableSoil(soil);
    }

}

//下载实验报告
function downloadReport() {
    var downURL = base_url + "resource/Report.docx";
    var elemIF = document.createElement("iframe");
    elemIF.src = downURL;
    elemIF.style.display = "none";
    document.body.appendChild(elemIF);
}


//土壤实习中用户点击“查看表格”，传递数据到前端
function passSoilToWeb(para) {
    sessionStorage.setItem("soil",para);
}

//填充土壤调查表
function initTableSoil(soil) {
    //采集土壤
    if(soil.collection == "Y"){
        document.getElementById('soil_Collect').innerHTML = "从下至上";
        document.getElementById('soil_Collect_answer').innerHTML = "正确";
    }else {
        document.getElementById('soil_Collect').innerHTML = "从上至下";
        document.getElementById('soil_Collect_answer').innerHTML = "错误";
    }

    //土壤颜色
    var arr = soil.color.split('-');
    document.getElementById('soil_Color').innerHTML = "第" + arr[0] + "行，第" + arr[1] + "列";
    if(soil.color == "4-3"){
        document.getElementById('soil_Color_answer').innerHTML = "正确";
    }else {
        document.getElementById('soil_Color_answer').innerHTML = "错误";
    }

    //土壤质地  黏土
    document.getElementById('soil_Texture').innerHTML = getTexture(soil.texture);
    if(soil.texture == "02"){
        document.getElementById('soil_Texture_answer').innerHTML = "正确";
    }else {
        document.getElementById('soil_Texture_answer').innerHTML = "错误";
    }

    //土壤结构   团粒状
    document.getElementById('soil_Structure').innerHTML = getStructure(soil.structure);
    if(soil.structure == "01"){
        document.getElementById('soil_Structure_answer').innerHTML = "正确";
    }else {
        document.getElementById('soil_Structure_answer').innerHTML = "错误";
    }

    //土壤松紧度   松散
    document.getElementById('soil_Tightness').innerHTML = getTightness(soil.tightness);
    if(soil.tightness == "01"){
        document.getElementById('soil_Tightness_answer').innerHTML = "正确";
    }else {
        document.getElementById('soil_Tightness_answer').innerHTML = "错误";
    }

    //土壤干湿度 潮润
    document.getElementById('soil_DryHumidity').innerHTML = getDryHumidity(soil.dryHumidity);
    if(soil.dryHumidity == "03"){
        document.getElementById('soil_DryHumidity_answer').innerHTML = "正确";
    }else {
        document.getElementById('soil_DryHumidity_answer').innerHTML = "错误";
    }

    //土壤根系 多-少-无
    var arr_root = soil.roots.split('-');
    document.getElementById('soil_Root').innerHTML = "A层:" + arr_root[0] +
        "&nbsp;&nbsp;&nbsp;" +"B层:" +arr_root[1] +  "&nbsp;&nbsp;&nbsp;" +"C层:" + arr_root[2];
    if(soil.roots == "多-少-无"){
        document.getElementById('soil_Root_answer').innerHTML = "正确";
    }else {
        document.getElementById('soil_Root_answer').innerHTML = "错误";
    }

    //pH值
    document.getElementById('soil_pH').innerHTML = soil.pH;
    if(soil.pH == "6"){
        document.getElementById('soil_pH_answer').innerHTML = "正确";
    }else {
        document.getElementById('soil_pH_answer').innerHTML = "错误";
    }

}
//土壤质地
function getTexture(code) {
    var result = "";
    if(code == "01"){
        result = "壤土";
    }else if(code == "02"){
        result = "黏土";
    }else {
        result = "砂土";
    }
    return result;
}
//土壤结构
function getStructure(code) {
    var result = "";
    if(code == "01"){
        result = "团粒状";
    }else if(code == "02"){
        result = "团块状";
    }else {
        result = "粒状";
    }
    return result;
}
//土壤松紧度
function getTightness(code) {
    var result = "";
    if(code == "01"){
        result = "松散";
    }else if(code == "02"){
        result = "疏松";
    }else {
        result = "紧实";
    }
    return result;
}
//土壤干湿度
function getDryHumidity(code) {
    var result = "";
    if(code == "01"){
        result = "湿润";
    }else if(code == "02"){
        result = "润";
    }else {
        result = "潮润";
    }
    return result;
}



//将base64的图片填充进实验报告页面（暂时未成功）
function initImg(url) {
    $('#img_report').attr('src',url);
    //window.parent.frames['experimentReport'].location.reload();
    console.log("图片地址：" + url);
}
