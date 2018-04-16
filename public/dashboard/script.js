$(document).ready(() => {
    $.get("/api/getAll", data => {
        data.forEach(e => {
            $("#tbody").append(`
                <tr id="${e._id}">
                    <td>${e.matnr}</td>
                    <td>${e.katnr}</td>
                    <td>${e.class}</td>
                    <td>${e.firstname}</td>
                    <td>${e.lastname}</td>
                    <td><span class="emoji delete">🗑</span></td>
                </tr>
            `);
        });
    });

    $("#tbody").on("click", ".delete", e => {
        var id = e.target.parentElement.parentElement.id;
        $.ajax({
            url: '/api/delete',
            type: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify({
                id: id
            }),
            success: $("#" + id).remove(),
            error: console.log("error")
        });
    });
});