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

app.get('/producto/:id', function(req,res) { 
    res.writeHead(200, {"Content-Type": "text/html"}); 
   var html = "<html><head><link rel='stylesheet' type='text/css' href='/static/css/style.css'/></head>" +
   "<body bgcolor='black'><br><br><br>" + 
   "<font color='white'><H1>Parrot - Drone Anafi - Negro</H1></font>" + 
   "<font color='white'><h2>ANAFI representa una nueva generacion de drones. Se trata de la solucion ideal para grabar videos de alta calidad y hacer fotos excepcionales, capturando los mejores momentos de tu vida diaria. La camara de vuelo 4K HDR despliega capacidades de vídeo y foto exclusivas, gracias a su gimbal unico de inclinación en 180 grados y un zoom de hasta 2,8X sin perdidas. Gracias a ser plegable y ultracompacto, podras llevar este dron Parrot contigo en cualquier momento y lugar. ANAFI ofrece un tiempo de vuelo de 25 minutos y prestaciones avanzadas, al tiempo que es silencioso y resistente a condiciones climaticas extremas. Gracias a la Inteligencia Artificial integrada de ANAFI, aprovecha sus modos de vuelo automaticos para hacer tomas espectaculares </h2>" +
   "<h2>Stock Disponible 1000 unidades</h2>" +
   "<br><hr><br><h2>Precio de Contado 19,999 $</h2>" +
   "</font></body></html>";
   res.end(html);
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
 
return app;
}

module.exports = createComponentsServer;
