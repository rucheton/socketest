'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');


app.factory('socket', function ($rootScope) {
  var socket = false;
  return {
  	init: function(namespace) {
  		namespace = namespace == undefined ? '' : namespace;
  		var url = window.location.href + namespace;
  		console.log(url);
  		socket = io.connect(url);
  	},
    on: function (eventName, callback) {
    	if(!socket) return;
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
    	if(!socket) return;
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };

});