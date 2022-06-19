import { Component, OnInit } from '@angular/core';
import { User, NOMI_REGIONI } from '../model/user';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Canteen, CANTEENS } from '../model/canteen';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {
  user$: User;
  showCredit: boolean;
  credit: string;
  paypal: string;
  card: string;
  constructor(
    public alertController: AlertController,
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
      this.credit = this.user$.credit.toFixed(2);
      if (this.user$.paypal) {
        this.paypal = this.user$.paypal;
      }
      else {
        this.paypal = "";
      }
      if (this.user$.card) {
        this.card = this.user$.card;
      }
      else {
        this.card = "";
      }
    }
  }
  ngOnInit() {
    this.showCredit = true;
    this.toggleShowCredit();
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
  gotoProfile() {
    let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
    this.router.navigate(['profile'], NavigationExtras);
  }
  gotoHistory(){
    let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
    this.router.navigate(['history'], NavigationExtras);
  }
  gotoAddmoney(){
    let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
    this.router.navigate(['addmoney'], NavigationExtras);
  }
  toggleShowCredit(): void {
    this.showCredit = !this.showCredit;
    if (this.showCredit) {
      this.credit = this.user$.credit.toFixed(2);
    }
    else {
      let tmp = "";
      for (let i = 0; i < this.user$.credit.toFixed(2).length; i++) {
        tmp = tmp + "*";
      }
      this.credit = tmp;
    }
  }
  linkPaypal() {
    this.user$.paypal = this.user$.mail;
    this.paypal = this.user$.paypal;
  }
  linkCard() {
    let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
    this.router.navigate(['addcard'], NavigationExtras);
  }
  async info() {
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Payments',
      message: 'Here you can view your wallet balance and your payment methods. Tap on the <strong>+</strong> to add credit to your wallet using one of the two payment methods',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  async unlinkPaypal() {
    const alert = await this.alertController.create({
      header: 'Unlink Paypal Account',
      message: 'Are you sure you want to unlink your <strong>Paypal Account</strong>?',
      buttons: ['Cancel', {
        text: 'Confirm',
        handler: () => {
          this.user$.paypal = "";
          this.paypal = "";
        }
      }],
    });
    await alert.present();
  }
  async unlinkCard() {
    const alert = await this.alertController.create({
      header: 'Unlink Card',
      message: 'Are you sure you want to unlink your <strong>Card</strong>?',
      buttons: ['Cancel', {
        text: 'Confirm',
        handler: () => {
          this.user$.card = "";
          this.card = "";
        }
      }],
    });
    await alert.present();
  }
}
