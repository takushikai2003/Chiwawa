import getDataAsString from "../../../common esm/getDataAsString.js";

const insertHTML = await getDataAsString("./pages/LessonSelect.html");

class LessonSelect{
    constructor(insertTarget){
        insertTarget.innerHTML = insertHTML;
    }
}


export default LessonSelect;