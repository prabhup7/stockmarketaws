
var app = angular.module('myAnalyze', []);
var viz;

app.controller('analyzeController', function($scope, $http) {
console.log($scope.selectedSector);
var flag = true;
$scope.fav=true;
$scope.fav1=true;
$scope.showSectorStats=function(){
  $scope.fav=false;
  var sector = $scope.selectedSector.replace(/\s/g, '');
  

  //alert($scope.selectedSector.replace(/\s/g, ''));
          var containerDiv = document.getElementById("vizContainer"),
              url = "https://public.tableau.com/views/NYSEMarketAnalysis"+sector+"Sector/"+sector+"Dashboard?:embed=y&:display_count=yes",
              options = {
                  hideTabs: true,
                  onFirstInteractive: function () {
                    flag=false;
                      console.log("Run this code when the viz has finished loading.");

                  }
              };
              if(flag===false){
                  viz.dispose();
              }
          viz = new tableau.Viz(containerDiv, url, options);
          $scope.show=true;
          //setInterval(function () {viz.refreshDataAsync() }, 3000);
          //Create a viz object and embed it in the container div.

};



$scope.showYearStats=function(){
  $scope.fav1=false;
  var year = $scope.selectedYear.replace(/\s/g, '');
  
          var containerDiv = document.getElementById("vizContainer"),
              url = "https://public.tableau.com/views/NYSEMarketAnalysis"+year+"/"+year+"Dashboard?:embed=y&:display_count=yes",
              options = {
                  hideTabs: true,
                  onFirstInteractive: function () {
                    flag=false;
                      console.log("Run this code when the viz has finished loading.");

                  }
              };
              if(flag===false){
                  viz.dispose();
              }
          viz = new tableau.Viz(containerDiv, url, options);
          //setInterval(function () {viz.refreshDataAsync() }, 3000);
          //Create a viz object and embed it in the container div.

};

// <script type="text/javascript">
//     function initViz() {
//         var containerDiv = document.getElementById("vizContainer"),
//             url = "https://public.tableau.com/views/NYSEMarketAnalysisBasicIndustriesSector/BasicIndustriesDashboard?:embed=y&:display_count=yes",
//             options = {
//                 hideTabs: true,
//                 onFirstInteractive: function () {
//                     console.log("Run this code when the viz has finished loading.");
//                 }
//             };
//
//         var viz = new tableau.Viz(containerDiv, url, options);
//         // Create a viz object and embed it in the container div.
//     }
// </script>

});
