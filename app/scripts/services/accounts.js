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
            accounts = [false];
        }
    }

    function _saveAccounts(){
        localStorage.accounts = JSON.stringify(accounts);
    }

    function _getCurrentAccount(){

        if(!currentAccount){
            var accId = localStorage.currentAccount;
            if(accounts[parseInt(accId)]){
                currentAccount = accounts[parseInt(accId)];
            }
        }
        return currentAccount;
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
        localStorage.currentAccount = user.id;
        return (currentAccount = user);
    }
    function checkLogin(email, password){
        email = email.toLowerCase();

        for(var x in accounts){
            var testUser = accounts[x];
            if(testUser && email === testUser.email.toLowerCase()) {
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
            currentAccount = localStorage.currentAccount = null;
        },
        exists: function(){
            return isPresent();
        },
        create: function(user){
            debugger;
            if(!user || !user.name || !user.email) {
                return false;
            }
            if(isPresent(user)){
                return false;
            }
            user.id = accounts.length;
            accounts.push(user);
            _saveAccounts();

            return true;
        },
        current: function(){
            return _getCurrentAccount();
        },
        list: function(){
            return accounts;
        },
        get: function (id) {
            return accounts[parseInt(id)];
        }
    };
});
