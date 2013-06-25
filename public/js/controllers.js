'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!'
    });

  }).
  controller('MyCtrl1', function ($scope, socket, $routeParams) {

    $scope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

    var ns = Math.random().toString(36).substring(4,8);

    $scope.namespaceLink = window.location.href + 'namespace/' + ns;
    $scope.translateValue = 0;

    socket.init('');
    socket.emit('new:namespace', {namespace:'/namespace/'+ns})
    socket.init('namespace/' + ns);

    socket.on('broadcast:touch', function(data) {
      console.log('touch');
      $scope.translateValue += data.playerIndex == 1 ? -40 : 40;
      $scope.safeApply();
    });

  }).
  controller('MyCtrl2', function ($scope, socket, $routeParams) {

    var ns = $routeParams.namespace;
    var lastTouch = false;
    var touchCount = 0;

    $scope.playerIndex;

    socket.init();
    socket.on('broadcast:player', function(data) {
      $scope.playerIndex = data.playerIndex;
    });
      
    $scope.dispatchTouch = function(touch){
      if(lastTouch != touch)
      {
        touchCount++;

        if(touchCount >= 4)
        {
          socket.emit('event:touch', {playerIndex:$scope.playerIndex});
          touchCount = 0;
        }
      }
      lastTouch = touch;
    }

  });
