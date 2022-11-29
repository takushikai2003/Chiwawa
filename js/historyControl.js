import LessonSelect from "../pages/boot/LessonSelect.js";

window.addEventListener('popstate', (e) => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const page = params.get("page");

    switch(page){
        case "select_lesson":
            new LessonSelect(document.body);
            break;
    }
});