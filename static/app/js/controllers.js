var ressourcesApp = angular.module('ressourcesApp', []);
ressourcesApp.config(['$httpProvider',function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

var baseURL = "http://ressourcenplannung.apiary-mock.com/";

ressourcesApp.controller('OverviewCtrl', function ($scope, $http) {
    $http.get(baseURL + 'projects').success(function(data) {
        $scope.projects = data;

        $scope.ressources = [];

        _.each($scope.projects, function(element, index, list) {
            var projectId = element.id;
            console.log("Project id: " + projectId);
            _.each(element.tasks, function(element, index, list){
                console.log(element);
                
                if(!isObjectInArry(element, $scope.ressources)) {
                    $http.get(baseURL + '/projects/' + projectId + '/tasks/' + element).success(function(data) {
                        console.log(data);
                        $scope.ressources.push(data);
                    });
                    
                }
            });
        });
    }).error(function (data) {
        console.log("ERROR!");
        $scope.projects = [];
    });

    /*$scope.ressources = [
        {'name': 'Nexus S', 'project': 'Projekt 1'},
        {'name': 'Motorola XOOM™ with Wi-Fi', 'project': 'Projekt 2'},
        {'name': 'MOTOROLA XOOM™', 'project': 'Projekt 1'}
    ];*/
});

function isObjectInArry(obj,arr) {
    return (arr.indexOf(obj) != -1);
}