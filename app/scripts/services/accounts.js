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
    'use strict';

    var accounts = [], currentAccount;

    function _getAccounts(){
        if(!localStorage.accounts){
            localStorage.accounts = JSON.stringify([false]);
        }

        accounts = JSON.parse(localStorage.accounts);
        if(!accounts){
            accounts = [];
        }
    }

    function _saveAccounts(){
        localStorage.accounts = JSON.stringify(accounts);
    }

    function isPresent(user){
        for(var x in accounts){
            var testUser = accounts[x];
            if(!testUser){
                continue;
            }
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

    _getAccounts();
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
            _saveAccounts();
            user.id = accounts.length;
            return true;
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
