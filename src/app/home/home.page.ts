import { Component, OnInit } from '@angular/core';
//import * as internal from 'stream';
import { User } from '../model/user';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Canteen,  } from '../model/canteen';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user$: User;
  hasFavourite: boolean;
  status: number;
  showCredit: boolean;
  credit: string;
  favourite: Canteen;
  date: string;

  constructor(private router: Router,
    public alertController: AlertController,
    private route: ActivatedRoute,

  ) {
    this.route.queryParams.subscribe(async (params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        if (this.router.getCurrentNavigation().extras.state.user) {
          this.user$ = this.router.getCurrentNavigation().extras.state.user;
          this.favourite=this.user$.favourite;
          this.status=this.user$.status;
          this.credit=this.user$.credit.toFixed(2);
          if (this.favourite){
            this.hasFavourite=true;
          }
          else{
            this.hasFavourite=false;
          }
        }
        else{
              this.user$ = new User("marco", "ciao", 500.00);

        }
      }
    });
  }
  ngOnInit(): void {
    var today = new Date();
    this.date= (today.toLocaleDateString());
    this.route.queryParams.subscribe(async (params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        if (this.router.getCurrentNavigation().extras.state.user) {
          this.user$ = this.router.getCurrentNavigation().extras.state.user;
          this.favourite=this.user$.favourite;
          if (this.favourite){
            this.hasFavourite=true;
          }
          else{
            this.hasFavourite=false;
          }
        }
        else{
              this.user$ = new User("marco", "ciao", 500.00);

        }
      }
    });
    this.status=this.user$.status;
    this.credit=this.user$.credit.toFixed(2);
    this.showCredit=true;
    this.toggleShowCredit();
    
    

  }
  
  toggleShowCredit(): void {
    this.showCredit = !this.showCredit;
    if (this.showCredit) {
      this.credit=this.user$.credit.toFixed(2);
    }
    else {
      let tmp = "";
      for (let i = 0; i < this.user$.credit.toFixed(2).length; i++) {
        tmp = tmp + "*";
      }
      this.credit = tmp;
    }
  }
  checkMethod(method) {
    if(method == 0){
          return this.user$.card!=""
    }
    else if(method == 1){
      return this.user$.paypal!=""
    }
    return false
  }

  pay(methodID) {
    if ((methodID == 0 && !this.checkMethod(methodID)) || (methodID == 1 && !this.checkMethod(methodID))) {
      this.undefined();
    }
    else {
      let NavigationExtras: NavigationExtras = { state: { method: methodID } };
      this.router.navigate(['qr-code'], NavigationExtras);
    }
  }

  gotoRegions(){
    let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
    this.router.navigate(['regions'], NavigationExtras);
  }
  gotoCanteens(){
    let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
    this.router.navigate(['canteens'], NavigationExtras);
  }
  gotoPayments(){
    let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
    this.router.navigate(['payments'], NavigationExtras);
  }
  gotoProfile(){
    let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
    this.router.navigate(['profile'], NavigationExtras);
  }
  gotoMap() {
    let NavigationExtras: NavigationExtras = { state: { user: this.user$, canteen: this.favourite } };
    this.router.navigate(['maps'], NavigationExtras);
  }
  gotoAddmoney(){
    let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
    this.router.navigate(['addmoney'], NavigationExtras);
  }

  async showMenu() {
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Today\'s Menu',
      subHeader: this.favourite.name+" - "+this.date,
      message: '<strong style ="color: #0A74FF">Main Courses</strong><br>' + this.favourite.menu[0][0] + "<br>" + this.favourite.menu[0][1] + "<br><br>" +
        '<strong style ="color: #0A74FF">Second Courses</strong><br>' + this.favourite.menu[1][0] + "<br>" + this.favourite.menu[1][1] + "<br><br>" +
        '<strong style ="color: #0A74FF">Side Dishes</strong><br>' + this.favourite.menu[2][0] + "<br>" + this.favourite.menu[2][1] + "<br><br>",
      buttons: ['Close']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async undefined(){
    const alert = await this.alertController.create({
      header: 'Undefined Payment Modality',
      message: 'You have not defined this payment modality yet. Would you like to define it now?',
      buttons: ['No', {
        text: 'Yes',
        handler: () => {
          this.gotoPayments();
        }
      }],
    });

    await alert.present();
  }
  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      buttons: ['Cancel', {
        text: 'Confirm',
        handler: () => {
          this.router.navigate(['login']);
        }
      }],
    });

    await alert.present();
  }
  actualLogout(): void {
    this.router.navigate(['login']);
  }

  async info() {
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Payment',
      message: 'To pay at the canteen checkout, select a payment modality.<br>' +
        'This will generate a QR code which you need to show to the cashier.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
