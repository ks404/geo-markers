import "./test.html";
import { Meteor } from 'meteor/meteor';

Router.route('/test');

Template.test.helpers({

mydata() {
  var dog = {name: 'Spot', age: 3};
  console.log(dog);
  return dog
},

})