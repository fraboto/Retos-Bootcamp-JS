var data = new FormData();
data.append("api_secret", "888de1e77b4da08277f71fcc86f5c032");
data.append("number", "573003096626");
data.append("body", "Hola");

var api_key = "b29989d2";
var url = `https://api4.apidaze.io/${api_key}/sms/send`;

function getPeticion(url)
{
    return new Promise(function(resolve, reject)
    {
        var peticion = new XMLHttpRequest();
        peticion.onload = function()
        {
            resolve(peticion.responseText);
        }
        peticion.onerror = function()
        {
            reject("Error");
        }
        peticion.open("POST", url, true);
        //peticion.setRequestHeader("llave": "valor"); Se usa para definir una propiedad de autenticación u otras características
        peticion.send(data);
    });
}

getPeticion(url)
.then(function(response)
{
  console.log(response);
})
.catch(function(response)
{
  console.log("Error", response);
});