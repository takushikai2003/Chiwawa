const left_tippy = tippy("#image_left", {
    content: "<h1>I'm left</h1>",
    allowHTML: true,
    theme: "left",
    onHide(instance) {
        return false;
    },
})[0];

const right_tippy = tippy("#image_right", {
    content: "<h1>I'm right</h1>",
    allowHTML: true,
    backgroundColor: "yellow",
    theme: "right",
    onHide(instance) {
        return false;
    },
})[0];

// console.log(left_tippy);

//常時表示は、show()とfn onHide:return false
left_tippy.show();
right_tippy.show();

// left_tippy.setContent("string");
