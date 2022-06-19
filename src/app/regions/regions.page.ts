import { Component, OnInit } from '@angular/core';
import { User, REGIONI, LAZIO, NOMI_REGIONI } from '../model/user';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-regions',
  templateUrl: './regions.page.html',
  styleUrls: ['./regions.page.scss'],
})
export class RegionsPage implements OnInit {
  user$: User;
  region: string;
  regions: string[];
  constructor(
    public alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user$ = this.router.getCurrentNavigation().extras.state.user;
      }
    });
    this.region = this.user$.region;
    this.regions = NOMI_REGIONI;
  }

  gotoCanteens() {
    let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
    this.router.navigate(['home'], NavigationExtras);
    this.router.navigate(['canteens'], NavigationExtras);
  }
  gotoHome() {
    let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
    this.router.navigate(['home'], NavigationExtras);
  }
  gotoPayments(){
    let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
    this.router.navigate(['payments'], NavigationExtras);
  }
  gotoProfile(){
    let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
    this.router.navigate(['profile'], NavigationExtras);
  }
  set(region) {
    this.region = region;
    this.user$.region = region;
  }

  async info() {
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Change Region',
      message: 'Here you can choose the region of the canteens you want to see. Tap on a region to select it.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
