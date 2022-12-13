//data: String
function sendLog(data){
    const form = document.createElement("form");
    form.id = "form";
    form.action = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdv-xV0gyRjK2CA_KwNYZB20Zrf4x8pu3ZsUbi0ZK6qKe9p1Q/formResponse";
    form.method="post";

    const input = document.createElement("input");
    input.type = "text";
    input.name = "entry.915176260";
    input.value = data;

    form.appendChild(input);


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


export default sendLog;