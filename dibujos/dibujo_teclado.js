//variables para el dibujo
var panel_dibujo = document.getElementById("dib");
var dibujo = panel_dibujo.getContext("2d");
document.addEventListener("keydown", activarTeclas);
document.addEventListener("keyup", desactivarTeclas);

//objeto para ver si las teclas están presionadas o no
var teclas_usadas = {
  LEFT: false,
  UP: false,
  RIGHT: false,
  DOWN: false
};

//objeto para guardar los códigos de las teclas
var teclas = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

//para dibujar el centro del cuadro
var x = panel_dibujo.width/2;
var y = panel_dibujo.height/2;
dibujarLinea("red", x-1, y-1, x+1, y+1, dibujo);

//función para dibujar una línea
function dibujarLinea(color, x1, y1, x2, y2, lienzo)
{
  lienzo.strokeStyle = color;
  lienzo.lineWidth = 3;
  lienzo.beginPath();
  lienzo.moveTo(x1, y1);
  lienzo.lineTo(x2, y2);
  lienzo.stroke();
  lienzo.closePath();
}

function activarTeclas(event)
{
  switch(event.keyCode)
  {
    case teclas.LEFT:
      teclas_usadas.LEFT = true;
    break;
    case teclas.UP:
      teclas_usadas.UP = true;
    break;
    case teclas.RIGHT:
      teclas_usadas.RIGHT = true;
    break;
    case teclas.DOWN:
      teclas_usadas.DOWN = true;
    break;
  }

  //ejecución de la función para dibujar
  dibujarTeclado();
}

function desactivarTeclas(event) 
{
  switch(event.keyCode)
  {
    case teclas.LEFT:
      teclas_usadas.LEFT = false;
    break;
    case teclas.UP:
      teclas_usadas.UP = false;
    break;
    case teclas.RIGHT:
      teclas_usadas.RIGHT = false;
    break;
    case teclas.DOWN:
      teclas_usadas.DOWN = false;
    break;
  }
}

//función para dibujar con el teclado
function dibujarTeclado()
{
  var color_linea = "rgb(53, 163, 97)";
  var movimiento = 1;

  if(teclas_usadas.LEFT && teclas_usadas.UP)
  {
    dibujarLinea(color_linea, x, y, x-movimiento, y-movimiento, dibujo);
    x = x-movimiento;
    y = y-movimiento;
    if(y == 0)
    {
      y = panel_dibujo.height;
    }
    if(x == 0)
    {
      x = panel_dibujo.width;
    }
  }
  else if(teclas_usadas.LEFT && teclas_usadas.DOWN)
  {
    dibujarLinea(color_linea, x, y, x-movimiento, y+movimiento, dibujo);
    x = x-movimiento;
    y = y+movimiento;
    if(y == panel_dibujo.height)
    {
      y = 0;
    }
    if(x == 0)
    {
      x = panel_dibujo.width;
    }
  }
  else if(teclas_usadas.RIGHT && teclas_usadas.DOWN)
  {
    dibujarLinea(color_linea, x, y, x+movimiento, y+movimiento, dibujo);
    x = x+movimiento;
    y = y+movimiento;
    if(y == panel_dibujo.height)
    {
      y = 0;
    }
    if(x == panel_dibujo.width)
    {
      x = 0;
    }
  }
  else if(teclas_usadas.RIGHT && teclas_usadas.UP)
  {
    dibujarLinea(color_linea, x, y, x+movimiento, y-movimiento, dibujo);
    x = x+movimiento;
    y = y-movimiento;
    if(y == 0)
    {
      y = panel_dibujo.height;
    }
    if(x == panel_dibujo.width)
    {
      x = 0;
    }
  }
  else if(teclas_usadas.LEFT)
  {
    dibujarLinea(color_linea, x, y, x-movimiento, y, dibujo);
    x = x-movimiento;
    if(x == 0)
    {
      x = panel_dibujo.width;
    }
  }
  else if(teclas_usadas.UP)
  {
    dibujarLinea(color_linea, x, y, x, y-movimiento, dibujo);
    y = y-movimiento;
    if(y == 0)
    {
      y = panel_dibujo.height;
    }
  }
  else if(teclas_usadas.RIGHT)
  {
    dibujarLinea(color_linea, x, y, x+movimiento, y, dibujo);
    x = x+movimiento;
    if(x == panel_dibujo.width)
    {
      x = 0;
    }
  }
  else if(teclas_usadas.DOWN)
  {
    dibujarLinea(color_linea, x, y, x, y+movimiento, dibujo);
    y = y+movimiento;
    if(y == panel_dibujo.height)
    {
      y = 0;
    }
  }
}

