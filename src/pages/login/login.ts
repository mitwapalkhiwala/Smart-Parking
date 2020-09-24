import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HomePage } from '../home/home'; 
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as $ from 'jquery';
import { Storage } from '@ionic/storage';
import { SignupPage } from '../signup/signup';
import { FbloginProvider } from '../../providers/fblogin/fblogin';
import { ValidationService } from '../validation';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  fb_email: any;
  fb_username: any;
  fb_id: any;
  fbresp: any;
  loginresp: any;
  errormailpass: boolean;
  fbtrig: boolean;
  userData: any;
  erroruser: boolean;
  errormail: boolean;
  samemail: boolean;
  errorpwd: boolean;
  sameuser: boolean;
  erroruser1: boolean;
  errorpwd1: boolean;
  usernotmatch: boolean;
  passnotmatch: boolean;
  invalidEmailAddress: boolean;
  trig1: any;
  trig2: any;
  uid: any;
  user: any;
  pass: any;
  loginuser: any;
  trigger_login: any;
  success_trig: any;
  user_array: any = [];
  pass_array: any = [];
  array_length: any;
  loginemail: any;
  loginpwd: any;
  loginid: any;
  form1: FormGroup;
  constructor(private fbloginprovider: FbloginProvider, public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public alertCtrl: AlertController, private fb: Facebook, public menu: MenuController ,  private formBuilder: FormBuilder) { 

    this.storage.get('loginid').then((val) =>{
      this.loginid =val;
      console.log('user logged in is ',this.loginid)
    })
    this.form1 = this.formBuilder.group({
      mail: ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
      pwd1: ['', Validators.required],
    });
    console.log('constructor');
    this.menu = menu;
    this.fb.getLoginStatus()
    .then((res) => {
      console.log('login status is ',res);
      if(res.status == "unknown"){
        console.log('unknwn login status');
        this.menu.enable(true, 'side_menu');
        this.trigger_login = false; //for sidemenu btn
        this.trig1 = false; //for login btn
        this.trig2 = true; 
      }
      else{
        console.log('connectd login');
        this.menu.enable(true, 'side_menu');
        this.trigger_login = true; //for sidemenu btn
        this.trig1 = true; //for login btn
        this.trig2 = false; 
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  trig_low(){
    this.trigger_login = true; //for sidemenu btn
    this.trig1 = false; //for fb login btn
    this.trig2 = true; //for fb logout btn
  }

  trig_high(){
    this.trig1 = true;
    this.trig2 = false;
  }

  loginfb(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => {
      console.log('fb response before ',res);
      this.fb.api('/me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', [])
      .then(profile => {
        this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
        console.log(this.userData);
        console.log('email is ',this.userData.email);
        console.log('Name is ',this.userData.first_name);
        console.log('UserName is ',this.userData.username);
        console.log('profile pic url is ',this.userData.picture);

        this.fb_email = this.userData.email;
        this.fb_username = this.userData.username;
        this.fb_id = res.authResponse.userID;
        this.fbloginprovider.fbloginfunc(this.fb_id,this.fb_username,this.fb_email).
        then(data1 => {  
          this.fbresp = data1;
          console.log('fb response 1 ',this.fbresp);
          if(this.fbresp.status == "success"){
            this.fbtrig = true;
          }
          this.navCtrl.push(HomePage);
        })
        console.log('fb response 2 ',this.fbresp);
        
      });
      console.log('Logged into Facebook!', res);      
      if(res.authResponse.userID != undefined){
        console.log('userid is ',res.authResponse.userID);
        this.uid = res.authResponse.userID;
      }
      this.trigger_login = true;
      this.trig_high();
    })
    .catch(e => console.log('Error logging into Facebook', e));
    
  }

  logoutfb(){
    this.fb.logout()
    .then((res) => {
      console.log('Logged out of Facebook!', res);
      this.trig_low();
      this.fbtrig = false;
    })
    .catch(e => console.log('Error logging out of Facebook', e));    
  }

  getStatus(){
    this.fb.getLoginStatus()
    .then((res) => {
      console.log('login status is ',res);
    })
  }

getdata(){
  let email_1 = 'b@gmail.com';
  let pass_1 = '123';
  this.fbloginprovider.loginfunc(email_1,pass_1).
    then(data1 => {  
      this.fbresp = data1;
      console.log('fb response loginfunc ',this.fbresp);
      if(this.fbresp.status == "success"){
        console.log('success login');
        let alert = this.alertCtrl.create({ 
          title: "<center>Login Succeessful..</center>", 
          buttons: ["OK"] 
        }); 
        alert.present(); 
        this.gotohome();
      }
    })
  }

  onSubmit1(){
    this.errorpwd = false;
    this.erroruser = false;
    this.errormailpass = false;
    this.loginemail = this.form1.value.mail;
    this.loginpwd = this.form1.value.pwd1;
    console.log('user trig is '+this.errormail+' pwd trig is '+this.errorpwd1);
    console.log('Username is ',this.form1.value.mail);
    console.log('Password is ',this.form1.value.pwd1);
    if(this.form1.value.mail == '' || this.form1.value.mail == null){
      this.errormail = true;
      this.usernotmatch = false;
      this.errormailpass = false;
    }
    else if(this.form1.value.mail != '' || this.form1.value.mail != null){
      this.errormail = false;
    }
    if(this.form1.value.pwd1 == '' || this.form1.value.pwd1 == null){
      this.errorpwd1 = true;
      this.passnotmatch = false;
      this.errormailpass = false;
    }
    else if(this.form1.value.pwd1 != '' || this.form1.value.pwd1 != null){
      this.errorpwd1 = false;
    }

    this.fbloginprovider.loginfunc(this.loginemail,this.loginpwd)
    .then(data1 => {  
      this.loginresp = data1;
      if(this.loginresp.status == "success"){
        console.log('ID is ',this.loginresp.data.id);
        this.loginid = this.loginresp.data.id;
        this.storage.set('loginid',this.loginid);
        console.log('success login');
        let alert = this.alertCtrl.create({ 
          title: "<center>Login Succeessful..</center>", 
          buttons: ["OK"] 
        }); 
        alert.present(); 
        this.gotohome();

      }
      else if(this.loginresp.status == "error"){
        console.log('login failed');
        let errormsg = this.loginresp.message;
        console.log('error in login is ',errormsg);
        this.errormailpass = true;
      }
    })

    this.form1.reset();
  }

  gotosignup(){
    this.navCtrl.push(SignupPage);
  }

  gotohome(){
    this.navCtrl.push(HomePage);
  }
}
