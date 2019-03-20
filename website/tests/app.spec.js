
describe('Testing LoyaltyOne App', function(){ 
    beforeEach(module('myApp'));
    describe('Testing LoyaltyOne Entry and Weather functions',function(){

        var $scope, ctrl;

        beforeEach(inject(function($controller, $rootScope){
            $scope = $rootScope.$new();
            ctrl = $controller('myCtrl', {$scope});
        }));

        it('Should return proper weather information', function(){ 
            var location = {
                lat: 43.67,
                lon: -79.42
            };

            var condition = {
                text: 'Partly cloudy'
            }

            var current = {
                temp_c: 2,
                temp_f: 35.6,
                condition: condition
            };

            var city = {
                location: location,
                current: current
            };

            var weatherInfo = $scope.getWeatherInfo(city);
            expect(weatherInfo).toContain("Partly cloudy");
            expect(weatherInfo).toContain("Temperature celsius: 2");
            expect(weatherInfo).toContain("Temperature fahrenheit: 35.6");
            expect(weatherInfo).toContain("Latitude: 43.67");
            expect(weatherInfo).toContain("Longitude: -79.42");
        });

        it('Should return weather error', function(){ 
            var errorInfo = {
                code: 1006,
                message: 'No matching location found.'
            };

            var error = {
                error: errorInfo
            };

            var weatherError = $scope.getWeatherError(error);
            expect(weatherError).toEqual("Error (1006): No matching location found.");
        });

        it('Should return proper entry information', function(){
            var item = {
                id: 'ID_KEW8382938SL329',
                username: 'William',
                city: 'Toronto',
                text: 'hello LoyaltyOne team',
                parent_id: 'PARENT_ID_DU382938SL329',
                updatedAt: '2019-03-20T01:05:54.962Z',
                createdAt: '2019-03-20T01:05:54.962Z'
            };

            var entry = $scope.getEntry(item);
            expect(entry).toContain("<a");
            expect(entry).toContain("William from");
            expect(entry).toContain("Toronto");
            expect(entry).toContain("says hello LoyaltyOne team");
            expect(entry).toContain("2019-03-20T01:05:54.962Z");
            expect(entry).toContain("</a>");
        });
    });
});
