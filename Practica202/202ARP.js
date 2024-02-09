
window.onload = inicio;

function inicio(){
    borrarCampos();
    let cont = 0;
    document.getElementById("caract").innerHTML=cont;
    //Boton ir a google
    document.getElementById("google").addEventListener("click",()=>{
        location.href ="https://www.google.com/?hl=es"
    });
    //Funcion añadir curso
    document.getElementById("curso").addEventListener("change",(e)=>{

     
        var selectedOption = e.target.options[e.target.selectedIndex];
        if(selectedOption.value =="aniadir"){
            
            var newEleText =prompt("Dame el nuevo curso: ");
            var newElem = document.createElement("option");
            
            newElem.value = newEleText;
            newElem.text = newEleText;
            e.target.insertBefore(newElem,selectedOption);
            e.target.selectedIndex=0;
        }
    });

    //Select todos
    document.getElementById("all").addEventListener("click",()=>{
        let dias = document.getElementsByName("dia");
        for (let dia of dias){
            dia.checked=true;
        }
    });
    //Contador caracteres
    document.getElementById("mensaje").addEventListener("keydown",(e)=>{
        if (cont === 0 && e.inputType === 'deleteContentBackward') {
            return; 
        }
    
        if (e.inputType === 'deleteContentBackward') {
            cont--;
        } else {
            cont = e.target.value.length ;
        }
    
        
        if(cont > 500){
            document.getElementById("caract").innerHTML = 500-cont;
            document.getElementById("caract").className = "contRojo";
        }else{
            document.getElementById("caract").innerHTML = cont;
        }
    });

    document.getElementById("enviar").addEventListener('click',validar);
   
}

    function validar(e){
        borrarError();
        if(camposVacios()&&validarMssg()&&validarDNI()&&diasMarcados()&&confirm("Estas seguro de tus datos")){
            alert("Tus datos han sido enviados");
            borrarCampos();
            return true;
        }else{
            e.preventDefault();
            return false;
        }
    }

    function calcularLetraDNI(numeroDNI) {
        const letrasDNI = "TRWAGMYFPDXBNJZSQVHLCKE";
        const numero = numeroDNI % 23;
        const letra = letrasDNI.charAt(numero);
        return letra;
    }

    //Validaciones
    //Campos vacios
    function camposVacios(){
        let form = document.forms[0];

        for(let ele of form.elements){
            
            if(ele.type ==="text"||ele.type ==="date"){
                if(ele.value ===""){
                    error(ele,"Este campo no debe estar vacio");
                    return false;
                }
            }
        }
        return true;
    }
    //Validacion del DNI, se parte el string y se calcula la letra con el metodo de arriba
    function validarDNI(){
        let inDNI= document.getElementById('nif');
        let numdni= inDNI.value.substring(0,8);
        let letradni= inDNI.value.substring(8);
        if(calcularLetraDNI(Number(numdni)) === letradni){
            return true;
        }
        error(inDNI,"DNI no valido");
        return false;

    }

    //Al menos dos dias marcados

    function diasMarcados(){
        let cont = 0;
        let dias = document.getElementsByName("dia");
        for(let dia of dias){
            if(dia.checked){
                cont++;
            }
            
        }
        if(cont < 2){
            error(dias,"Al menos dos dias marcados");
            return false;
        }
        return true;

    }
    //Mensaje entre 2 y 500
    function validarMssg(){
        var elemento = document.getElementById("mensaje");
        if(!elemento.checkValidity()){
            
            //error(elemento);
            if(elemento.validity.valueMissing){
                error(elemento,"No puede dejar mensaje vacio");
            }
            if(elemento.validity.patternMismatch){
                error(elemento,"Mensaje entre 2 y 500 caracteres alfanumericos");
            }
            return false;
        }
        return true;
    }
    //Funcion para marcar los campos con error
    function error(elemento, mssg){
        
        document.getElementById("mensajeError").innerHTML = mssg;
        elemento.className = "error";
        elemento.focus();
    }
    //Borrar los errores correguidos
    function borrarError(){
        document.getElementById("mensajeError").innerHTML="";
        var form = document.forms[0];
        for(var i=0;i<form.elements.length;i++){
            form.elements[i].className="";
        }
    }
    //Limpia los campos
    function borrarCampos(){

        var form = document.forms[0];
        for(var i=0;i<form.elements.length;i++){
            let form = document.forms[0];

            for(let ele of form.elements){
                
                if(ele.type ==="text"||ele.type ==="date"||ele.id==="mensaje"){
                    ele.value =""
                }else if(ele.type==="checkbox"){
                    ele.checked=false;
                }
            }
        }
    }