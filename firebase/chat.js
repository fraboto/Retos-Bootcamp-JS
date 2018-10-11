// Get a reference to the database service
var database = firebase.database();
var msgdatabase = firebase.database().ref('mensajes');

msgdatabase.on('child_added', (data) => 
{
    $("#cont-mensajes").append(`<div class="mensaje m-1 pl-2"><p>${data.val().body}</p></div>`);
})

$("#enviar").on("click",enviarMSG);
$("#texto-mensaje").on("keyup", (e) =>
{
    if(e.which === 13)
    {
        enviarMSG();
    }
    else
    {
        console.log("escribiendo...");
    }
});

function enviarMSG()
{
    msgdatabase.push().set({body: $("#texto-mensaje").val()});
    $("#texto-mensaje").val('');
}