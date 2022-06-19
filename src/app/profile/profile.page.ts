import { Component, OnInit } from '@angular/core';
import { User, NOMI_REGIONI } from '../model/user';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Canteen, CANTEENS } from '../model/canteen';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user$: User;

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
    }
  }
  ngOnInit() {
  }
  gotoRegions(){
    let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
    this.router.navigate(['regions'], NavigationExtras);
  }
  gotoCanteens(){
    let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
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
  gotoChange(change$: string){
  let NavigationExtras: NavigationExtras = { state: { user: this.user$, change: change$} };
  this.router.navigate(['change'], NavigationExtras);
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
changeStatus(){
  this.user$.status=(this.user$.status+1)%3
}
}
