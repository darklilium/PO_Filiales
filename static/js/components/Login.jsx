import React from 'react';
import {notifications} from '../utils/notifications';
import { interrupcionesLogin } from '../services/login-service';

class LoginApp extends React.Component {
  constructor(){
    super();
  }

  onClick(){
    var userValue = this.refs.username.value;
    var passValue = this.refs.password.value;
    //If they dont put any username or password
    if (userValue=="" || passValue==""){
      notifications('Login incorrecto, intente nuevamente.', 'Login_Error', '.notification-login');
      return;
    }
    //For domain users
    if (userValue.includes('vialactea\\')){
      console.log("Trying to access REACT_FACTIGIS_DASHBOARD");
      interrupcionesLogin(userValue, passValue);
      return;

    }else {
      console.log("Trying to access REACT_FACTIGIS_DASHBOARD");
      userValue =  'vialactea\\'+this.refs.username.value;
      interrupcionesLogin(userValue, passValue);
    }
  }

  componentWillMount(){
    localStorage.removeItem('token');
  }

  componentDidMount(){
    //change the loginwall dinamically
    let randomPicNumber = Math.floor((Math.random() * 6) + 1);
    //********Cambiar randomPicSrc para test/prod*******
    //let randomPicSrc = "css/images/login_images/loginwall"+ randomPicNumber+ ".jpg"; //prod
    let randomPicSrc = "dist/css/images/login_images/loginwall"+ randomPicNumber+ ".jpg";//desarrollo
    $('.login_wrapper').css("background-image", "url("+randomPicSrc+")");
  }

  render(){

      return (

          <div className="login_wrapper">
            <section id="myLogin" className="myLogin">
            <div className="login_wrapper_content">
              <article className="login_article">
                <input className="login__input" ref="username" type="text" placeholder="miusuario" defaultValue="ehernanr"  />
                <input className="login__input" ref="password" type="password" placeholder="password" defaultValue="Chilquinta7"  />

                <button onClick={this.onClick.bind(this)}
                  className="login__submit" title="Entrar " type="button" >
                  <span><i className="fa fa-plus"></i> Entrar</span>
                </button>

              </article>
              <aside className="login_aside">
                  <div className="aside_div">
                    <img className="login_aside__img" />
                    <h1 className="login_aside__h1"> Bienvenidos a Factigis </h1>
                  </div>
                  <div className="aside_div2">
                    <p className="login_aside__p">Aplicación de factibilidad para solicitudes de empalmes<br />
                    La información contenida en este sitio se obtiene del GISRED en conjunto con Smallworld y Catastro</p>
                  </div>
              </aside>
            </div>

            </section>
            <footer className="login_footer">
              <h4 className="notification-login backgroundColorNotification"></h4>
              <div className="login_footer__div">
                  <img className="login_footer__img" src="dist/css/images/chq_i.png" />
                  <p className="footer__div__p">&copy; 2016 Planificación y Gestión de la Información Operacional</p>
              </div>
            </footer>
          </div>

    );
  }
}

export default LoginApp;
