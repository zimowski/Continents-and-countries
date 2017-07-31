app.controller('countriesAndContinentsListController', function countriesAndContinentsListController($scope, statesFactory) {
    // Lista krajów wraz z kontynentami
    $scope.countriesList = false;
    // Oznaczone kontynenty
    $scope.checkedRegions = [];
    // Czy pokazywać tylko kontynenty
    $scope.showOnlyContinents = false;
    // Szukana fraza
    $scope.phrase = null;
    // Sortowanie krajów po kolumnie
    $scope.sortCountryBy = 'name';

    statesFactory.getList().then(function (response) {
        $scope.countriesList = response.data;
    }, function (response) {
        $scope.countriesList = false;
        $scope.error = true;
    });

    /**
     * Oznaczanie kraju
     * @param {object} country Informacje o kraju
     */
    $scope.selectCountry = function (country) {
        country.checked = !country.checked;

        // Sprawdzanie czy wszystkie kraje zostały oznaczone
        if ($scope.isSeletedAllCountries(country.region)) {
            // Oznaczanie kontynentu
            $scope.selectAll(country.region);
        } else {
            var index = $scope.checkedRegions.indexOf(country.region);
            // Sprawdzanie czy kontynent jest oznaczony
            if (index > -1) {
                // Odznaczanie kontynentu
                $scope.checkedRegions.splice(index, 1);
            }
        }
    };

    /**
     * Czy oznaczone zostały wszystkie kraje
     * @param   {string} region Kontynent
     * @returns {boolean} Status
     */
    $scope.isSeletedAllCountries = function (region) {
        var state = true;
        angular.forEach($scope.countriesList, function(city) {
            if (city.region == region && !city.checked) {
                state = false;
            }
        });
        return state;
    };

    /**
     * Oznaczanie/odznaczanie regionu
     * @param {string} region Nazwa regionu
     */
    $scope.selectAll = function (region) {
        var index = $scope.checkedRegions.indexOf(region);

        if (index > -1) {
            $scope.checkedRegions.splice(index, 1);
        } else {
            $scope.checkedRegions.push(region);
        }

        angular.forEach($scope.countriesList, function(city) {
            if ($scope.phrase) {
                if (city.region == region && city.name.toUpperCase().search($scope.phrase.toUpperCase()) > -1) {
                    city.checked = (index > -1) ? false : true;
                }
            } else {
                if (city.region == region) {
                    city.checked = (index > -1) ? false : true;
                }
            }
        });
    };

    /**
     * Odznaczanie wszystkich krajów
     */
    $scope.unselectAll = function () {
        angular.forEach($scope.countriesList, function(city) {
            city.checked = false;
        });
    };

    $scope.findCountry = function (phraseText) {
        $scope.checkedRegions = [];
        $scope.unselectAll();
        $scope.phrase = angular.copy(phraseText);
    };
});
