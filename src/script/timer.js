// // start_dateから何ms経過したか返す．
var get_passed_mili_seconds = function(){
    if(is_timer_running){
        return (get_time_since_latest_start_btn_pressed()+old_passed_time);
    }else{
        return old_passed_time;
    }
}

// 直近のstartボタンが押された時間から経過した時間を返す．
var get_time_since_latest_start_btn_pressed = function(){
    let cur_date = new Date();
    return (cur_date.getHours()-start_date.getHours())*3600000+(cur_date.getMinutes()-start_date.getMinutes())*60000+(cur_date.getSeconds()-start_date.getSeconds())*1000+(cur_date.getMilliseconds()-start_date.getMilliseconds());
}

// ms -> str(h:m:s) 表記に変換
var trans_ms_to_str_hms = function(ms){
    return String(get_hour(ms)).padStart(2,'0') + ":" + String(get_minute(ms)).padStart(2,'0') + ":" + String(get_second(ms)).padStart(2,'0');
}

// ms -> h:m:s 形式にした時の，h,m,sをそれぞれ返す．
var get_hour = function(ms){
    return Math.floor((ms+10)/3600000)%24;
}
var get_minute = function(ms){
    let m = ms % 3600000;
    return Math.floor((m+1000)/60000);
}
var get_second = function(ms){
    let m = ms % 3600000;
    m = m % 60000;
    return Math.ceil((m)/1000)%60;
}

var translate_hourminutesecond_to_seconds = function(hms){
    return hms[0]*3600+hms[1]*60+hms[2];
}

// 残り時間[ms]を返す．
var get_remaining_time = function(){
    return translate_hourminutesecond_to_seconds(measure_time)*1000-get_passed_mili_seconds();
}
