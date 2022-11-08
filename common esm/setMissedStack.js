function setMissedStack(misetake_qestion){
    const missed_stack = JSON.parse(localStorage.getItem("missed_stack")) || [];
    missed_stack.push(misetake_qestion);

    localStorage.setItem("missed_stack", JSON.stringify(missed_stack));
}

export default setMissedStack;