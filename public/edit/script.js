$(document).ready(() => {
    $("#confirm-button").click(() => {
        $.ajax({
            type: "POST",
            url: "/api/create",
            data: JSON.stringify({
                matnr: $("#matnr").val(),
                katnr: $("#katnr").val(),
                class: $("#klasse").val(),
                firstname: $("#vorname").val(),
                lastname: $("#nachname").val()
            }),
            headers: {
                'content-type': 'application/json'
            },
            success: () => {
                location.href = "/";
            }
        });
    });
});