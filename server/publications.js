import {Events} from '/lib/data/eventsData.js';


  Meteor.publish('events', function(){

    console.log('publicizing');
    
    return Events.find();

  });