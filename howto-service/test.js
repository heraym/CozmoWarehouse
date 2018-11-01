var lista = [{id: 1, nombre:"hernan"},{id: 2, nombre: "juan"}];
var output = {};
output = lista.findIndex(obj => obj.id == 2); 
//output = lista.find(function(obj) { return obj.id == 2; });
/*    for (var i = 0; i < lista.length; i++) { 
     if (lista[i].id == 2) {
      output = lista[i];
     } 
    }
*/
//t = listatareas.findIndex(tarea => tarea.ciclo === dd);
console.log(output);