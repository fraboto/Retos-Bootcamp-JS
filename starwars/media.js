$(function()
{
    $("#gif").hide();
})

var img = document.getElementById("imagen-ppal");
img.addEventListener("click", audio);

function audio()
{
    $("#song").trigger("play");
    $("#imagen-ppal").hide();
    $("#gif").show();
}