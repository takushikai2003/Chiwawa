function setMissedStack(misetake_qestion){
    const time = Date.now();
    misetake_qestion.time = time;
    const missed_stack = JSON.parse(localStorage.getItem("missed_stack")) || [];
    missed_stack.push(misetake_qestion);

    localStorage.setItem("missed_stack", JSON.stringify(missed_stack));
}

function getMissedStack(missed_stack_index){
    const missed_stack = JSON.parse(localStorage.getItem("missed_stack")) || [];
    return missed_stack[missed_stack_index];
}

function removeMissedStack(missed_stack_index){
    const missed_stack = JSON.parse(localStorage.getItem("missed_stack")) || [];
    missed_stack.splice(missed_stack_index, 1);
    localStorage.setItem("missed_stack", JSON.stringify(missed_stack));
}

export {setMissedStack, getMissedStack, removeMissedStack};