//variables necesarias para obtener la información del usuario
var entrada = document.getElementById("letra");
var boton = document.getElementById("boton");
boton.addEventListener("click", guardar);//evento en 
boton.addEventListener("mouseup", enfocar);//evento para enfocar en la caja de texto
var boton_reload = document.getElementById("boton_reinicio");
boton_reload.addEventListener("click", recargar); //evento para recargar la página

//variables necesarias para el juego
var letra;
var palabra;
var vidas = 6;
var letras_usadas = "";
var palabras = [
    "camaleon",
    "leon",
    "oso",
    "tigre",
    "perro",
    "gato",
    "elefante",
    "dromedario",
    "ornitorrinco",
    "alpaca",
    "ballena",
    "armadillo",
    "canguro",
    "caballo",
    "cebra",
    "ciervo",
    "grulla"
];

//variables traídas desde el html
var parrafo_solucion = document.getElementById("solucion");
var let_usa = document.getElementById("letras_usadas");
var final = document.getElementById("resultado");
var imagen = document.getElementById("imagen");

//asignar la palabra y los espacios en el arreglo para guardar la solución
elegir_palabra();
solucion = new Array (palabra.length);
for(i = 0; i < solucion.length; i++)
{
  solucion[i] = "_";
}
parrafo_solucion.innerHTML = solucion.join("");

//función para qelegir una palabra al azar
function elegir_palabra(){
  indice = parseInt(Math.random()*palabras.length);
  palabra = palabras[indice];
}

//función que guarda la información del usuario y compara si la letra está o no en la palabra asignada
function guardar(){
  var directorio = "";
  var esta = false;
  letra = validar_letra();
  entrada.value = "";
  console.log(letra);
  var arreglo_palabra = palabra.split("");
  for(x = 0; x < arreglo_palabra.length; x++)
  {
    if(letra == arreglo_palabra[x])
    {
      solucion[x] = letra;
      esta = true;
    }
  }
  if(esta == false)
  {
    letras_usadas += letra;
    directorio += String(8 - vidas);
    directorio += ".jpg";
    imagen.src = directorio;
    vidas--;
  }
  parrafo_solucion.innerHTML = solucion.join("");
  let_usa.innerHTML = letras_usadas;

  if(!solucion.includes("_") && vidas != 0)
  {
    final.innerHTML = "¡GANASTE!";
  }

  if(vidas == 0)
  {
    final.innerHTML = "¡PERDISTE!";
    boton.disabled = true;
  }
}

function validar_letra()
{
  var l = entrada.value;
  if(l.length == 1)
  {
    var msj = document.getElementById("alerta");
    msj.innerHTML = "<br />";
    return l;
  }
  else
  {
    var msj = document.getElementById("alerta");
    msj.innerHTML = "debe ingresar una sola letra";
    l = "";
    return l;
  }
}

function recargar()
{
  window.location.reload();
}

function enfocar()
{
  entrada.focus();
}
