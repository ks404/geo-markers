Router.route('/userview', {

  waitOn: function() {

    return Meteor.subscribe('events'); // loads subscription before rendering template

  },

});

import {Events} from '/lib/data/eventsData.js';

import { Meteor } from 'meteor/meteor';

import { ReactiveDict } from 'meteor/reactive-dict';

import "./userview.html";


Template.userview.onCreated(

  function () {
  this.state = new ReactiveDict();
  this.state.set("filters", 'date');
}

);


Template.userview.onRendered(


function addAddr(template) 

{

      var geocoder = new google.maps.Geocoder();

      var resultsMap = new google.maps.Map(document.getElementById('map'), {
          zoom: 9,
          center: {lat: 41.663, lng: -88.044}
        });

      var locs = Events.find().fetch();

    markers = [];


var instance = Template.instance();

    var z = 0; //z variable exists with the bounce effect, to match markers with database 
      
      for (i = 0; i < locs.length; i++) 

    {

      geocoder.geocode(

      {'address': locs[i].addr},


      function(results, status) {
          if (status === 'OK') {

console.log(instance);

      var marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: resultsMap,
          addr: locs[z].addr,
          name: locs[z].course,

            });

        marker.addListener('click', function(event) {
          
          console.log("clicked: ");

          instance.state.set('filters', 'marker');
          instance.state.set('markerloc', marker.name);

console.log(instance.state.get('markerloc'));


      });


      markers.push(marker);

      z = z + 1;


          } else {
            alert('Geocode was not successful for the following reason: ' + status);

            z = z + 1;
          }
        });
      };



  
});

Template.userview.events({


  'click #price': function(event, instance)  {

    console.log(instance);

    instance.state.set('filters', 'price');


  },

  'click #date': function(event, instance)  {

    instance.state.set('filters', 'date');

  },

'click #course': function(event, instance)  {

    instance.state.set('filters', 'course');

  },

  'click .delete': function () {

    Events.remove(this._id);

    },

  'mouseenter .card': function () { // only works on classes, Ids are once per html..?

    var selectedEvent = Events.findOne({_id:this._id}).addr;

    for (var z = 0; z < markers.length; z++) {



      if (selectedEvent === markers[z].addr) {

        markers[z].setAnimation(google.maps.Animation.BOUNCE);

      } else {

        console.log('not yet');

      }; 
    };

    },


    'mouseleave .card': function () { // only works on classes, Ids are once per html..?

    var selectedEvent = Events.findOne({_id:this._id}).addr;


    for (var z = 0; z < markers.length; z++) {



      if (selectedEvent === markers[z].addr) {

        markers[z].setAnimation(null);

      } else {

        console.log('not yet');

      }; 
    };

    }, 
});




Template.userview.helpers({

mydata() {

  // here i will set up filter functions = if price = return price filter data


    const instance = Template.instance();

    var markercheck = Session.get('filters1');
    var markerloc = Session.get('markerloc');

    console.log('run mydata');

    if (instance.state.get('filters') == 'price') {

      var data1 = Events.find( {}, {sort: {price: 1 } }).fetch();

    return {data1}; // if in brackets, returns [object] list

    } else if (instance.state.get('filters') == 'date') {

      var data1 = Events.find( {}, {sort: {date: 1 } }).fetch();

      return {data1}; // if in brackets, returns [object] list

    } else if (instance.state.get('filters') == 'marker') {

      console.log("marker filter");

      var data1 = Events.find({course: instance.state.get('markerloc')}, {sort: {date: 1 } }).fetch();

      return {data1};

    }
      
    var data1 = Events.find( {}, {sort: {date: 1 } }).fetch();

    return {data1}; // if in brackets, returns [object] list

    },

});







