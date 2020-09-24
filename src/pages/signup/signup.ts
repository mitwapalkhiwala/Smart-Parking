import { Component } from '@angular/core';  
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';  
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';  
import { HomePage } from '../home/home';   
import { Validators, FormBuilder, FormGroup } from '@angular/forms';  
import * as $ from 'jquery';  
import { Storage } from '@ionic/storage';  
import { LoginPage } from '../login/login';  
import { Http } from '@angular/http'; 
import 'rxjs/add/operator/map'; 
import { ValidationService } from '../validation'; 
/**  
 * Generated class for the SignupPage page.  
 *  
 * See http://ionicframework.com/docs/components/#navigation for more info  
 * on Ionic pages and navigation.  
 */  
 @IonicPage()  
 @Component({  
   selector: 'page-signup',  
   templateUrl: 'signup.html',  
 })  
 export class SignupPage {  
   erroruser: boolean;  
   errorpwd: boolean;  
   erroremail: boolean; 
   notemail: boolean;  
   alreadymail: boolean; 
   form : FormGroup;  
   constructor(public navCtrl: NavController, public navParams: NavParams,  private storage: Storage, public alertCtrl: AlertController, private fb: Facebook, public menu: MenuController ,  private formBuilder: FormBuilder, public http:Http) {  
     this.form = this.formBuilder.group({  
       uname: ['', Validators.required],  
       pwd: ['', Validators.required],  
       email: ['', Validators.compose([Validators.required, ValidationService.emailValidator])],  
     });  
      
   }  
    
   ionViewDidLoad() {  
     console.log('ionViewDidLoad SignupPage');  
   }  
    
   onSubmit(){  
     if(this.form.value.uname == '' || this.form.value.uname == null){  
       this.erroruser = true;  
     }  
     else { this.erroruser = false; }  
      
     if(this.form.value.pwd == '' || this.form.value.pwd == null){  
       this.errorpwd = true;  
     }  
     else { this.errorpwd = false; }  
     if(this.form.value.email == '' || this.form.value.email == null){  
       this.erroremail = true;  
     }  
     if(this.form.value.email != ''|| this.form.value.email != null){  
       this.erroremail = false; 
       let checkmail = this.form.value.email; 
       if(checkmail.indexOf("@") == -1 || checkmail.indexOf(".") == -1 ){  
         this.notemail = true;  
       }  
       else { this.notemail = false; } 
       if((this.form.value.uname != '' || this.form.value.uname != null) && (this.form.value.email != '' || this.form.value.email != null) && (this.form.value.pwd != '' || this.form.value.pwd != null)){ 
         if(this.erroruser == false && this.errorpwd == false && this.erroremail == false && this.notemail == false){ 
           this.apiCall(this.form.value.uname,this.form.value.email,this.form.value.pwd); 
            
         } 
       } 
     } 
 
      
     console.log('user trig is '+this.erroruser+' pwd trig is '+this.errorpwd);  
     console.log('form values ',this.form.value);  
     console.log('Username is ',this.form.value.uname);  
     console.log('Password is ',this.form.value.pwd);  
     console.log('email is ',this.form.value.email); 
 
      
   } 
    
   apiCall(uname,email,pwd){ 
     return new Promise(resolve => { 
        
       this.http.get('http://websitetestingbox.com/php/parking/api/?action=sign_up&username='+uname+'&email='+email+'&password='+pwd) 
       .map(res => res.json()) 
       .subscribe(data1 => {  
         console.log("Signup status: ",data1.status); 
         if(data1.status == "success"){ 
           this.form.reset(); 
           this.successAlert(); 
         } 
         if(data1.status == "error"){ 
           console.log("error message: ",data1.message); 
           if(data1.message = "Email is already exist."){ 
             this.alreadymail = true; 
           } 
           else{this.alreadymail = false; } 
         } 
         resolve(data1);  
       }); 
     }); 
      
   } 
 
   successAlert(){ 
     let alert = this.alertCtrl.create({   
       title: "<center>Signup Successful..</center>",   
       buttons: ["OK"]   
     });   
     alert.present();   
     this.navCtrl.push(LoginPage);  
   }  
 }