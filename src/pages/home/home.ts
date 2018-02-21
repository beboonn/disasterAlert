import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  fcm: FCM;
  alert: AlertController;
  constructor(public navCtrl: NavController ,fcm: FCM, alert: AlertController) {
    this.fcm = fcm;
    this.alert = alert;
    this.onNotification();
  }

  onNotification() {
    try {
      // mock data
      let lat : number = 13.84;
      let long: number = 100.56;
      let beforeLat : number = 13.84;
      let beforeLong: number = 100.56;

      // unsubscribe from fcm topic
      for(let i=-1;i<2;i++){
        for(let j=-1;j<2;j++){
          let topic = (beforeLat+i*0.01).toString()+'_'+(beforeLong+j*0.01).toString();
          this.fcm.unsubscribeFromTopic(topic);
        }
      }
      // subscribe to fcm topic
      for(let i=-1;i<2;i++){
        for(let j=-1;j<2;j++){
          let topic = (lat+i*0.01).toString()+'_'+(long+j*0.01).toString();
          this.fcm.subscribeToTopic(topic);
          console.log(topic);
        }
      }

      // alert popup
      this.fcm.onNotification().subscribe(data=>{
        console.log(data);
        this.alert.create({
          title: 'Caution!',
          subTitle: data.message
        }).present();
      });

    }
    catch(e) {
      console.log(e);
    }
  }
}
