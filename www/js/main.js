angular.module('FastText', ['ngSanitize']).controller('MainController', function ($scope, $http) {
    
    $scope.BibliaJSON = null;
    $scope.testeJson = null;
    $http.get('js/bible_full.json').success(function (response) {
        $scope.BibliaJSON = response;
        extrairLivros();
    });

    var Livros = [];
    var extrairLivros = function () {
        angular.forEach($scope.BibliaJSON, function (livro, counter) {
            Livros.push(livro.Nome);
        });
    }

    $scope.showLivros = Livros;
    $scope.filtro = '';

    $scope.filtroChange = function () {
        var filtroTemp = removeDiacritics($scope.filtro).toLowerCase();

        $scope.showLivros = [];
        angular.forEach(Livros, function (livro, counter) {
            if (removeDiacritics(livro.toLowerCase()).startsWith(filtroTemp))
                $scope.showLivros.push(livro);
        });
    }

    var removeDiacritics = function (s)
    {
        var s;
        var diacritics =[
            /[\300-\306]/g, /[\340-\346]/g,  // A, a
            /[\310-\313]/g, /[\350-\353]/g,  // E, e
            /[\314-\317]/g, /[\354-\357]/g,  // I, i
            /[\322-\330]/g, /[\362-\370]/g,  // O, o
            /[\331-\334]/g, /[\371-\374]/g,  // U, u
            /[\321]/g, /[\361]/g, // N, n
            /[\307]/g, /[\347]/g, // C, c
        ];

        var chars = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];

        for (var i = 0; i < diacritics.length; i++)
            s = s.replace(diacritics[i],chars[i]);
        
        return s;
    }

    $scope.passo = 1;

    $scope.pesquisarCapitulos = function (livro) {
        $scope.passo = 2;
        $scope.capituloSelecionado = 'Livros/Genesis/Capitulo 2.html';
    }
});

