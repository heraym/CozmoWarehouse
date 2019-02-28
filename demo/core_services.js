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

 
return app;
}

module.exports = createComponentsServer;
