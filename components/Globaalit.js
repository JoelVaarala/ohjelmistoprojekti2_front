

var fireConf = {
  apiKey: "AIzaSyCSaMZ5QC9BM8UGMssDrasyfVz7ZQuJ9jk",
  authDomain: "ohpro2-f30e5.firebaseapp.com",
  databaseURL: "https://ohpro2-f30e5.firebaseio.com",
  projectId: "ohpro2-f30e5",
  storageBucket: "ohpro2-f30e5.appspot.com",
  messagingSenderId: "670372768079",
  appId: "1:670372768079:web:1ed4eb81ee4c5e6b67bd3a",
  measurementId: "G-D5W1V0RGK8"
};

let keskustelu = '8vrpX2NsjbtVuATcsiqC'

let url1 = '';
let url2 = 'http://192.168.1.133:8080';
let url3 = '';
let jaaninlocalhost = 'http://192.168.56.1:5001/ohpro2-f30e5/us-central1/'; //käytetään firebasen funktioiden testaamiseen
let firebaseurl = 'https://us-central1-ohpro2-f30e5.cloudfunctions.net/'
let herokuurl = "https://ohpro2.herokuapp.com/"

global.myUserData = {
  uid : "",
  idToken : "",
  user: { bio: " asda", tags: ["perunat", "testitag"] },
  filters: {
    tags: ["perunat", "testitagi"
    ],
    minAge: 18,
    maxAge: 500,
    distance: 50000.3,
    lookingFor: [
      "events"
      // ,
      // "users"
    ],
    genders: [
      "male",
      "female",
      "other"
    ],
    eventsInXHours: 3,
    myLocation: {
      latitude: 60,
      longitude: 25
    }

  }
}

//tätä käytetään globaalina variablena että voidaan eri  classeista helposti accessaa frontin/backin osoitteet. 
//masterissa/productionissa käytetään aina tuotantopolkua, ei omia testipatheja

global.matches = "matches"; //kertoo  collectionin nimen, nyt on messages mutta muutetaan tulevaisuudessa matcheihin tms.

global.url = herokuurl;

global.firebaseConfig = fireConf;

global.keskusteluDOC = keskustelu