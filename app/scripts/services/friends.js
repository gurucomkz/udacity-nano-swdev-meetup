/**
 * @ngdoc service
 * @name appMeetupApp.Friends
 * @description
 * # Friends
 * Factory in the appMeetupApp.
 */
angular.module('appMeetupApp')
.factory('Friends', function () {
    'use strict';

    var allFriends = {
        "1": {"id": "1", "name": "Lancelot Berry", "avatar": "images/ignore/user4.jpg"},
        "2": {"id": "2", "name": "Marc Alexander", "avatar": "images/ignore/user4.jpg"},
        "3": {"id": "3", "name": "Sheridan Davies", "avatar": "images/ignore/user5.jpg"},
        "4": {"id": "4", "name": "Joshua Paul", "avatar": "images/ignore/user1.jpg"},
        "5": {"id": "5", "name": "James Mason", "avatar": "images/ignore/user8.jpg"},
        "6": {"id": "6", "name": "Damon Roberts", "avatar": "images/ignore/user2.jpg"},
        "7": {"id": "7", "name": "Abner Mcintyre", "avatar": "images/ignore/user1.jpg"},
        "8": {"id": "8", "name": "Samson Love", "avatar": "images/ignore/user5.jpg"},
        "9": {"id": "9", "name": "Egan Field", "avatar": "images/ignore/user3.jpg"},
        "10": {"id": "10", "name": "Finbar Kemp", "avatar": "images/ignore/user1.jpg"},
        "11": {"id": "11", "name": "Lombard Hutchinson", "avatar": "images/ignore/user7.jpg"},
        "12": {"id": "12", "name": "Seth Owen", "avatar": "images/ignore/user3.jpg"},
        "13": {"id": "13", "name": "Kerry Sutherland", "avatar": "images/ignore/user6.jpg"},
        "14": {"id": "14", "name": "Tobias Chambers", "avatar": "images/ignore/user4.jpg"},
        "15": {"id": "15", "name": "Elmer Lopez", "avatar": "images/ignore/user3.jpg"},
        "16": {"id": "16", "name": "Quillan Nicholson", "avatar": "images/ignore/user2.jpg"},
        "17": {"id": "17", "name": "Darell Gilbert", "avatar": "images/ignore/user7.jpg"},
        "18": {"id": "18", "name": "Hugh Rowe", "avatar": "images/ignore/user2.jpg"},
        "19": {"id": "19", "name": "Stan Butler", "avatar": "images/ignore/user1.jpg"},
        "20": {"id": "20", "name": "Kimball Reynolds", "avatar": "images/ignore/user5.jpg"},
        "21": {"id": "21", "name": "Brock Duncan", "avatar": "images/ignore/user2.jpg"},
        "22": {"id": "22", "name": "Benton Poole", "avatar": "images/ignore/user2.jpg"},
        "23": {"id": "23", "name": "Earl Hunt", "avatar": "images/ignore/user1.jpg"},
        "24": {"id": "24", "name": "Paxton Cunningham", "avatar": "images/ignore/user6.jpg"},
        "25": {"id": "25", "name": "Efrain Wells", "avatar": "images/ignore/user3.jpg"},
        "26": {"id": "26", "name": "Goddard Gregory", "avatar": "images/ignore/user6.jpg"},
        "27": {"id": "27", "name": "Atwater Ford", "avatar": "images/ignore/user2.jpg"},
        "28": {"id": "28", "name": "Trevor Ryan", "avatar": "images/ignore/user2.jpg"},
        "29": {"id": "29", "name": "Allan Davis", "avatar": "images/ignore/user1.jpg"},
        "30": {"id": "30", "name": "Landry Adams", "avatar": "images/ignore/user2.jpg"},
        "31": {"id": "31", "name": "Errol Hunter", "avatar": "images/ignore/user5.jpg"},
        "32": {"id": "32", "name": "Noel Harper", "avatar": "images/ignore/user1.jpg"},
        "33": {"id": "33", "name": "Seymour O connor", "avatar": "images/ignore/user2.jpg"},
        "34": {"id": "34", "name": "Magnus Carter", "avatar": "images/ignore/user8.jpg"},
        "35": {"id": "35", "name": "Ridley Frost", "avatar": "images/ignore/user6.jpg"},
        "36": {"id": "36", "name": "Edric Fraser", "avatar": "images/ignore/user5.jpg"},
        "37": {"id": "37", "name": "Lionel Smith", "avatar": "images/ignore/user7.jpg"},
        "38": {"id": "38", "name": "Bud Clarke", "avatar": "images/ignore/user4.jpg"},
        "39": {"id": "39", "name": "Erskine Webb", "avatar": "images/ignore/user3.jpg"},
        "40": {"id": "40", "name": "Russell Garcia", "avatar": "images/ignore/user6.jpg"},
        "41": {"id": "41", "name": "Spencer Russell", "avatar": "images/ignore/user3.jpg"},
        "42": {"id": "42", "name": "Eugene Davey", "avatar": "images/ignore/user1.jpg"},
        "43": {"id": "43", "name": "Nicholas Moran", "avatar": "images/ignore/user4.jpg"},
        "44": {"id": "44", "name": "Fitzgerald Robson", "avatar": "images/ignore/user1.jpg"},
        "45": {"id": "45", "name": "Rupert Fernandez", "avatar": "images/ignore/user4.jpg"},
        "46": {"id": "46", "name": "Aiken Haynes", "avatar": "images/ignore/user4.jpg"},
        "47": {"id": "47", "name": "Dorian Khan", "avatar": "images/ignore/user5.jpg"},
        "48": {"id": "48", "name": "Christopher Lopez", "avatar": "images/ignore/user5.jpg"},
        "49": {"id": "49", "name": "Baird Smith", "avatar": "images/ignore/user8.jpg"},
        "50": {"id": "50", "name": "Roger Hall", "avatar": "images/ignore/user6.jpg"}
    };

    return {
        get: function(id){
            return allFriends[id];
        },
        list: function () {
            return allFriends;
        }
    };
});
