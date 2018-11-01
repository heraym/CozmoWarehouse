"use strict"

var log4js = require('log4js');
var logger = log4js.getLogger();
var Data_Services = require('../data_services'); 

module.exports =
    {
        metadata: () => ({
            "name": "ar.hacerPedido",
            "properties": {
                "variable": {"type": "string", "required": true} 
            },
            "supportedActions": []
        }),
        invoke: (conversation, done) => {
             
            var nomvariable = conversation.properties().variable;
            var userId = "";                
             if (conversation.channelType() == "facebook") {
                       userId = conversation.payload().sender.id;
              }
              else {
                 userId = conversation.payload().userId;
              }
             
             var data_services = new Data_Services();
             data_services.hacerPedido(callback);
             //conversation.reply({text: "El pedido sera enviado en breve!" });
             conversation.transition();
             done();

             function callback() {}
            }
    };
