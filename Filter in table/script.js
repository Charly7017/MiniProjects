const inputTexto=document.querySelector("#inputTexto")
const celdas=document.querySelectorAll(".people tbody td")
const filas=document.querySelectorAll(".people tbody tr")


const tabletdArray=Array.from(celdas)
const tabletrArray=Array.from(filas)


inputTexto.addEventListener("keyup",function(e){
    let valorInput=inputTexto.value.toUpperCase()

    if(valorInput===""){
        filas.forEach(function(fila) {
            fila.style.display="table-row"
        });
    }
    else if(e.keyCode===13){
         for(let i=0;i<filas.length;i++){
            if(!filas[i].textContent.toUpperCase().includes(valorInput)){
                filas[i].style.display="none"
            }
        }
    }

})