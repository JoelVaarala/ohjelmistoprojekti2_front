

let url1 = '';
let url2 = 'http://192.168.1.133:8080';
let url3 = '';
let jaaninlocalhost =  'http://192.168.56.1:5001/ohpro2-f30e5/us-central1/'; //käytetään firebasen funktioiden testaamiseen

//tätä käytetään globaalina variablena että voidaan eri  classeista helposti accessaa frontin/backin osoitteet. 
//masterissa/productionissa käytetään aina tuotantopolkua, ei omia testipatheja

global.url = jaaninlocalhost;
