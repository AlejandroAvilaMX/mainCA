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

//Function that allow us to highligh a row when we click it
function select_row() {
    $("#menuTable tbody tr[id]").click(function () {  //We speficy that the funcion will be used when we click
        $(".selected").removeClass("selected");  //The row will be now "selected"
        $(this).addClass("selected");
        var section = $(this).prevAll("tr").children("td[colspan='3']").length - 1; //Storing the section in a variable
        var entree = $(this).attr("id") - 1;  //Storing the entree in a variable
        delete_row(section, entree);  //calling the "delete_row" fuction
    })
};

//Function to Delete a selected row
function delete_row(sec, ent) {
    $("#delete").click(function () {
        $.ajax(
            {
                url: "/post/delete",  //end point
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