import getDataAsString from "../../common esm/getDataAsString.js";

const insertHTML = await getDataAsString("./pages/boot/BootScreen.html");

class BootScreen{
    constructor(insertTarget){
        insertTarget.innerHTML = insertHTML;

        return insertTarget;
    }
}


export default BootScreen;