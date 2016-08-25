'use strict';

/**
 * @ngdoc directive
 * @name appMeetupApp.directive:pwGuide
 * @description
 * # pwGuide
 */
angular.module('appMeetupApp')
.directive('pwGuide', [

function () {
    var minLength = 8;

    var hasUpper = function(str){
            return !!str.match(/[A-Z]/);
        },
        hasLower = function(str){
            return !!str.match(/[a-z]/);
        },
        hasNum = function(str){
            return !!str.match(/[0-9]/i);
        },
        hasPunct = function(str){
            return !!str.match(/[\.{}^\\\/&*)(!@#$%=+~`-]/i);
        },
        hasLength = function(str){
            return str.length>=minLength;
        };
    var tests = {
            upper: hasUpper,
            lower: hasLower,
            num: hasNum,
            punct: hasPunct,
            length: hasLength
        };
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function postLink(scope, element, attrs, ctrl) {
            if (!ctrl) {
                return;
            }

            //TODO: add $watch minlength
            //TODO: add support for setting list of tests by attribute

            var wrap = angular.element('<div class="pw-validator-wrap"></div>'),
                signaler = angular.element('<div class="pw-validator-signaler ok"></div>');

            for(var testName in tests){
                var signalObj = angular.element('<b></b>');
                if(testName === 'length'){
                    signalObj.attr('len', minLength);
                }
                signalObj.addClass('pwvs-'+testName);
                signaler.append(signalObj);
            }

            wrap.append(signaler);
            element.wrap(wrap);

            //must restore broken links after append/wrap
            wrap = element.parent();
            signaler = angular.element(wrap[0].querySelector('.pw-validator-signaler'));

            function testAll(str){
                var valid = true;
                for(var testName in tests){
                    var testPassed = tests[testName](str),
                        signalObj = angular.element(signaler[0].querySelector('.pwvs-'+testName));

                    if(testPassed){
                        signalObj.addClass('ok');
                    }else{
                        signalObj.removeClass('ok');
                        valid = false;
                    }
                }
                if(valid){
                    signaler.addClass('ok');
                }else{
                    signaler.removeClass('ok');
                }
                return valid;
            }

            ctrl.$validators.guide = function(modelValue, viewValue) {
                var empty = ctrl.$isEmpty(viewValue);
                if(empty){
                    //let's be pretty
                    signaler.addClass('ok');
                    signaler.find('b').removeClass('ok');
                }
                return empty || testAll(viewValue);
            };
        }
    };
}]);
