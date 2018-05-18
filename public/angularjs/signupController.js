var signup = angular.module('myApp',[]);

console.log("I am in signup");

signup.controller('signupController',function($scope,$http) {
	console.log("I am in signup controller");
	$scope.firstnamerequired = false;
    $scope.lastnamerequired = false;
    $scope.emailrequired = false;
    $scope.passwordrequired = false;
    $scope.emailexists = false;

    $scope.btn_signup=function() {
        console.log("just to check in sign up");

        var proceed = 1;

        if($scope.firstname == null)
        {
            $scope.firstnamerequired = true;
            proceed = 0;
        }else{
            $scope.firstnamerequired = false;
        }

        if($scope.lastname == null)
        {
            $scope.lastnamerequired = true;
            proceed = 0;
        }else{
            $scope.lastnamerequired = false;
        }

        if($scope.phonenumber == null)
        {
            $scope.phonerequired = true;
            proceed = 0;
        }else{
            $scope.phonerequired = false;
        }
        if($scope.email == "")
        {
            $scope.emailrequired = true;
            proceed = 0;
        }else{
            $scope.emailrequired = false;
        }
        if($scope.password == "")
        {
            $scope.passwordrequired = true;
            proceed = 0;
        }else{
            $scope.passwordrequired = false;
        }


         if(proceed){
			$scope.jsondata = {
				 	 "firstName": $scope.firstname,
                    "lastName": $scope.lastname,
                    "email": $scope.email,
                    "password": $scope.password,
                    "phoneNumber":$scope.phonenumber
				 }
         $http.post('/registerUser',$scope.jsondata).then(function(data,status){
         	if(data.data.status ==200){
         		console.log("Success");
		        window.location.assign('/registerUser');

         	}
         	else if(data.data.status ==201){
         		$scope.emailexists = true;

         	}
	     })
     }

};
});
/*



  	$scope.create = function(){
	console.log("Inside create button");
	 $scope.jsondata = {
	 	"bookName":$scope.bookName,
	 	"author":$scope.author,
	 	"numOfPages":$scope.nop,
	 	"publisher":$scope.publisher
	 }

	 $http.post('/createBook',$scope.jsondata).then(function(data,status){
	        console.log("Success");
	     })
}

	 $scope.update = function(){
	console.log("Inside update button");
	 $scope.jsondata = {
	 	"bookName":$scope.bookName,
	 	"author":$scope.author
	 }

	 $http.put('/updateBook',$scope.jsondata).then(function(data,status){
	        console.log("Success");
	     })
}


$scope.delete = function(){
	console.log("Inside delete button");
	 $scope.jsondata = {
	 	"id":$scope.id
	 }
	 console.log($scope.id);

	 $http.post('/deleteBook',$scope.jsondata).then(function(data,status){
	        console.log("Success");
	     })
}*/


