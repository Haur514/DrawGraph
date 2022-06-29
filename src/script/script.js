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
        if(!is_timer_running && measure_time != null){
            start_date = new Date();
            is_timer_running = true;
            run();
        }
    });

    let stop_btn = document.getElementById("stop_btn");
    stop_btn.addEventListener("click",function(){
        if(is_timer_running){
        old_passed_time += get_time_since_latest_start_btn_pressed(start_date);
            is_timer_running = false;
        }
    });

    let reset_btn = document.getElementById("reset_btn");
    reset_btn.addEventListener("click",function(){
        old_passed_time = 0;
        start_date = new Date();
    });
}

var canvas;
var start_date;
var passed_time_label;
// [hour,minute,second] list
var measure_time;
var passed_mili_seconds;

// 円の太さ
var circle_haba = 0.12

// 直前にSTOPが押されるまでに経過していた時間[ms]
var old_passed_time = 0;

var current_passed_mili_seconds;
let is_timer_running = false;
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
    update_time_label();
    describe_what_each_circle_represents();
    if(get_remaining_time() < 0){
        console.log(get_remaining_time());
        is_timer_running = false;
        old_passed_time = 0;
    }
}

// 経過時間を記録
var update_time_label = function(){
    let passed_second = get_passed_mili_seconds()/1000;
    let str_passed_time = String(parseInt(passed_second/3600)).padStart(2,'0')+":"+String(parseInt((passed_second%3600)/60)).padStart(2,'0')+":"+String(parseInt(passed_second%60)).padStart(2,'0');
    show_passed_time_label(str_passed_time);
}

// 経過時間を[h,m,s]で返す．


var clock = function(){
    passed_mili_seconds = get_passed_mili_seconds();

    drawCircle(get_degree_of_outside_circle(passed_mili_seconds),0);
    drawCircle((((passed_mili_seconds/1000)%60)/60*360)%360,1);
    drawCircle((((passed_mili_seconds/1000)%3600)/3600*360)%360,2);
    drawCircle((((passed_mili_seconds/1000)%86400)/86400*360)%360,3);
}




