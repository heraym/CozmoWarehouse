var express = require("express"),
    http = require("http"),
     cors = require("cors"),
     app = express();
var morgan = require('morgan');

app.use(cors());

const bodyParser = require('body-parser');


var createComponentsServer = function(urlPath, config) {
    var app = express();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
		
    var shell = require('./shell')(config);

    var router = express.Router();
    router.use(morgan('combined'));
    //router.use(auth.connect(basic));

    // Return component metadata
    router.route('/').get(function (req, res) {
        res.set('Content-Type', 'application/json')
           .status(200)
           .json(shell.getAllComponentMetadata());
    });

    // Invoke component by name
    router.route('/:componentName').post(function (req, res) {
        
    const componentName = req.params.componentName;
        shell.invokeComponentByName(req.params.componentName, req.body, {}, function(err, data) {
            if (!err) {
                res.status(200).json(data);
            }
            else {
                switch (err.name) {
                    case 'unknownComponent':
                        res.status(404).send(err.message);
                        break;
                    case 'badRequest':
                        res.status(400).json(err.message);
                        break;
                    default:
                        res.status(500).json(err.message);
                        break;
                }
            }
        });
    });

    app.use(urlPath, router);

    
    app.locals.endpoints = [];
    app.locals.endpoints.push({
      name: 'metadata',
      method: 'GET',
      endpoint: urlPath
    });
    app.locals.endpoints.push({
      name: 'invocation',
      method: 'POST',
      endpoint: urlPath+'/:componentName'
    });

    app.locals.ui = {
  		name: 'Metadata',
  		endpoint: urlPath
  	};


  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

var Data_Services = require('./data_services');

var data_services = new Data_Services();
var Warehouse_Services = require('./warehouse_services');
var warehouse_services = new Warehouse_Services(); 

    app.use("/static", express.static(__dirname + '/static'));

app.get('/producto/:id', function(req,res) { 
  warehouse_services.producto(req.params.id, callbackProducto);
  function callbackProducto (producto) {
    res.writeHead(200, {"Content-Type": "text/html"}); 
	/*var color1 = "red";
	var color2 = "red";
	var color3 = "red";
	
	if (producto.stock > 100) { color1= "green"; } else { color1 = "red";}
	if (producto.otro1 > 100) { color2= "green"; } else { color2 = "red";}
	if (producto.otro2 > 100) { color3= "green"; } else { color3 = "red";} */
   var html = "<html><head><link rel='stylesheet' type='text/css' href='/static/css/main.css'/></head>" +
   "<body><br><br><br>" + 
   "<h1>" + producto.detalle.descripcion + "</h1>" + 
   "<br><hr><br><h2>Calidad</h2>" +
   "<h3>Vida util " + producto.calidad.vida_util + " dias</h3>" +
   "<h3>Porcentaje Aceptable " + producto.calidad.porc_aceptable + " %</h3>" +
   "<br><hr><br><h2>Almacenamiento</h2>" +
   "<h3>Cantidad Max Caja " + producto.almacenamiento.cantidad_max_caja + "</h3>" +
   "<h3>Cantidad Estandar Caja " + producto.almacenamiento.cantidad_stdr_caja + "</h3>" +
   "<h3>Peso Paquetes Estandar " + producto.almacenamiento.peso_paquete_stdr + " kg</h3>" +
   "<h3>Volumen Paquetes Estandar " + producto.almacenamiento.volumen_paquete_stdr + " </h3>" +
   "<h3>LPN por Nivel " + producto.almacenamiento.lpn_x_nivel + " kg</h3>" +
   "<h3>Niveles por Pallet " + producto.almacenamiento.niveles_x_pallet + " kg</h3>" +
    "</body></html>";
   res.end(html);
  }
});

app.get('/comprar', function(req,res) { 
 console.log('nuevo pedido\n');
 data_services.hacerPedido();
 res.writeHead(200, {"Content-Type": "application/json"}); 
 var texto = "El pedido sera despachado!";
 res.end(texto);      
});

app.get('/pedidos', function(req,res) { 
 console.log('pedidos\n');
 data_services.pedidos(callback);

 function callback(pedidos) {
     res.writeHead(200, {"Content-Type": "application/json"}); 
     res.end(JSON.stringify(pedidos));      
  }
});

app.get('/pedidos/despachar', function(req,res) { 
  console.log('despachar pedido\n');
  data_services.despachar(callbackDespachar);
  function callbackDespachar (respuesta) { 
    if (respuesta == "OK") { console.log("BIEN");}
     res.writeHead(200, {"Content-Type": "application/json"}); 
     res.end(JSON.stringify({"resp": respuesta}));  
    }
 });

app.get('/pedidos/cancelar', function(req,res) { 
  console.log('cancelar pedido\n');
  data_services.cancelado(callbackCancelar);
  function callbackCancelar (respuesta) { 
    if (respuesta == "OK") { console.log("BIEN");}
     res.writeHead(200, {"Content-Type": "application/json"}); 
     res.end(JSON.stringify({"resp": respuesta}));  
    }
 });

  app.get('/sensor/:id', function(req,res) { 
   
   var nombre = req.params.id;
   console.log("nombre:" + nombre);
   data_services.buscarSensor(nombre, callback);
   
   function callback(sensor) {
     if (sensor != null) {
// Defino labels de grafico
       var labels = [];
       for (i = 0; i < sensor.historial.length; i++) { 
         labels.push(sensor.historial[i].creationDate);
        }
       var dataT = [];
       for (i = 0; i < sensor.historial.length; i++) { 
         dataT.push(sensor.historial[i].temperature);
       }

       var dataH = [];
       for (i = 0; i < sensor.historial.length; i++) { 
         dataH.push(sensor.historial[i].humidity);
        }

       var dataL = [];
       for (i = 0; i < sensor.historial.length; i++) { 
         dataL.push(sensor.historial[i].luminance);
       }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.writeHead(200, {"Content-Type": "application/json"}); 
       var info = { 'sensor': sensor, 'dataT': dataT, 'dataH': dataH, 'dataL': dataL};
       res.end(JSON.stringify(info));    
    }
  }
});
 
return app;
}

module.exports = createComponentsServer;
