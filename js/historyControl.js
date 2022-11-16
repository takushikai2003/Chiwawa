import LessonSelect from "../pages/boot/LessonSelect.js";
import KanaSelect from "../pages/boot/KanaSelect.js";
import HiraganaTable from "../pages/boot/HiraganaTable.js";
import KatakanaTable from "../pages/boot/KatakanaTable.js";

window.addEventListener('popstate', (e) => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const page = params.get("page");

    switch(page){
        case "select_lesson":
            new LessonSelect(document.body);
            break;
        
        case "select_kana":
            new KanaSelect(document.body);
            break;
        
        case "hiragana_table":
            new HiraganaTable();
            break;
        
        case "katakana_table":
            new KatakanaTable();
            break;
    }
});