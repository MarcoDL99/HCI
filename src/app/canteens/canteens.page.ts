import { Component, OnInit } from '@angular/core';
import { User, NOMI_REGIONI } from '../model/user';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Canteen, CANTEENS } from '../model/canteen';
@Component({
  selector: 'app-canteens',
  templateUrl: './canteens.page.html',
  styleUrls: ['./canteens.page.scss'],
})
export class CanteensPage implements OnInit {
  user$: User;
  region: string;
  regions: string[];
  date: string;
  canteens;
  canteensVisibility = {};
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
  ngOnInit() {
    var today = new Date();
    this.date= (today.toLocaleDateString());
  }
  setup() {
    if (this.router.getCurrentNavigation().extras.state.user) {
      this.user$ = this.router.getCurrentNavigation().extras.state.user;
    }
    this.region = this.user$.region;
    this.regions = NOMI_REGIONI;
    this.canteens = CANTEENS[this.region];

    for (let canteen of this.canteens) {
      this.canteensVisibility[canteen.id] = true;
    }
  }
  search(event) {
    for (let canteen of this.canteens) {
      if (this.searchin(canteen, event.detail.value.toLowerCase())) {
        this.canteensVisibility[canteen.id] = true;
      }
      else {
        this.canteensVisibility[canteen.id] = false;
      }
    }
  }
  searchin(canteen: Canteen, query: string) {
    for (var attr in canteen) {
      if (typeof canteen[attr] === 'string') {
        if (canteen[attr].toLowerCase().includes(query)) {
          return true
        }
      }
    }
    for (var meal of canteen.menu) {
      for (var plate of meal) {
        if (plate.toLowerCase().includes(query)) {
          return true
        }
      }
    }
    return false
  }
  gotoMap(canteen$: Canteen) {
    let NavigationExtras: NavigationExtras = { state: { user: this.user$, canteen: canteen$ } };
    this.router.navigate(['maps'], NavigationExtras);
  }
  async showMenu(canteen: Canteen) {
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Today\'s Menu',
      subHeader: canteen.name+" - "+this.date,
      message: '<strong style ="color: #0A74FF">Main Courses</strong><br>' + canteen.menu[0][0] + "<br>" + canteen.menu[0][1] + "<br><br>" +
        '<strong style ="color: #0A74FF">Second Courses</strong><br>' + canteen.menu[1][0] + "<br>" + canteen.menu[1][1] + "<br><br>" +
        '<strong style ="color: #0A74FF">Side Dishes</strong><br>' + canteen.menu[2][0] + "<br>" + canteen.menu[2][1] + "<br><br>",
      buttons: ['Close']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  setFavourite(canteen: Canteen) {
    this.user$.favouriteID = canteen.id;
    this.user$.favourite=canteen;
  }
  gotoRegions() {
    let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
    this.router.navigate(['regions'], NavigationExtras);
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

  async info() {
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Canteens',
      message: 'Here you can see all the canteens in the region you have currently chosen. <br><br><strong>Maps</strong> opens Google Maps with the address of the selected canteen. <br>' +
        '<strong>Menu</strong> shows today\'s menu for the selected canteen.<br>Tap on <strong style="color: red">♡</strong> to select a canteen as favourite. This will appear in your home page for a quick access.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
