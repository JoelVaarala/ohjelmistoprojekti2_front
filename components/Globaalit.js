

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
let jaaninlocalhost =  'http://192.168.56.1:5001/ohpro2-f30e5/us-central1/'; //käytetään firebasen funktioiden testaamiseen

//tätä käytetään globaalina variablena että voidaan eri  classeista helposti accessaa frontin/backin osoitteet. 
//masterissa/productionissa käytetään aina tuotantopolkua, ei omia testipatheja

global.matches = "messages"; //kertoo  collectionin nimen, nyt on messages mutta muutetaan tulevaisuudessa matcheihin tms.

global.url = jaaninlocalhost;

global.firebaseConfig = fireConf;

global.keskusteluDOC = keskustelu