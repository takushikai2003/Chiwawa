tippy(".meaning_word", {
    onTrigger: (instance, event) => {
        instance.setContent(instance.reference.dataset.tip);
    },
    content: "",
    allowHTML: true,
});