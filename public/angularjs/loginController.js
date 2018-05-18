var login = angular.module('myApp',[]);

console.log("I am in login");

login.controller('loginController',function($scope,$http) {
	console.log("I am in login controller");
    $scope.emailrequired = false;
    $scope.passwordrequired = false;
    $scope.invalidpassword = false;
    $scope.invalidemail = false;

    $scope.btn_signin=function() {
        console.log("just to check in sign in");

        var proceed = 1;
        if($scope.email == "")
        {
        	console.log("email cant");

            $scope.emailrequired = true;
            proceed = 0;
        }else{
            $scope.emailrequired = false;
        }
        if($scope.password == "")
        {
        	console.log("password cant");
            $scope.passwordrequired = true;
            $scope.invalidpassword = false;
            proceed = 0;
        }else{
            $scope.passwordrequired = false;
        }
        console.log(proceed);

         if(proceed){
			$scope.jsondata = {
                    "email": $scope.email,
                    "password": $scope.password
				 }
         $http.post('/userhome',$scope.jsondata).then(function(data,status){
         	if(data.data.status ==200){
         		console.log("Success");
		        window.location.assign('/userhome');

         	}
         	else if(data.data.status ==201){
         		$scope.invalidpassword = true;

         	}
         	else if(data.data.status ==202){
         		$scope.invalidemail = true;

         	}
	     })
     }

};
});


