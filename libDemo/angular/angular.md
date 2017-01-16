angular自定义指令中的作用域

    angular.module('myApp', []).directive('first', [ function(){
        return {
            // scope: false, // 默认值，共享父级作用域
            // controller: function($scope, $element, $attrs, $transclude) {},
            restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
            template: 'first name:{{name}}',
        };
    }]).directive('second', [ function(){
        return {
            scope: true, // 继承父级作用域并创建指令自己的作用域
            // controller: function($scope, $element, $attrs, $transclude) {},
            restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
            //当修改这里的name时，second会在自己的作用域中新建一个name变量，与父级作用域中的
            // name相对独立，所以再修改父级中的name对second中的name就不会有影响了
            template: 'second name:{{name}}',
        };
    }]).directive('third', [ function(){
        return {
            scope: {}, // 创建指令自己的独立作用域，与父级毫无关系
            // controller: function($scope, $element, $attrs, $transclude) {},
            restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
            template: 'third name:{{name}}',
        };
    }])
    .controller('DirectiveController', ['$scope', function($scope){
        $scope.name="mike";
    }]);