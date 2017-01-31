Router.route('/adminlist', {

  waitOn: function() {

    return Meteor.subscribe('events'); // loads subscription before rendering template

  },

});

import "./adminlist.html";

import {Events} from '/lib/data/eventsData.js';





Template.adminlist.helpers({
   
   /* 
   myCollection: function () {
        return Events;
    },
  */


    tableSettings : function () {
        return {
            collection: Events,
            fields: [
                { key: 'date', label: 'Date' },
                { key: 'gametype', label: 'Tourney Type' },
                { key: 'players', label: '# of Players' },
                { key: 'price', label: 'Price' },
                { key: 'addr', label: 'Address' },
                { key: 'course', label: 'Course Name' },
                { key: 'delete', label: 'Delete', fn: function () { return new Spacebars.SafeString('<button type="button" class="deletebtn">Delete</button>') } }
            ]
        }
      }


});


Template.adminlist.events({
  'click .reactive-table tbody tr': function (event) {
    event.preventDefault();
    var objToDelete = this;
    // checks if the actual clicked element has the class `deletebtn `
    if (event.target.className == "deletebtn") {
     Events.remove(objToDelete._id)
    }
  }
});