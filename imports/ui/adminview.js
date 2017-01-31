Router.route('/adminview');

import "./adminview.html";

import {Events} from '/lib/data/eventsData.js';






function checkAddr(addr) {


      var geocoder = new google.maps.Geocoder();

      var resultsMap = new google.maps.Map(document.getElementById('map'));

      console.log(addr); 

      geocoder.geocode(

      {'address': addr}, 

/* call back */

      function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            resultsMap.setZoom(10);


      var marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: resultsMap,

            });

        
            var loc = results[0].geometry.location;



            Session.set("checkedLoc", loc);

            console.log(loc);

          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });

  };



Template.adminview.onRendered(


function () {


      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 9,
          center: {lat: 41.663, lng: -88.044}
        });



  
});


Template.adminview.events({

  'submit .newEvent' (e) 

  {


    e.preventDefault();


    let date = document.getElementById("dateId").value;

    let gametype = document.getElementById("typeId").value;

    let players = document.getElementById("playersId").value;

    let price = Number(document.getElementById("priceId").value);

    let addr = document.getElementById("addressId").value;

    let course = document.getElementById("courseId").value;

    checkAddr(addr);


    Session.set("cardcheck", {date,gametype,players,price,addr,course});


    $(".card").fadeIn(1000);


  },

  'click .addData' () 

  {


    console.log('add data');

    newdata = Session.get('cardcheck');

    console.log(newdata.date);

    Events.insert({

      date: newdata.date,
      gametype: newdata.gametype,
      players: newdata.players,
      price: newdata.price,
      addr: newdata.addr,
      course: newdata.course,
      cords: newdata.cords,

    });

    $(".card").fadeOut(500);


  },



});

Template.adminview.helpers ({

  "cardfill": function() {

    info = Session.get('cardcheck');



    return info;

    },


})




