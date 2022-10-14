const calender_tbody = document.getElementById("calender_tbody");

//start_day_of_week: Number(sun:0,mon:1...)
function setCalender(start_day_of_week, length){
    calender_tbody.innerHTML = "";

    let tr;

    for(let i=0; i<length+(start_day_of_week*2); i++){
        if(i % 7 == 0){
            tr = document.createElement("tr");
            calender_tbody.appendChild(tr);
        }

        const td = document.createElement("td");
        if(i < start_day_of_week || start_day_of_week+length <= i){
            td.setAttribute("class", "empty_day");
        }
        else{
            td.innerHTML = i - start_day_of_week + 1;
        }

        tr.appendChild(td);
    }
}


setCalender(6, 30);