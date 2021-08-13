const ingresos = [
    new Ingreso('Chofer',2000.00),
    new Ingreso('Venta Motocicleta',1500)
]

const egresos = [
    new Egreso('Venta departamento',900),
    new Egreso('Cadena',400)
];

let cargarApp =()=>{
    cargarCabezero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos=() =>{
    let totalIngresos = 0;
    for(let ingreso of ingresos){
        totalIngresos += ingreso.valor;
    }
    return totalIngresos
}
let totalEgresos = ()=> {
    let totalEgresos = 0;    
    for(let egreso of egresos){
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}
let cargarCabezero = () =>{
   let presupuesto = totalEgresos() + totalIngresos();
   let porcentajeEgreso =  totalEgresos()/totalIngresos(); 

   document.getElementById('presupuesto').innerHTML = formatoMoneda( presupuesto);
   document.getElementById('porcentaje').innerHTML =formatoPorcentaje( porcentajeEgreso);   
   document.getElementById('ingreso').innerHTML = formatoMoneda( totalIngresos());
   document.getElementById('egreso').innerHTML = formatoMoneda( totalEgresos());
}

const formatoMoneda = (valor)=>{
    return valor.toLocaleString('en-US',{style:'currency',currency:'USD',minimumFractionDigits: 2});
}

const formatoPorcentaje = ( valor)=>{
    return valor.toLocaleString('en-US',{style:'percent',minimumFractionDigits : 2})
}

const cargarIngresos = () =>{
     let ingresosHtml = '';
     for(let ingreso of ingresos){
         ingresosHtml += crearIngresoHtml(ingreso);
     }
     document.getElementById("lista-ingresos").innerHTML = ingresosHtml;
}

const crearIngresoHtml = (ingreso)=>{
    let valor = ingreso.valor;
    let descripcion = ingreso.descripcion;

    let ingresoHtml = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${formatoMoneda( descripcion)}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda( valor)}</div>
        <div class="elemento_eliminar">    
            <button class="elemento_eliminar--btn">    
               <ion-icon name="close-circle-outline"
               onclick ='eliminarIngreso(${ingreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `
    return ingresoHtml;
}

const eliminarIngreso = (id)=>{
  let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
  ingresos.splice(indiceEliminar,1);
  cargarCabezero();
  cargarIngresos(); 

}

const cargarEgresos = ()=>{
    let egresosHtml = '';
    for(let egreso of egresos){
        egresosHtml +=  crearEgresoHtml(egreso);
    } 
    document.getElementById('lista-egresos').innerHTML = egresosHtml;
}


const crearEgresoHtml =(egresos)=>{
    let valor = egresos.valor;
    let descripcion = egresos.descripcion;
    let egresosHtml = `          
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${formatoMoneda( descripcion)}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda( valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje( valor / totalIngresos())}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline"
               onclick='eliminarEgreso(${egresos.id})' ></ion-icon>
            </button>
        </div>
    </div>
</div>
`
return egresosHtml;
}

const eliminarEgreso = (id)=>{
        let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
        egresos.splice(indiceEliminar , 1);
        cargarCabezero();
        cargarEgresos();
}

const agregarDato = ()=>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value !== "" && valor.value !== ''){
           if(tipo.value === 'ingreso'){
             ingresos.push(new Ingreso(descripcion.value,Number( valor.value)));
             cargarCabezero();
             cargarIngresos();
           }  
           else if(tipo.value == 'egreso'){
            egresos.push(new Egreso(descripcion.value,Number( valor.value)));
            cargarCabezero();
            cargarEgresos();
           }   
    }

}