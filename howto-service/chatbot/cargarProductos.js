"use strict"

var log4js = require('log4js');
var logger = log4js.getLogger();

module.exports =
    {
        metadata: () => ({
            "name": "ar.cloud.cargarProductos",
            "properties": {
                "familia": {"type": "string", "required": true},
				"variable": {"type": "string", "required": true}
            },
            "supportedActions": []
        }),
        invoke: (conversation, done) => {
             
            var familia = conversation.properties().familia;
			var variable = conversation.properties().variable;
            var userId = "";                
             if (conversation.channelType() == "facebook") {
                       userId = conversation.payload().sender.id;
              }
              else {
                 userId = conversation.payload().userId;
              }
             var lista = [{"Categoria": "Oracle Application Container Cloud Service", "Description": "Develop cloud native, 12-factor applications on a modern polyglot platform with Java SE, Node.js, PHP, Python, Ruby and more.",
			 "Icono": "https://docs.oracle.com/en/cloud/paas/app-container-cloud/sp_common/shared-images/cloudgs_appcontainer.png"},
			   {"Categoria": "Oracle Java Cloud Service", "Description": "Easy, rapid and agile deployment of any Java application. Experience full control and flexibility of your application in public cloud.", 
			   "Icono": "https://docs.oracle.com/cloud-machine/latest/jcs_gs/dcommon/img/cloudgs_java.png"}];
			   
  			 conversation.variable(variable, lista);
             conversation.keepTurn(true);
             conversation.transition();
             done();
            }
    };
