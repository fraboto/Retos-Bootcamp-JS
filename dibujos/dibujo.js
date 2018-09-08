//varaibles para el dibujo
var texto = document.getElementById("texto_lineas");
var boton = document.getElementById("boton_enviar");
boton.addEventListener("click", dibujarClick); //evento para atrapar la información por medio de un click
var panel_dibujo = document.getElementById("canvas_esquinas");
var lienzo = panel_dibujo.getContext("2d");
var ancho_lienzo = panel_dibujo.width;
var color_linea = "rgb(142, 90, 226)";

//función que dibuja una línea
function dibujarLinea(color, x1, y1, x2, y2)
{
  lienzo.strokeStyle = color;
  lienzo.beginPath();
  lienzo.moveTo(x1, y1);
  lienzo.lineTo(x2, y2);
  lienzo.stroke();
  lienzo.closePath();
}

//función que genera el trazo de las líneas en todaas las esquinas
function dibujarEsquinas(l)
{
  for (var lineas = 0; lineas < l; lineas++)
  {
    var x = (lineas+1) * ancho_lienzo/l;
    var y = lineas * ancho_lienzo/l;
    dibujarLinea(color_linea, 0, y, x, ancho_lienzo);
    dibujarLinea(color_linea, y, ancho_lienzo, ancho_lienzo, ancho_lienzo-x);
    dibujarLinea(color_linea, ancho_lienzo, ancho_lienzo-x, ancho_lienzo-y, 0);
    dibujarLinea(color_linea, ancho_lienzo-y, 0, 0, x);
  }

  dibujarLinea(color_linea, 1, 1, 1, 449);
  dibujarLinea(color_linea, 1, 449, 449, 449);
  dibujarLinea(color_linea, 449, 1, 449, 449);
  dibujarLinea(color_linea, 1, 1, 449, 1);
}

//función que dibuja después de atrapar la información por medio del click
function dibujarClick()
{
  var lineas_usuario = parseInt(texto.value);
  dibujarEsquinas(lineas_usuario);
}
