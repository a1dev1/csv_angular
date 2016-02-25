var app = angular.module( 'App',[ 'ui.bootstrap'] );

app.controller( 'mainCtrl', function ($scope, $http) {
    $scope.datepiker = {
        opened: false
    };

    $scope.toggleDatepicker = function() {
        $scope.datepiker.opened = !$scope.datepiker.opened;
    };
    var selectedTab = 'tab1';
    $scope.selectedDate =  new Date();

    $scope.getData = function( e ){
        if( e ) {
            e.preventDefault();
        }
        
        if( !$scope.selectedDate ) {
            alert( 'please select a date' );
        }
        if( $scope.tabConfig[ selectedTab ].loading ) {
            return;
        }

        var date = $scope.selectedDate.getTime(); 
        if( $scope.tabConfig[ selectedTab ].selectedDate === date ) {
            return;
        }

        $scope.tabConfig[ selectedTab ].loading = true;
        $scope.tabConfig[ selectedTab ].data = '';
        $scope.tabConfig[ selectedTab ].error = false;
        $scope.tabConfig[ selectedTab ].selectedDate = date;
        setTimeout( function() {
            $http.get( $scope.tabConfig[ selectedTab ].jsonurl+'?selectedDate=' + date )
            .then( function( res ) {
                $scope.tabConfig[ selectedTab ].loading = false;
                $scope.tabConfig[ selectedTab ].data = res.data;
            }, function( err ) {
                $scope.tabConfig[ selectedTab ].loading = false;
                $scope.tabConfig[ selectedTab ].error = true;
                console.log( err );

            } );

        }, 1000 )
        

    };
    $scope.tabConfig = {
        tab1: {
            jsonurl: './data/res1.json',
            csvurl: './data/csv1.json',
        },
        tab2: {
            jsonurl: './data/res2.json',
            csvurl: './data/csv2.json',
        },
        tab3: {
            jsonurl: './data/res3.json',
            csvurl: './data/csv3.json',
        }
    }
    $scope.tabSelected = function( tabName )  {
        selectedTab = tabName;

        $scope.getData();
    }


})