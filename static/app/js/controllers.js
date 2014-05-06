var ressourcesApp = angular.module('ressourcesApp', []);

ressourcesApp.controller('ProjectListCtrl', function ($scope) {
  $scope.projects = [
    {'name': 'Nexus S'},
    {'name': 'Motorola XOOM™ with Wi-Fi'},
    {'name': 'MOTOROLA XOOM™'}
  ];
});
