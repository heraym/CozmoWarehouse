//t = listatareas.findIndex(tarea => tarea.ciclo === dd);
var Warehouse_Services = require('./warehouse_services');

var warehouse_services = new Warehouse_Services();
warehouse_services.producto("SKU11", callback); 

function callback(respuesta) { 
    console.log(respuesta);
  }

