import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlacesServiceProvider } from '../providers/places-service/places-service'; 
import { HomePage } from '../pages/home/home';
import { Http } from '@angular/http';
import { HistoryPage } from '../pages/history/history';
import { Component, ViewChild } from '@angular/core';
import { Nav, AlertController, Platform } from 'ionic-angular';   
import { Network } from '@ionic-native/network'; 
import { InfopagePage } from '../pages/infopage/infopage'; 
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
declare var google;  
@Component({
  selector: 'page-app',
  templateUrl: 'app.html',
  providers: [PlacesServiceProvider] 
})
export class MyApp {
 @ViewChild(Nav) nav: Nav;

 rootPage:any = LoginPage;
 pages: Array<{title: string, component: any}>;

 constructor(platform: Platform,
   statusBar: StatusBar,
   splashScreen: SplashScreen, 
   http: Http,
   public alertCtrl: AlertController,
   private network: Network,
   private placesService: PlacesServiceProvider) {
  platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if(this.network.type == "none") { 
        let alert = this.alertCtrl.create({ 
          title: "<center>SORRY..</center>", 
          subTitle: "<center>NO Internet Connection, Please try again</center>", 
          buttons: ["OK"] 
        }); 
        alert.present(); 
      }

      this.pages = [
      { title: 'Login', component: LoginPage },
      { title: 'Home', component: HomePage },
      { title: 'History', component: HistoryPage },
      { title: 'Profile', component: ProfilePage }
      ];
    });
  
}
openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


}

