// Module
var myApp = angular.module('myApp', ['ngRoute', 'ngResource']);
var API_KEY = '332aad3c356692a5cb9d8e34eb43272f';

// SERVICE/FACTORY/MODEL
myApp.service('myService', ['$http', function($http) {
return {
/*//http://api.openweathermap.org/data/2.5/forecast/daily?APPID=332aad3c356692a5cb9d8e34eb43272f

//http://api.openweathermap.org/data/2.5/weather?q=London&APPID=332aad3c356692a5cb9d8e34eb43272f
    this.url :'http://api.openweathermap.org/data/2.5/weather',
    this.city : "San Francisco, CA",
    this.githubUser : "",*/



    addUser : function(userObj) {
      
      var storedObject = {
        username : userObj.login,
        name : userObj.name,
        image : userObj.avatar_url,
        blog : userObj.blog,
        followers : userObj.followers,
        following : userObj.following,
        location : userObj.location,
        updated_at : userObj.updated_at
      }

      console.log("From controller to Service:", storedObject);
      return $http.post('/', storedObject)
      .then(function(res){
        console.log("From controller to Service:", res.data);
        return res.data;
      }).catch(function(err) {
        console.log(err);
      })
    },

    getUsers : function() {
      return $http.get('/directory')
      .then(function(res) {
        return res.data;
      });
    },

    deleteUserFromDatabase : function(deleteUser) {

      return $http.post('/directory', deleteUser);

    }
}
}])


// SETUP CONTROLLERS
  // HOME PAGE CONTROLLER
myApp.controller('homeController', ['$scope', 'myService', function($scope, myService) {

  $scope.city = myService.city;
  $scope.githubUser = myService.githubUser;
  console.log("Home Controller : ", myService.githubUser);

  $scope.$watch('city', function() {
    
    myService.city = $scope.city;
    console.log("Home Controller : ", myService.city);
  })

  $scope.$watch('githubUser', function() {
    
    myService.githubUser = $scope.githubUser;

  })

  $scope.postUser = function(newUser) {
    
    $scope.data = [];

    console.log("postUser from ng-submit is getting invoked", newUser);

    myService.addUser( { username : newUser  } )
    .then(function(newUser) {
      console.log(newUser);
      $scope.data.push(newUser);
      console.log("$scope.data.push :", $scope.data);
    }).catch(function(err) {
      console.log("\n\n\n---------------\n", err);
    })
  }



}]);


// SETUP CONTROLLERS
  // FORECAST CONTROLLER
/*myApp.controller('forecastController', ['$scope', '$resource', 'myService', function($scope, $resource, myService) {

  $scope.city = myService.city;
  console.log("forecastController: ", $scope.city);
  
  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/weather", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});

  $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 2 });

  console.log("Resulting API: ", $scope.weatherResult);

}]);*/

// SETUP CONTROLLERS
  // GITHUB CONTROLLER
myApp.controller('gitHubDataController', ['$scope', '$http', 'myService', function($scope, $http, myService){

  $scope.username = myService.githubUser;
  console.log("$scope: ", $scope, "myService: ", myService.githubUser);
  
  $scope.userData = {
        login: "ksiddana",
        avatar_url: "https://avatars.githubusercontent.com/u/5177889?v=3",
        name: "Karun Siddana",
        blog: "http://www.karunsiddana.com",
        location: "United States",
        followers: 9,
        following: 31,
        updated_at: "2015-12-07T19:48:04Z"
      }

  if ($scope.username !== '') {

    console.log("Entering here");

    $http.get("https://api.github.com/users/" + $scope.username)
            .success(function (data) {
              $scope.userData = data;
              myService.addUser($scope.userData);
            })
            .then(function(data) {
              console.log($scope.userData);
            })
  }

}]);
  
// Making a controller for loading up the Results from the Database.
myApp.controller('directoryController', ['$scope', 'myService', function($scope, myService) {

    $scope.fetchUsers = function() {
      myService.getUsers().then(function(data){
        console.log("Tring to get users from the database", data);
        $scope.data = data;
      })
    }

    $scope.deleteUser = function(deleteUserObj) {
      console.log("Trying to Delete User", deleteUserObj);
      // myService.deleteUser()
      myService.deleteUserFromDatabase(deleteUserObj)
    }

  $scope.fetchUsers();

}])


// ROUTES
// Depending on how man pages and links you can setup 2 controllers
myApp.config(function ($routeProvider) {

  $routeProvider

  .when('/', {
    templateUrl: 'pages/home.html',
    controller: 'homeController'
  })

/*  .when('/forecast', {
    templateUrl: 'pages/forecast.html',
    controller: 'forecastController'
  })

  .when('/forecast/:days', {
    templateUrl: 'pages/forecast.html',
    controller: 'forecastController'
  })*/

  .when('/github', {
    templateUrl: 'pages/github.html',
    controller: 'gitHubDataController'
  })

  .when('/directory', {
    templateUrl: 'pages/directory.html',
    controller: 'directoryController'
  })

});

