// // start_dateから何ms経過したか返す．
var get_passed_mili_seconds = function(start_date){
    if(is_timer_running){
        console.log(is_timer_running);
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