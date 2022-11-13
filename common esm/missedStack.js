function setMissedStack(mistake_qestion){
    const time = Date.now();
    mistake_qestion.time = time;
    const missed_stack = JSON.parse(localStorage.getItem("missed_stack")) || [];
    missed_stack.push(mistake_qestion);

    localStorage.setItem("missed_stack", JSON.stringify(missed_stack));
}

function getMissedStack(missed_stack_index){
    const missed_stack = JSON.parse(localStorage.getItem("missed_stack")) || [];
    return missed_stack[missed_stack_index];
}

function getMissedStacks(){
    const missed_stack = JSON.parse(localStorage.getItem("missed_stack")) || [];
    return missed_stack;
}

function removeMissedStack(missed_stack_index){
    const missed_stack = JSON.parse(localStorage.getItem("missed_stack")) || [];
    missed_stack.splice(missed_stack_index, 1);
    localStorage.setItem("missed_stack", JSON.stringify(missed_stack));
}

export {setMissedStack, getMissedStack, removeMissedStack, getMissedStacks};