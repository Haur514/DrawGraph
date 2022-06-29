
// 指定した円をクリアする関数
var clearCircle = function(order_from_the_outside){
    let ctx = canvas[order_from_the_outside].getContext("2d");
    ctx.clearRect(0,0,canvas_width,canvas_height);
}

// 円の中心角の大きさ，外から何番目の円かを指定．指定された円を描く．
var drawCircle = function(degree,order_from_the_outside){
    clearCircle(order_from_the_outside);
    let max_radius_of_the_circle =Math.min(canvas_width,canvas_height)/2-10;
    let ctx = canvas[order_from_the_outside].getContext("2d");
    let radius = max_radius_of_the_circle-order_from_the_outside*max_radius_of_the_circle*circle_haba;
    let radius_of_inside_circle = get_radius_of_inside_circle(order_from_the_outside);
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
    ctx.fillStyle = "white";
    ctx.strokeStyle="white";
    ctx.fill();
    ctx.lineWidth=5;
    ctx.stroke();
}

// 円の中央の白色部分の半径
var get_radius_of_inside_circle = function(order_from_the_outside){
    let max_radius_of_the_circle =Math.min(canvas_width,canvas_height)/2-10;
    return (MAX_NUM_OF_CIRCLE-order_from_the_outside) != 0 ? max_radius_of_the_circle-(order_from_the_outside+1)*max_radius_of_the_circle*circle_haba: 0;
}

// degree -> radian 12時の方向を起点とした角度に変換
var translate_radian_from_degree = function(deg){
    return Math.PI*2* (deg%360)/360 - Math.PI/2;
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
    let red_ratio;
    let blue_ratio;
    if(parseInt(ratio)%2 == 0){
        red_ratio = ratio%1;
        blue_ratio = 1-ratio%1;
    }else if(parseInt(ratio)%2 == 1){
        red_ratio = 1-ratio%1;
        blue_ratio = ratio%1;
    }
    let red = 255*red_ratio;
    let blue = 255*blue_ratio;
    let green = 0;
    return "rgb("+String(red)+","+String(green)+","+String(blue)+",0.8)";
}

// canvas[3]のキャンバスの中央に経過時間をテキストで表示
var show_passed_time_label = function(str){
    let ctx = canvas[3].getContext("2d");
    
    ctx.fillStyle = 'black';
    ctx.textAlign = "center";
    // 経過時間を表示
    ctx.font = 'bold '+String(middle_font_size)+'pt Arial';
    ctx.fillText("Elapsed",canvas_width/2,canvas_height/2-large_font_size-middle_font_size-small_font_size);
    ctx.fillText("Remaining",canvas_width/2,canvas_height/2+small_font_size);


    ctx.font = 'bold '+String(large_font_size)+'pt Arial';
    ctx.fillText(str,canvas_width/2,canvas_height/2-middle_font_size);
    ctx.fillText(trans_ms_to_str_hms(get_remaining_time()),canvas_width/2,canvas_height/2+large_font_size+middle_font_size+small_font_size);

    // // 残り時間を表示
    // ctx.font = 'bold 15pt Arial';
    // ctx.font = 'bold 30pt Arial';
}

// canvas[3]に，テキストを追加する．それぞれの円の示す内容を記す．
var describe_what_each_circle_represents = function(){
    let ctx = canvas[3].getContext("2d");
    ctx.font = 'bold '+String(small_font_size)+'pt Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.fillText("remaining",canvas_width/2,canvas_height/2-get_radius_of_inside_circle(0)-5);
    ctx.fillText("second",canvas_width/2,canvas_height/2-get_radius_of_inside_circle(1)-5);
    ctx.fillText("minute",canvas_width/2,canvas_height/2-get_radius_of_inside_circle(2)-5);
    ctx.fillText("hour",canvas_width/2,canvas_height/2-get_radius_of_inside_circle(3)-5);
}