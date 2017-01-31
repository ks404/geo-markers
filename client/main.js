import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';


Router.route('/');

import './main.html';

import "/imports/ui/userview.js";

import "/imports/ui/adminview.js";

import "/lib/data/eventsData.js";

import "/imports/ui/test.js";

import "/imports/ui/adminlist.js";




function initMap() {


      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 9,
          center: {lat: 41.663, lng: -88.044}
        });

    };
