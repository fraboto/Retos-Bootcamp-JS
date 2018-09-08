var panel_dibujo = document.getElementById("dib");
var dibujo = panel_dibujo.getContext("2d");
panel_dibujo.addEventListener("mousedown", activarMouse);
panel_dibujo.addEventListener("mouseup", desactivarMouse);
panel_dibujo.addEventListener("mousemove", dibujarMouse);
var boton_reinicio = document.getElementById("reinicio");
boton_reinicio.addEventListener("click", reiniciar);

var mouse_activo = false;
var inicio_x;
var inicio_y;
var diferencia_x = dibujo.canvas.offsetLeft;
var diferencia_y = dibujo.canvas.offsetTop;

console.log(dibujo);

dibujarBordes();

//función para dibujar una línea
function dibujarLinea(color, x1, y1, x2, y2, lienzo)
{
  lienzo.strokeStyle = color;
  lienzo.lineWidth = 2;
  lienzo.beginPath();
  lienzo.moveTo(x1, y1);
  lienzo.lineTo(x2, y2);
  lienzo.stroke();
  lienzo.closePath();
}

function dibujarBordes()
{
  var color_bordes = "black"
  dibujarLinea(color_bordes, 0, 0, 0, panel_dibujo.height, dibujo);
  dibujarLinea(color_bordes, 0, panel_dibujo.height, panel_dibujo.width, panel_dibujo.height, dibujo);
  dibujarLinea(color_bordes, panel_dibujo.width, panel_dibujo.height, panel_dibujo.width, 0, dibujo);
  dibujarLinea(color_bordes, 0, 0, panel_dibujo.width, 0, dibujo);
}

function activarMouse(event)
{
  console.log(event);
  mouse_activo = true;
  inicio_x = event.clientX;
  inicio_y = event.clientY;
}

function desactivarMouse()
{
  mouse_activo = false;
}

function dibujarMouse(event)
{
  if(mouse_activo)
  {
    var x = event.clientX;
    var y = event.clientY;
    var color_mouse = "rgb(97, 230, 72)";
    dibujarLinea(color_mouse, inicio_x-diferencia_x, inicio_y-diferencia_y, x-diferencia_x, y-diferencia_y, dibujo);
    inicio_x = x;
    inicio_y = y;
  }
}

function reiniciar()
{
  dibujo.clearRect(0, 0, panel_dibujo.width, panel_dibujo.height);
  dibujarBordes();
}
