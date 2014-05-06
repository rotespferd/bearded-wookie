var ressourcesApp = angular.module('ressourcesApp', []);

ressourcesApp.controller('ProjectListCtrl', function ($scope) {
  $scope.projects = [
    {'name': 'Projekt 1'},
    {'name': 'Projekt 2'},
    {'name': 'Projekt 3'}
  ];
});

ressourcesApp.controller('RessourcenListCtrl', function ($scope) {
  $scope.ressources = [
    {'name': 'Nexus S', 'project': 'Projekt 1'},
    {'name': 'Motorola XOOM™ with Wi-Fi', 'project': 'Projekt 2'},
    {'name': 'MOTOROLA XOOM™', 'project': 'Projekt 1'}
  ];
});
