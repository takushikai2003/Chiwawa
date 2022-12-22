//data: String
function sendError(data){
    const form = document.createElement("form");
    form.id = "form";
    form.action = "https://docs.google.com/forms/u/0/d/e/1FAIpQLScZOG32EEGn67fx7x8Tw9DUxV0wj40UwjrRNWM-TCx2p62VKA/formResponse";
    form.method="post";

    const textarea = document.createElement("textarea");
    textarea.name = "entry.263186393";
    textarea.value = data;

    form.appendChild(textarea);


    $.ajax({
        url: $(form).attr('action'),
        data: $(form).serialize(),
        type: 'POST',
        dataType: 'xml',
        statusCode: {
            0: function() {
                //成功した際の処理を書きます。
                console.log("成功");
            },
            200: function() {
                //成功した際の処理を書きます。
                console.log("成功");
            }
        }
    });

}


export default sendError;