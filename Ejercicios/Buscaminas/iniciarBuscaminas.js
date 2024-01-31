
let matriz=[];
let matrizAux=[];
let tablero = document.getElementById("tablero");
let numMinas=calcularNumMinas(9,9);

dibujarTableroHTML(9,9);
colocarMinasMatriz(9,9);
calcularNumerosAlrededor();
colocarBombasTableroJS();

function dibujarTableroHTML(ancho,alto){
    if (tablero && tablero.childNodes.length > 0) {
        tablero.removeChild(tablero.childNodes[0]);
    }

    let tabla = document.createElement("table");
    for(let i=0;i< alto;i++) {
        let row = tabla.insertRow(i)
        matriz[i]= new Array(ancho);
        matrizAux[i]= new Array(ancho);

        for(let j=0;j< ancho;j++) {
            let cell = row.insertCell(j);
            cell.innerHTML="<button id='"+i+j+"'></button>"
            matriz[i][j]=0;
            matrizAux[i][j]="<button id='"+i+j+"'></button>"
        }
        
    }

    console.log(matriz);
    console.log("MatrizAux");
    console.log(matrizAux);
    tablero.appendChild(tabla);
}

var select = document.getElementById("selectMinas");
 
select.addEventListener("change", function(){
  var selectedOption = this.options[this.selectedIndex];

  switch(selectedOption.value){
    case "op1":
        dibujarTableroHTML(9,9);
        numMinas=calcularNumMinas(9,9);  
        colocarMinasMatriz(9,9);
        calcularNumerosAlrededor();
        colocarBombasTableroJS();
        console.log(numMinas);
        
        break;
    case "op2":
        dibujarTableroHTML(16,16);
        numMinas=calcularNumMinas(16,16); 
        colocarMinasMatriz(16,16);
        calcularNumerosAlrededor();
        colocarBombasTableroJS();

        break;
    case "op3":
        dibujarTableroHTML(30,16);
        numMinas=calcularNumMinas(30,16);  
        colocarMinasMatriz(30,16);
        calcularNumerosAlrededor();
        colocarBombasTableroJS();

        break;

  }
});
function calcularNumMinas(x,y){
    return Math.floor((x*y)*0.2);
}
function colocarMinasMatriz(x,y){
    let probabilidadM = 0.3;
    let cont = 0;
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            if (Math.random() < probabilidadM) {
                matriz[i][j] = 'M';
                cont++;
            }
            if(cont == numMinas){
                break;
            }
        }
    }
}

function colocarBombasTableroJS(){
    for (let i = 0; i <= matriz.length-1; i++) {
        for (let j = 0; j <= matriz[0].length-1; j++) {
          if (matriz[i][j] === 'M') {
            document.getElementById(i + "" + j).style.backgroundImage = "url('mina.png')";
           /* document.getElementById(i + "" + j).style.backgroundSize = "cover";
            document.getElementById(i + "" + j).style.color = "transparent";*/
          }else{
            document.getElementById(i + "" + j).innerText=matriz[i][j];
          }
        }
      }
}
function calcularNumerosAlrededor() {

    for (let i = 0; i < matriz.length; i++) {
      for (let j = 0; j < matriz[0].length; j++) {
        if (matriz[i][j] === 'M') {
          // Si hay una mina, incrementa los números alrededor
          incrementarNumerosAlrededor(i - 1, j - 1); //Esquina izq superior
          incrementarNumerosAlrededor(i - 1, j);  //Izquierda
          incrementarNumerosAlrededor(i - 1, j + 1); //Esquina izq inferior
          incrementarNumerosAlrededor(i, j - 1); //Arriba
          incrementarNumerosAlrededor(i, j + 1); //Abajo
          incrementarNumerosAlrededor(i + 1, j - 1); //Esquina dch superior
          incrementarNumerosAlrededor(i + 1, j); //Derecha
          incrementarNumerosAlrededor(i + 1, j + 1); //Esquina dch inferior
        }
      }
    }
  }
  
  function incrementarNumerosAlrededor(fila, columna) {
    const filas = matriz.length;
    const columnas = matriz[0].length;
  
    if (fila >= 0 && fila < filas && columna >= 0 && columna < columnas) {
      // Asegúrate de que la posición esté dentro de los límites de la matriz
      if (matriz[fila][columna] !== 'M') {
        // Incrementa el número si no hay una mina en esa posición
        matriz[fila][columna]++;
      }
    }
  }