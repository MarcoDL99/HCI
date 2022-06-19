import { Component, OnInit } from '@angular/core';
import { User, NOMI_REGIONI } from '../model/user';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Canteen, CANTEENS } from '../model/canteen';

@Component({
  selector: 'app-addmoney',
  templateUrl: './addmoney.page.html',
  styleUrls: ['./addmoney.page.scss'],
})
export class AddmoneyPage implements OnInit {
  user$: User;
  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(async (params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.setup();
      }
    });
  }
  setup() {
    if (this.router.getCurrentNavigation().extras.state.user) {
      this.user$ = this.router.getCurrentNavigation().extras.state.user;
    }

  }
  ngOnInit() {
  }

  gotoRegions() {
    let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
    this.router.navigate(['regions'], NavigationExtras);
  }
  gotoCanteens() {
    let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
    this.router.navigate(['canteens'], NavigationExtras);
  }
  gotoHome() {
    let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
    this.router.navigate(['home'], NavigationExtras);
  }
  gotoPayments() {
    let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
    this.router.navigate(['payments'], NavigationExtras);
  }
  gotoProfile() {
    let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
    this.router.navigate(['profile'], NavigationExtras);
  }
  confirm(mode: string) {
    var amount = (<HTMLInputElement>document.getElementById("amount")).value;
    var numberamount= Number(amount);
    if (typeof (numberamount) == 'number' && amount!='') {
      if(this.checkMethod(mode)){
        this.confirmPayment(mode, numberamount);
      }
      else{
        this.undefined();
      }
    }
    else {
      this.wrongAmount();
    }

  }
  checkMethod(method:string) {
    if(method == "card"){
          return this.user$.card!=""
    }
    else if(method == "paypal"){
      return this.user$.paypal!=""
    }
    return false
  }
  complete(amount: number){
    this.user$.credit=this.user$.credit+amount;
    this.gotoPayments();
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
  async confirmPayment(mode: string, amount: number){
    const alert = await this.alertController.create({
      header: 'Confirm Payment',
      message: 'Are you sure you want to add <strong>'+amount.toFixed(2)+'€</strong> to your account using <strong>'+mode+'</strong>?',
      buttons: ['No', {
        text: 'Yes',
        handler: () => {
          this.complete(amount);
        }
      }],
    });

    await alert.present();
  }
  async wrongAmount() {
    const toast = await this.toastController.create({
      color: 'danger',
      duration: 2000,
      position: "top",
      message: 'Please insert a valid amount.',
    });
  
    await toast.present();
  }
  async info() {
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Informations',
      message: 'Enter the desired amount, then choose the payment modality:<br><br>' +
        '  -  <strong>Paypal</strong> uses the paypal account linked to your profile.<br><br>' +
        '  -  <strong>Credit Card</strong> uses the Card linked to your profile',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
