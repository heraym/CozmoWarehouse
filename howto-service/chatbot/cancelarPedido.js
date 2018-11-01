"use strict"

var log4js = require('log4js');
var logger = log4js.getLogger();
var Data_Services = require('../data_services'); 

module.exports =
    {
        metadata: () => ({
            "name": "ar.cancelarPedido",
            "properties": {
                "pedido": {"type": "string", "required": true} 
            },
            "supportedActions": []
        }),
        invoke: (conversation, done) => {
             
            var pedido = conversation.properties().pedido;
            var userId = "";                
             if (conversation.channelType() == "facebook") {
                       userId = conversation.payload().sender.id;
              }
              else {
                 userId = conversation.payload().userId;
              }
             
             var data_services = new Data_Services();
             data_services.hacerPedido(callback);

             function callback(lista) {
               conversation.reply({text: "El pedido " + pedido + " ha sido cancelado!" });
               conversation.transition();
               done();
              }
            }
    };
