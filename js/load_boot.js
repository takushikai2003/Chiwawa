import LessonSelect from "../pages/boot/LessonSelect.js";
import BootScreen from "../pages/boot/BootScreen.js";

const boot_screen = new BootScreen(document.body);

document.documentElement.style.backgroundColor = "#FFD966";
document.body.style.backgroundColor = "#FFD966";

await wait_event(boot_screen, "click");

document.documentElement.style.backgroundColor = "white";
document.body.style.backgroundColor = "white";

new LessonSelect(document.body);


function wait_event(target, event){
    return new Promise(resolve => {
        target.addEventListener(event, (e)=>{
            resolve(e);
        }, {once: true});
    });
}