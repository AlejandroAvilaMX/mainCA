/* This code was taken from Mikhail's classes */
//This is a jquery code
//This function (draw table) calls the function to the server
function draw_table() {
    $("#results").empty();
    $.getJSONuncached = function (url) {
        return $.ajax(
            {
                url: url,
                type: 'GET',
                cache: false,
                success: function (html) {   //When the call is successful 
                    $("#results").append(html);  //Add the html code to the results div
                    select_row();
                }
            });
    };
    $.getJSONuncached("/get/html")  //Here the code calls the path
};

function select_row() {
    $("#menuTable tbody tr[id]").click(function () {
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
        var section = $(this).prevAll("tr").children("td[colspan='3']").length - 1;
        var entree = $(this).attr("id") - 1;
        delete_row(section, entree);
    })
};

function delete_row(sec, ent) {
    $("#delete").click(function () {
        $.ajax(
            {
                url: "/post/delete",
                type: "POST",
                data:
                {
                    section: sec,
                    entree: ent
                },
                cache: false,
                success: setTimeout(draw_table, 1000)
            })
    })
};

//Calling the draw table when we open the page
$(document).ready(function () {
    draw_table();
});