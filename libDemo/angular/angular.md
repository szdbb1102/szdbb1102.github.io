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
邮箱验证
    <form ng-app="" name="myForm">
        Email:
        <input type="email" name="myAddress" ng-model="text">
        <span ng-show="myForm.myAddress.$error.email">不是一个合法的邮箱地址</span>
    </form>
邮箱验证的状态
    <form ng-app="" name="myForm" ng-init="myText = 'test@runoob.com'">

    Email:
    <input type="email" name="myAddress" ng-model="myText" required>
    <p>编辑邮箱地址，查看状态的改变。</p>
    <h1>状态</h1>
    <p>Valid: {{myForm.myAddress.$valid}} (如果输入的值是合法的则为 true)。</p>
    <p>Dirty: {{myForm.myAddress.$dirty}} (如果值改变则为 true)。</p>
    <p>Touched: {{myForm.myAddress.$touched}} (如果通过触屏点击则为 true)。</p>

    </form>
不同状态下的类名
    <style>
    input.ng-invalid {
        background-color: lightblue;
    }
    </style>
    <body>

    <form ng-app="" name="myForm">
        输入你的名字:
        <input name="myAddress" ng-model="text" required>
    </form>
ng-model 指令根据表单域的状态添加/移除以下类：
    ng-empty
    ng-not-empty
    ng-touched
    ng-untouched
    ng-valid
    ng-invalid
    ng-dirty
    ng-pending
    ng-pristine