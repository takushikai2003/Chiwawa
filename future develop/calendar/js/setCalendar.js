const calendar_tbody = document.getElementById("calendar_tbody");
let _start_day_of_week;
let _length;

//start_day_of_week: Number(sun:0,mon:1...)
function setCalendar(start_day_of_week, length){
    calendar_tbody.innerHTML = "";
    _start_day_of_week = start_day_of_week;
    _length = length;

    let tr;

    let i = 0;
    while(true){
        if(i % 7 == 0){
            if(i > length + start_day_of_week){
                break;
            }
            tr = document.createElement("tr");
            calendar_tbody.appendChild(tr);
        }

        const td = document.createElement("td");
        if(i < start_day_of_week || start_day_of_week+length <= i){
            td.setAttribute("class", "empty_day");
        }
        else{
            td.innerHTML = i - start_day_of_week + 1;
        }

        tr.appendChild(td);

        i++;
    }
}



function getDay(day_num){
    let row_num = (day_num + _start_day_of_week) / 7;
    if(Number.isInteger(row_num)){
        row_num--;
    }
    else{
        row_num = Math.floor(row_num);
    }

    let col_num = (day_num + _start_day_of_week) % 7 - 1;
    if(col_num == -1){
        col_num = 6;
    }

    const target_tr = calendar_tbody.getElementsByTagName("tr")[row_num];
    const target_td = target_tr.getElementsByTagName("td")[col_num];

    return target_td;
}


setCalendar(6, 30);
const day5 = getDay(30);
day5.style.backgroundColor = "red";


export {setCalendar, getDay};