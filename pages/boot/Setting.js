import getDataAsString from "../../common esm/getDataAsString.js";
const insertHTML = await getDataAsString("./pages/boot/Setting.html");

class Setting{
    constructor(){
        document.body.innerHTML = insertHTML;
        
        const url = new URL(window.location.href);
        const params = url.searchParams;
        const page = params.get("page");
        if(page != "setting"){
            history.pushState(null, null, "./index.html?page=setting");   
        }

        document.querySelector("#delete_retry")
        .addEventListener("click",()=>{
            if(window.confirm("Are you sure to delete retry?")){
                localStorage.setItem("missed_stack", "[]");
            }
        });

        document.querySelector("#delete_score")
        .addEventListener("click",()=>{
            if(window.confirm("Are you sure to delete score?")){
                localStorage.setItem("score", "0");
            }
        });

        document.querySelector("#setting_back")
        .addEventListener("click",()=>{
            history.back();
        });
    }
}


export default Setting;