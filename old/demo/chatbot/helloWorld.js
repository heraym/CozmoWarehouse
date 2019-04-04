"use strict"

var log4js = require('log4js');
var logger = log4js.getLogger();

module.exports =
    {
        metadata: () => ({
            "name": "hello.world",
            "properties": {
                "nombre": {"type": "string", "required": true} 
            },
            "supportedActions": []
        }),
        invoke: (conversation, done) => {
             
            var nombre = conversation.properties().nombre;
            
             conversation.reply({text: "Hola " + nombre});
             conversation.transition();
             done();
             
            }
    };
