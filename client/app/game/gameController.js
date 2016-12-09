// client/app/game/gameController.js
angular.module('tetris.game', [])

.controller('GameController', function($scope, logic) {
  $scope.matrix = logic.rendered;
  // console.log(JSON.stringify($scope.matrix));
  $scope.skip = true;

  logic.renderCB = function(matrix) {
    // console.log('CALLBACKS!!!', JSON.stringify(matrix));
    // $scope.$apply();
    $scope.matrix = matrix;
    if (!$scope.skip) {
      $scope.$apply();
    } else {
      $scope.skip = false;
    }
  };

  logic.anchor = logic.start();
  logic.setValAtCoords(logic.field, 3, 12, 'r');
  logic.tick(logic.piece, logic.anchor, logic.field, 800);

  var color = function(spot) {
    console.log(spot);
    return spot === 1 ? 'red' : 'blue';
  };

  $scope.key;

  $scope.onKeydown = function(keycode) {
    if (keycode === 37) {
      $scope.key = 'left';
    } else if (keycode === 38) {
      $scope.key = 'up';
    } else if (keycode === 39) {
      $scope.key = 'right';
    } else if (keycode === 40) {
      $scope.key = 'down';
    }
  };

});

var mod = angular.module('mydirectives', []);
mod.directive('onKeydown', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      var functionToCall = scope.$eval(attrs.onKeydown);
      elem.on('keydown', function(e) {
        functionToCall(e.which);
      });
    }
  };
});
