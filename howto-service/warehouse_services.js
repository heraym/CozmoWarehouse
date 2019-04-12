var moduleName = 'Warehouse_Services';
var fs = require('fs'); 
var Promise = require("bluebird");
var http = require('http');
var https = require('https');
var wms_host = "demo.wms.ocs.oraclecloud.com";
var wms_port = 443;
var ambiente = "demo_b2";
var usuario = "gconradi";
var password = "inicio01";
var autorizacion = "Basic Z2NvbnJhZGk6aW5pY2lvMDE=";
var parser = require('xml2json');

var Warehouse_Services = function () {
};

// description product_life percent_acceptable_product_life req_batch_nbr_flag serial_nbr_tracking
// max_case_qty std_case_qty std_pack_volume std_pack_weight
// lpns_per_tier tiers_per_pallet
Warehouse_Services.prototype.producto = function (id, callback) {
	
var post_data = { "variable": "nada"};

var string_post = JSON.stringify(post_data);    
var options  = {
           host : wms_host,
           port : wms_port,
           path : '/' + ambiente + '/wms/api/entity/item/' + id + '/', // the rest of the url with parameters if needed
           method : 'GET', 
           headers: {
             "Content-Type": 'application/json',
			 "Authorization": autorizacion
           }};   

        var datos = "";
        var req = https.request(options, function(res) {

          res.on('data', function(d) {
              datos += d;
                });

          res.on('end', function(d) {
			  
          var json = parser.toJson(datos);
		  console.log(json);
		  var objetoJSON = JSON.parse(json);
		  
		  var producto = { detalle: { id: id, 
							descripcion: objetoJSON.LgfData.item.description },
						   calidad: { vida_util: objetoJSON.LgfData.item.product_life,
						   porc_aceptable: objetoJSON.LgfData.item.percent_acceptable_product_life,
						   requiere_lote: objetoJSON.LgfData.item.req_batch_nbr_flag,
						   requiere_serie: objetoJSON.LgfData.item.serial_nbr_tracking},
						   almacenamiento: {
							   cantidad_max_caja: objetoJSON.LgfData.item.max_case_qty,
							   cantidad_stdr_caja: objetoJSON.LgfData.item.std_case_qty,
							   peso_paquete_stdr: objetoJSON.LgfData.item.std_pack_weight,
							   volumen_paquete_stdr: objetoJSON.LgfData.item.std_pack_volume,
							   lpn_x_nivel: objetoJSON.LgfData.item.lpns_per_tier,
						       niveles_x_pallet: objetoJSON.LgfData.item.tiers_per_pallet}
						   
						   };				   
 		  callback(producto);
          });
      
          res.on('error', function(e) {
                 console.info('ERROR:\n');
           console.info(e);
                });

        });     
        //req.write(string_post);
        req.end();

}


module.exports = Warehouse_Services;
