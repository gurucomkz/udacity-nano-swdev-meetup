'use strict';

/**
 * @ngdoc service
 * @name appMeetupApp.Accounts
 * @description
 * # Accounts
 *    Name
 *    Email address
 *    Secure password (with character and length requirements)
 *    Optional public biographical information (such as employer, job title, birthday, etc)
 * Factory in the appMeetupApp.
 */
angular.module('appMeetupApp')
.factory('Accounts', function () {

    if(!localStorage.accounts){
        localStorage.accounts = [false];
    }

    var accounts = localStorage.accounts,
        currentAccount = null;

    function isPresent(user){
        for(var x in accounts){
            var testUser = accounts[x];
            if(user.email.toLowerCase() === testUser.email.toLowerCase()) {
                return true;
            }
        }
        return false;
    }
    function doLogin(user){
        return (currentAccount = user);
    }
    function checkLogin(email, password){
        email = email.toLowerCase();

        for(var x in accounts){
            var testUser = accounts[x];
            if(email === testUser.email.toLowerCase()) {
                if(password === testUser.password){
                    return doLogin(testUser);
                }
                return false;
            }
        }
        return false;
    }

    // Public API here
    return {
        login: function(email, password){
            return checkLogin(email, password);
        },
        logout: function(){
            currentAccount = null;
        },
        exists: function(){
            return isPresent();
        },
        create: function(user){
            if(!user || !user.name || !user.email) {
                return false;
            }
            if(isPresent(user)){
                return false;
            }
            accounts.push(user);
            user.id = accounts.length;
        },
        current: function(){
            return currentAccount;
        },
        list: function(){
            return accounts;
        },
        get: function (id) {
            return accounts[id];
        }
    };
});
