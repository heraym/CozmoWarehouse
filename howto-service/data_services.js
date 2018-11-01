var moduleName = 'Data_Services';
var fs = require('fs'); 
var Promise = require("bluebird");
var http = require('http');

var cozmo_host = "10.157.220.195";
var cozmo_port = 4100;

var listaPedidos = [];
var nropedido = 0;

var Data_Services = function () {
};

Data_Services.prototype.despachar = function (callback) {
	if (listaPedidos.length > 0) 
		{ 
			 listaPedidos.pop();
			 callback("OK");
	    } else {
	    	 callback("ERROR");
	    }
}
Data_Services.prototype.hacerPedido = function (callback) {
	nropedido = nropedido + 1;
    listaPedidos.push(nropedido);	
/*
var post_data = { "variable": "nada"};

var string_post = JSON.stringify(post_data);    
var options  = {
           host : cozmo_host,
           port : cozmo_port,
       path : '/cgi-bin/hacerPedido', // the rest of the url with parameters if needed
         method : 'GET', 
           headers: {
             "Content-Type": 'application/json',
           }};   

        var datos = "";
        var req = http.request(options, function(res) {

          res.on('data', function(d) {
              datos += d;
                });

          res.on('end', function(d) {
          console.log(datos);
          callback(datos);
                 });
      
          res.on('error', function(e) {
                 console.info('ERROR:\n');
           console.info(e);
                });

        });     
        //req.write(string_post);
        req.end();
*/
}

Data_Services.prototype.pedidos = function (callback) {
          callback(listaPedidos); 
}


module.exports = Data_Services;
