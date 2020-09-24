import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FbloginProvider } from '../../providers/fblogin/fblogin';
import { ValidationService } from '../validation';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
//import { Camera } from 'ionic-native';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	profiledata: any;
	loginid: any;
	form2: FormGroup;
	username: any;
	emailid: any;
	password: any;
	profile_pic: any;
	dataFetchErr: boolean;
	base64Image: string;
	profiledata1: any;
	emailtrig: any;
	emailnull: boolean;
	passnull: boolean;
	unamenull: boolean;
	emailsame: boolean;
	pwdchng: boolean;
  constructor(private camera: Camera, public alertCtrl: AlertController, private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private fbloginprovider: FbloginProvider) {
  	this.storage.get('loginid').then((val) =>{
      this.loginid =val;
      console.log('user logged in is ',this.loginid)
    })

    this.form2 = this.formBuilder.group({
      uname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
      pwd: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.storage.get('loginid').then((val) =>{
      	this.loginid =val;
      	console.log('user logged in is ',this.loginid)
    
	    console.log('login id at ion view is ',this.loginid);
	    this.fbloginprovider.profileUpdate(this.loginid)
	    .then(data1 => {
	    	this.profiledata = data1;
	    	console.log('status is ',this.profiledata.status);
	    	console.log('profile data is ',this.profiledata);
	    	if(this.profiledata.status == "success"){
	    		console.log('success profile');
	    		this.username = this.profiledata.data.username;
	    		this.emailid = this.profiledata.data.email;
	    		this.profile_pic = this.profiledata.profile_pic;
	    		this.dataFetchErr = false;
	    	}
	    	else if(this.profiledata.status == "error"){
	    		console.log('fail profile');
	    		this.username = 'a';
	    		this.emailid = 'a';
	    		this.profile_pic = '';
	    		this.dataFetchErr = true;
	    	}
	    })
	})
  }


getCamera(){
let options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}
this.camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64:
 let base64Image = 'data:image/jpeg;base64,' + imageData;
}, (err) => {
 // Handle error
});
}











 /* getPicture(){
  	Camera.getPicture({
  		destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
  	}).then((ImageData) => {
  		 this.base64Image = "data:image/jpeg;base64," + ImageData;
    }, (err) => {
        console.log(err);
  	})
  }*/

  onSubmit(){
  	console.log('submit update');
  	let uname = this.form2.value.uname;
  	let pass = this.form2.value.pwd;
  	let email = this.form2.value.email;
  	let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; 
    
  	if(email == '' || email == null) {
  		this.emailnull = true;  		
  	}
  	else { this.emailnull = false; }

  	if(uname == '' || uname == null){
  		this.unamenull = true;
  	}
  	else { this.unamenull = false; }

  	if(pass == '' || pass == null){
  		this.passnull = true;
  	}
  	else { this.passnull = false; }

  	
  	if (emailPattern.test(email)) {
        this.emailtrig = false;       
    } 
    else { 
    	if(this.emailnull == false)
    		this.emailtrig = true; 
    	else
    		this.emailtrig = false;
    }

  	console.log('emailtrig'+this.emailtrig+'emailnull'+this.emailnull+'passnull'+this.passnull+'unamenull'+this.unamenull);
  	if(this.emailtrig == false && this.emailnull == false && this.passnull == false && this.unamenull == false ){
	  	console.log('uname'+uname+'pass'+pass+'email'+email);
	  	this.storage.get('loginid').then((value1) =>{
	  		let id = value1;
	  		let img = '';
	  		this.fbloginprovider.profile(uname,email,pass,img,id)
	  		.then(resdata => {
	  			this.profiledata1 = resdata;
	  			console.log('profile data response ',this.profiledata1);
	  			if(this.profiledata1.status == "success"){
	  				console.log('successfully updated');
	  				let alert = this.alertCtrl.create({ 
			          title: "<center>Updated Succeessfully..</center>", 
			          buttons: ["OK"] 
			        }); 
			        alert.present(); 
	  			}	
	  			else if(this.profiledata1.status == "error"){
	  				console.log('failed to update');
	  				this.emailsame = true;
	  			}
	  		})
	  	})
	}
  	
  }
  changepwd(){
  	this.pwdchng = true;
  }

}
