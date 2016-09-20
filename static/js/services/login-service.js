import {notifications} from '../utils/notifications';
import myLayers from './layers-service';
import token from '../services/token-service';
import createQueryTask from '../services/createquerytask-service';
import cookieHandler from 'cookie-handler';

function getFormatedDateInt(){
  var d = new Date();

  var str = "day/month/year  hour:minute:second"
    .replace('day', d.getDate() <10? '0'+ d.getDate() : d.getDate())
    .replace('month', (d.getMonth() + 1) <10? '0' + (d.getMonth()+1) : (d.getMonth()+1))
    .replace('year', d.getFullYear())
    .replace('hour', d.getHours() <10? '0'+ d.getHours() : d.getHours() )
    .replace('minute', d.getMinutes() <10? '0'+ d.getMinutes() : d.getMinutes())
    .replace('second', d.getSeconds() <10? '0'+ d.getSeconds() : d.getSeconds());
    console.log(str);
  return str;
}

function getFormatedDateExp(){
  var d = new Date();

  var str = "day/month/year, hour:minute:second"
    .replace('day', d.getDate() <10? '0'+ d.getDate()+1 : d.getDate()+1)
    .replace('month', (d.getMonth() + 1) <10? '0' + (d.getMonth()+1) : (d.getMonth()+1))
    .replace('year', d.getFullYear())
    .replace('hour', d.getHours() <10? '0'+ d.getHours() : d.getHours() )
    .replace('minute', d.getMinutes() <10? '0'+ d.getMinutes() : d.getMinutes())
    .replace('second', d.getSeconds() <10? '0'+ d.getSeconds() : d.getSeconds());
    console.log(str);
  return str;
}

function interrupcionesLogin(user, pass, token){
  const url = myLayers.read_tokenURL();

  const data = {
    username: user,
    password: pass,
    client: 'requestip',
    expiration: 10080,
    format: 'jsonp'
  };

  $.ajax({
    method: 'POST',
    url: url,
    data: data,
    dataType: 'html'
  })
  .done(myToken => {
    if(myToken.indexOf('Exception') >= 0) {
      notifications('Login incorrecto, intente nuevamente.', 'Login_Error', '.notification-login');
      return;
    }
    if (myToken.indexOf('error') >= 0){
      notifications('Login incorrecto, intente nuevamente.', 'Login_Error', '.notification-login');
      return;
    }

    console.log('Requesting service access');
    console.log('Logging in to gisred-interruptions');
    console.log(myToken);

    cookieHandler.set('tkn',myToken);
    const page = "REACT_INTERRUPCIONES_WEB";
    const module = "PO_INTERRUPCIONES_FILIALES";
    const myDate = getFormatedDateInt();

    notifications("Logging in...","Login_Success", ".notification-login");
    window.location.href = "casablanca.html";

    //saveLoginFiliales(user,page,module, myDate,myToken);
  })
  .fail(error => {
    console.log("Problem:" , error);
    notifications("Problema al iniciar sesión. Intente nuevamente.","Login_Failed", ".notification-login");
  });

  console.log('done');
}

//mejorar
function saveLoginFiliales(user,page,mod,mydate,tkn){
  console.log(mydate);
  const data = {
    f: 'json',
    adds: JSON.stringify([{ attributes: { "usuario": user, "fecha": mydate, "pagina": page, "modulo": mod  }, geometry: {} }]),
    token: tkn
  };

  jQuery.ajax({
    method: 'POST',
    url: "http://gisred.chilquinta.cl:5555/arcgis/rest/services/Admin/LogAccesos/FeatureServer/1/applyedits",
    dataType:'html',
    data: data
  })
  .done(d =>{
    console.log(d,"pase");
  })
  .fail(f=>{
    console.log(f,"no pase")
  });
}

export { interrupcionesLogin };
