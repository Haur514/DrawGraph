window.onload = function(){
    canvas_field = document.getElementById("canvas_field");
    canvas = document.getElementsByClassName("canvas");
    resize_canvas(canvas);
    passed_time_label = document.getElementById("passed_time_label");
    let measure_time_label = document.getElementById("measure_time_label");

    canvas_width = get_canvas_size();
    canvas_height = get_canvas_size();

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
        is_timer_running = false;
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
var canvas_width = 500;
var canvas_height = 500;
time = 0;

MAX_NUM_OF_CIRCLE = 4;

var large_font_size;
var middle_font_size;
var small_font_size;


COLOR_CIRCLE = ["#FFDEAD","#D2B48C","#FF8C00","#CD853F"]


// canvasのサイズを画面のサイズに動的に合わせる．
var resize_canvas = function(){
    if(canvas_width === get_canvas_size() && canvas_height === get_canvas_size()){
        return;
    }
    canvas_width = get_canvas_size();
    canvas_height = get_canvas_size();
    let canvas = document.getElementsByClassName("canvas");
    for(let i = 0;i < canvas.length;i++){
        canvas[i].width = get_canvas_size();
        canvas[i].height = get_canvas_size();
    }
    let lower_part = document.getElementById("lower_part");
    lower_part.style.top = (get_canvas_size()+10)+'px';
    lower_part.style.fontSize=get_canvas_size()/15;

    let input_label = document.getElementById("measure_time_label");
    input_label.style.width = get_canvas_size()/2;
    input_label.style.height = get_canvas_size()/9;
    input_label.style.fontSize = get_canvas_size()/15;

    let btns = document.getElementsByClassName("btn")
    for(let i = 0;i < btns.length;i++){
        btns[i].style.fontSize = get_canvas_size()/15;
        btns[i].style.width = get_canvas_size()/3-20;
    }

    large_font_size = get_canvas_size()/15;
    middle_font_size = large_font_size/2;
    small_font_size = middle_font_size/3*2;
}

var run = function(){
    setInterval(draw_update,10);
}

var draw_update = function(){
    resize_canvas();
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


var get_canvas_size = function(){
    return Math.min(window.innerWidth,window.innerHeight*0.7);
}