
window.onload = function(){
    canvas = document.getElementsByClassName("canvas");
    passed_time_label = document.getElementById("passed_time_label");
    let measure_time_label = document.getElementById("measure_time_label");

    measure_time_label.addEventListener("input",function(){
        measure_time = measure_time_label.value.split(':');
        if (measure_time[2] === undefined) measure_time[2] = '00'
        measure_time = measure_time.map(Number);
        console.log(measure_time)
    });

    let start_btn = document.getElementById("start_btn");
    start_btn.addEventListener("click",function(){
        // console.log(measure_time);
        start_date = new Date();
        run();
    });
}

var canvas;
var start_date;
var passed_time_label;
// [hour,minute,second] list
var measure_time;
canvas_width=500;
canvas_height=500;
time = 0;

MAX_NUM_OF_CIRCLE = 4;
max_radius_of_the_circle =Math.min(canvas_width,canvas_height)/2-10;



COLOR_CIRCLE = ["#FFDEAD","#D2B48C","#FF8C00","#CD853F"]

var run = function(){
    setInterval(draw_update,10);
}

var draw_update = function(){
    clock();
}

var clock = function(){
    let cur_date = new Date();
    passed_mili_seconds = ((cur_date.getHours()-start_date.getHours())*3600000+(cur_date.getMinutes()-start_date.getMinutes())*60000+(cur_date.getSeconds()-start_date.getSeconds())*1000+(cur_date.getMilliseconds()-start_date.getMilliseconds()));
    time += 1;
    if((cur_date.getSeconds()-start_date.getSeconds() == 0)){
        clearCircle(1)
    }
    if((cur_date.getMinutes()-start_date.getMinutes()) == 0){
        clearCircle(2)
    }
    if((cur_date.getHours()-start_date.getHours()) == 0){
        clearCircle(3)
    }


    drawCircle(get_degree_of_outside_circle(passed_mili_seconds),0);
    drawCircle((((passed_mili_seconds/1000)%60)/60*360)%360,1);
    drawCircle((((passed_mili_seconds/1000)%3600)/3600*360)%360,2);
}


// 指定した円をクリアする関数
var clearCircle = function(order_from_the_outside){
    let ctx = canvas[order_from_the_outside].getContext("2d");
    ctx.clearRect(0,0,canvas_width,canvas_height);
}

// 円の中心角の大きさ，外から何番目の円かを指定．指定された円を描く．
var drawCircle = function(degree,order_from_the_outside){
    let ctx = canvas[order_from_the_outside].getContext("2d");
    let radius = max_radius_of_the_circle*(MAX_NUM_OF_CIRCLE-order_from_the_outside)/MAX_NUM_OF_CIRCLE;
    let radius_of_inside_circle = (MAX_NUM_OF_CIRCLE-order_from_the_outside) != 0 ? max_radius_of_the_circle*((MAX_NUM_OF_CIRCLE-order_from_the_outside)-1)/MAX_NUM_OF_CIRCLE : 0;
    //外円の描画
    ctx.beginPath();
    ctx.moveTo(canvas_width/2,canvas_height/2);
    ctx.arc(canvas_width/2,canvas_height/2,radius,-Math.PI/2,translate_radian_from_degree(degree),false);
    ctx.closePath();
    if(order_from_the_outside==0){
        ctx.fillStyle = get_color_of_outside_circle(ratio_of_passed_time(passed_mili_seconds));
    }else{
        ctx.fillStyle = COLOR_CIRCLE[(MAX_NUM_OF_CIRCLE-order_from_the_outside)-1]
    }
    ctx.fill();
    //内円の描画
    ctx.beginPath();
    ctx.moveTo(canvas_width/2,canvas_height/2);
    ctx.arc(canvas_width/2,canvas_height/2,radius_of_inside_circle,-Math.PI/2,translate_radian_from_degree(degree),false);
    ctx.closePath();
    ctx.fillStyle = "white"
    ctx.fill();
}

// degree -> radian 12時の方向を起点とした角度に変換
var translate_radian_from_degree = function(deg){
    return Math.PI*2* (deg%360)/360 - Math.PI/2;
}

var translate_hourminutesecond_to_seconds = function(hms){
    return hms[0]*3600+hms[1]*60+hms[2];
}

// 入力された計測時間の何割が実行されたかを返す．
var ratio_of_passed_time = function(passed_mili_seconds){
    return (passed_mili_seconds/1000)/translate_hourminutesecond_to_seconds(measure_time);
}

// 最も外側の円の中心角を返す．
var get_degree_of_outside_circle=function(passed_mili_seconds){
    return ratio_of_passed_time(passed_mili_seconds,translate_hourminutesecond_to_seconds(measure_time))*360;
}

// 最も外側の円の色を返す．
var get_color_of_outside_circle=function(ratio){
    let red = 255*ratio;
    let blue = 255*(1-ratio);
    return "rgb("+String(red)+",0,"+String(blue)+",0.8)";
}

