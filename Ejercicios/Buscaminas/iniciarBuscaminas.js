let numMinas=0;
let matriz=[];
let tablero = document.getElementById("tablero");

function dibujarTableroHTML(ancho,alto){
    if (tablero && tablero.childNodes.length > 0) {
        tablero.removeChild(tablero.childNodes[0]);
    }

    let tabla = document.createElement("table");
    for(let i=0;i< alto;i++) {
        let row = tabla.insertRow(i)
        matriz[i]= new Array(ancho);

        for(let j=0;j< ancho;j++) {
            let cell = row.insertCell(j);
            cell.innerHTML="<button id='"+i+j+"'>X</button>"
            matriz[i][j]=0;
        }
        
    }

    console.log(matriz);
    tablero.appendChild(tabla);
}

var select = document.getElementById("selectMinas");
 
select.addEventListener("change", function(){
  var selectedOption = this.options[this.selectedIndex];

  switch(selectedOption.value){
    case "op1":
        dibujarTableroHTML(9,9);
        numMinas=10;
        break;
    case "op2":
        dibujarTableroHTML(9,9);
        numMinas=35;
        break;
    case "op3":
        dibujarTableroHTML(16,16);
        numMinas=40;
        break;
    case "op4":
        dibujarTableroHTML(16,16);
        numMinas=99;
        break;
    case "op5":
        dibujarTableroHTML(30,16);
        numMinas=99;
        break;
    case "op6":
        dibujarTableroHTML(30,16);
        numMinas=170;
        break;
    case "person":
        let ancho = prompt("Dame el ancho: ");
        let alto = prompt("Dame el alto: ");
        dibujarTableroHTML(ancho,alto);
        break;
  }
});

dibujarTableroHTML(9,9);
numMinas=10;

function colocarBombasTableroJS(){

    
}