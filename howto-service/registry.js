'use strict';

module.exports = {
  components: {
   'ar.hacerPedido' : require('./chatbot/hacerPedido'),
   'ar.cancelarPedido' : require('./chatbot/cancelarPedido'),
   'ar.conversador' : require('./chatbot/conversador'),
   'iot.datosSensor' : require('./chatbot/datosSensor')
  }
};
