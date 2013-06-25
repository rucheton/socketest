'use strict';

/* Directives */

angular.module('myApp.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }).
  directive('eatClick', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    }
}).directive('fastClick', function() {
    return function(scope, element, attr) {
        $(element).fastClick(function(e) {
            scope.$apply(attr.fastClick);
        })
    };
}).directive('qrcode', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        console.log(attr.qrcode);

        scope.$watch(
          function(){
            return attr.qrcode;
          },
          function(value){
            if(!value) return;

            new QRCode(element[0], {
              text: attr.qrcode,
              width: 160,
              height: 160,
              colorDark : "#000000",
              colorLight : "#ffff00",
              correctLevel : QRCode.CorrectLevel.H
            });
          });
       
      }
    };
  });
