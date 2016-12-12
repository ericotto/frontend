var app = angular.module('Calculator', []);

app.controller('MainCtrl', ['$scope', function($scope) {

    $scope.total = "";

    $scope.clear = function() {
        $scope.total = "";
    }

    $scope.display = function(value) {
        $scope.total += value;
    }

    $scope.solve = function() {
        try {
            $scope.total = math.eval($scope.total);
        } catch(e) {
            $scope.total = 'err';
        }
    }

}])