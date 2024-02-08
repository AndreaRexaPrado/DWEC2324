
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
    validarDNI();

        borrarError();
        if(camposVacios()&&confirm("Estas seguro de tus datos")){
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
    function validarDNI(){
        let inDNI= document.getElementById('nif');
        let numdni= inDNI.substring(0,8)
        console.log(numdni)
    }
    function error(elemento, mssg){
        
        document.getElementById("mensajeError").innerHTML = mssg;
        elemento.className = "error";
        elemento.focus();
    }

    function borrarError(){
        document.getElementById("mensajeError").innerHTML="";
        var form = document.forms[0];
        for(var i=0;i<form.elements.length;i++){
            form.elements[i].className="";
        }
    }

    function borrarCampos(){

        var form = document.forms[0];
        for(var i=0;i<form.elements.length;i++){
            let form = document.forms[0];

            for(let ele of form.elements){
                
                if(ele.type ==="text"||ele.type ==="date"){
                    ele.value =""
                }
            }
        }
    }