app.factory('statesFactory', function productsFactory($http) {
    return {
        /**
         * Pobieranie krajów z serwera
         * @returns {object} Lista krajów
         */
        getList: function () {
            return $http({
                method: 'GET',
                url: '//restcountries.eu/rest/v2/all?fields=name;region'
            });
        },
    };
});
