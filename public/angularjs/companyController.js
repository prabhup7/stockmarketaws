var company = angular.module('myApp',[]);

console.log("I am in company");

company.controller('companyCon',function($scope,$http) {
	console.log("I am in company controller");
    $scope.getCompany=function() {
        console.log("I am in get company controller");
    $http.get("/company")
    .then(function(response) {
        console.log("C:"+response);
        $scope.companies = response.data;
    });
}
});

