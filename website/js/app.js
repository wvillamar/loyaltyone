
var plus = "+";
var minus = "-";
var apixuApi = "https://api.apixu.com/v1/current.json?key=3ed93e6fc2cd42149e1150933191503&q="
var apixuIcons = "http://www.apixu.com/static/weather/64x64/<day>/<icon>";
var endpoint = "https://j0jjemeyy5.execute-api.us-east-1.amazonaws.com/dev/api/";
var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http, $compile) {
    $scope.entry = $scope.entry || {};

    $http.get(endpoint + "entries")
    .then((response) => {
        response.data.results.forEach($scope.loadEntry);
    });

    $scope.formDone = function(entry){
        if(!entry) return;
        if(isEmpty(entry.username) && isEmpty(entry.city) && isEmpty(entry.text)) return;

        var data = {
            username: entry.username,
            city: entry.city,
            text: entry.text
        };

        var config = {
        };

        var addEndpoint = endpoint + 'entry';
        var isResponse = !isEmpty(entry.id);

        if(isResponse){
            addEndpoint += '/' + entry.id.trim() + '/response';
        }

        $http.post(addEndpoint, data, config)
        .then((response, status, headers, config) => {
            $scope.loadEntry(response.data.result);
        });
    }

    $scope.loadEntry = function (item){
        var d = document.createElement("div");
        d.setAttribute("id", "entry-" + item.id);

        var s = $scope.getEntry(item);

        d.innerHTML = s;

        var isResponse = !isEmpty(item.parent_id);

        if(!isResponse){
            document.getElementById("data").appendChild(d);
        }
        else{
            document.getElementById("data-" + item.parent_id).appendChild(d);
        }

        $compile(d)($scope);
    }

    $scope.getEntry = function(item){
        var s = "<p>"
            + "<a href='javascript: return false;' ng-click=\"respondTo('" + item.id + "')\"><span id='expand-" + item.id + "'>" + plus + "</span></a> "
            + item.username
            + (item.city ? " from <a href='#' ng-click=\"weather('" + item.city + "')\">" + item.city + "</a>" : "")
            + (item.text ? " says " + item.text : "")
            + " - " + item.createdAt
            + "</p>"
            + "<div id='data-" + item.id + "' name='data-" + item.id + "' style='padding-left: 25px;'></div>"
        ;

        return s;
    }

    $scope.weather = function(city){
        $http.get(apixuApi + city)
        .then((response) => {
            var s = $scope.getWeatherInfo(response.data);
            alert(s);
        })
        .catch((response) => {
            var s = $scope.getWeatherError(response.data);
            alert(s);
        });
    }

    $scope.getWeatherInfo = function(city){
        var lat = city.location.lat;
        var lon = city.location.lon;
        var temp_c = city.current.temp_c;
        var temp_f = city.current.temp_f;
        var text = city.current.condition.text;

        var s = text
            + "\nTemperature celsius: " + temp_c
            + "\nTemperature fahrenheit: " + temp_f
            + "\nLatitude: " + lat
            + "\nLongitude: " + lon
        ;

        return s;
    }

    $scope.getWeatherError = function(error){
        var code = error.error.code;
        var message = error.error.message;

        var s = "Error (" + code + "): " + message;
        return s;
    }

    $scope.respondTo = function(id){
        var expand = document.getElementById('expand-' + id).innerHTML;
        var isExpanded = expand.indexOf(minus) >= 0;

        if(!isExpanded){
            $http.get(endpoint + "entry/" + id + "/responses")
            .then((response) => {
                response.data.results.forEach($scope.loadEntry);
                document.getElementById('expand-' + id).innerHTML = minus;
            });

            $scope.entry.id = id;
        }
        else{
            document.getElementById("data-" + id).innerHTML = "";
            document.getElementById('expand-' + id).innerHTML = plus;
            $scope.entry.id = "";
        }
    }

    $scope.clearRespondTo = function(){
        $scope.entry.id = "";
    }
});

function isEmpty(str) {
    return (!str || 0 === str.trim().length);
}
