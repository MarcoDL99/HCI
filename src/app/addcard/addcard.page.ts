import { Component, OnInit } from '@angular/core';
import { User, NOMI_REGIONI } from '../model/user';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Canteen, CANTEENS } from '../model/canteen';

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.page.html',
  styleUrls: ['./addcard.page.scss'],
})
export class AddcardPage implements OnInit {
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

  confirm(){
    var card = (<HTMLInputElement>document.getElementById("cardnumber")).value.trim();
    this.user$.card= card.slice(card.length - 4);
    this.gotoPayments();
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
}
