

//crea una tabla que guarda los datos del archivo .csv
let table; 

//se crea un arreglo
let bubbles = []; 

//numero de filas en el archivo
let rowCount;

// Put any asynchronous data loading in preload to complete before "setup" is run
function preload() 
{
  //carga el archivo y tiene en cuenta el titulo de las columnas
  table = loadTable("assets/casos.csv", "header");
}


function setup() 
{
  createCanvas(640, 360);
   
  //numero de filas en el archivo
  rowCount = table.getRowCount();

  //creamos un objeto que guarda la información de las filas de la tabla
  const row = table.getRows();  

  for (let i = 0; i < rowCount; i++) 
  {
    //guardamos la información de la fila "x" en una constante
    const x = row[i].getNum("x");
    //guardamos la información de la fila "y" en una constante
    const y = row[i].getNum("y");
    //guardamos la información de la fila "diameter" en una constante
    const diameter = row[i].getNum("diameter");
    //guardamos la información de la fila "name" en una constante
    const name = row[i].getString("name");

    //Adiciono al arreglo un objeto de tipo Bubble, donde inicializo el objeto creando la Burbuja
    bubbles.push(new Bubble(x, y, diameter, name));
    //se crean la cantidad de burbujas acorde a la cantidad de datos
  }

}


function draw() 
{
  background(43,30,10);
textSize(20);
 textAlign(CENTER);
 fill(218,168,120);
  text("TOTAL DE SUICIDIOS EN BOGOTÁ", 270, 30);
  //se recorre la cantidad de burbujas, que es lo mismo que recorrer la cantidad de datos
  //for (let i = 0; i < bubbles.length; i++)
  for (let i = 0; i < rowCount; i++) 
  {
    //recorre cada burbuja y llama a la función dibujar para mostrarla
    bubbles[i].dibujar();
    //recorre cada burbuja y llama a la función mouseOver para mostrar  la información
    bubbles[i].mouseOver(mouseX, mouseY);
  } 
}


// clase Bubble 
class Bubble 
{
  //se determinan los variables del objeto
  constructor(x, y, diameter, name) 
  {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.name = name;

    this.over = false;
  }

  //se crea la función donde se determina si el mouse esta encima de la burbuja, le entra como para metro mouseX y mouseY
  mouseOver(px, py) 
  {
    //distancia que hay entre la posición del mouse y la burbuja
    let distancia = dist(px, py, this.x, this.y);

    //si la distancia entre el mouse y la burbuja es cercana
    if(distancia < 20)
    {
      // entonces la variable over pongala en true
      this.over = true; 
    }
    //si la distancia entre el mouse y la burbuja es lejana
    else
    {   
      // entonces la variable over pongala en false
      this.over = false;
    }
  }

  //muestra la burbuja
  dibujar() 
  {
    
    stroke(0);
    strokeWeight(0.8);
    noFill();
    //dibuja la burbuja segun los datos obtenidos del archivo en el setup

    fill(255,255,255);
    rect(this.x, this.y, this.diameter, this.diameter);
    fill(115,68,12);
    rect(275,200,20,290)
    fill(22,242,219);
    ellipse(285,138,40,40);
    fill(8,68,26);
    rect(295,250,20,20)
    fill(8,68,26);
    rect(295,270,20,20)
    fill(8,68,26);
    rect(315,265,20,20)
    //si la variable over es igual a true, es decir, si esta cerca a la burbuja  
    if (this.over == true) 
    {
      fill(242,236,22);
      textAlign(CENTER);
      //coloca el texto del dato mas abajo de la burbuja
      text(this.name, this.x, this.y + 40);
      text(this.diameter, this.x, this.y + 20);
    }
  }
}
