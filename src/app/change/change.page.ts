import { Component, OnInit } from '@angular/core';
import { User, NOMI_REGIONI } from '../model/user';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Canteen, CANTEENS } from '../model/canteen';

@Component({
  selector: 'app-change',
  templateUrl: './change.page.html',
  styleUrls: ['./change.page.scss'],
})
export class ChangePage implements OnInit {
  user$: User;
  change: string;
  eye0: boolean = true;
  eye1: boolean = true;
  eye2: boolean = true;
  eye3: boolean = true;
  eye4: boolean = true;
  photo1: boolean = false;
  photo2: boolean = false;
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
      this.change = this.router.getCurrentNavigation().extras.state.change;
    }

  }
  ngOnInit() {
    this.eye0 = true;
    this.eye1 = true;
    this.eye2 = true;
    this.eye3 = true;
    this.eye4 = true;
    this.photo1 = false;
    this.photo2 = false;
  }
  pic1() {
    this.photo1 = true;
  }
  pic2() {
    this.photo2 = true;
  }
  confirm(): void {
    switch (this.change) {
      case "mail":
        var mail = (<HTMLInputElement>document.getElementById("mailChange")).value.trim();
        var pwd = (<HTMLInputElement>document.getElementById("password3Change")).value.trim();
        console.log(pwd);
        if (mail == "" || pwd == "") {
          this.error0();
        }
        else if (this.check(pwd)) {
          this.user$.mail = mail;
          this.successMail();
        }
        else {
          this.error3();
        }
        break

      case "password":
        var pwd1 = (<HTMLInputElement>document.getElementById("password0Change")).value.trim();
        var pwd2 = (<HTMLInputElement>document.getElementById("password1Change")).value.trim();
        var pwd3 = (<HTMLInputElement>document.getElementById("password2Change")).value.trim();
        if (pwd1 == "" || pwd2 == "" || pwd3 == "") {
          this.error0();
        }
        else if (this.check(pwd1)) {
          if (this.validate(pwd2)) {
            if (pwd2 != pwd3) {
              this.error2();
            }
            else {
              this.user$.password = pwd2;
              this.successPassword();
            }
          }
          else {
            this.error1();
          }
        }
        else {
          this.error3();
        }
        break

      case "request":
        var pwd = (<HTMLInputElement>document.getElementById("password4Change")).value.trim();
        if (pwd == "" || !this.photo1 || !this.photo2) {
          this.error0();
        }
        else if (this.check(pwd)) {
          this.successRequest();
          var today = new Date();
          this.user$.requestdate = (today.toLocaleDateString());
          this.user$.status = 1;
        }
        else {
          this.error3();
        }

    }
  }

  validate(pwd) {

    return /[A-Z]/.test(pwd) &&
      /[a-z]/.test(pwd) &&
      /[0-9]/.test(pwd) &&
      pwd.length >= 8;

  }
  check(pwd) {
    return pwd == this.user$.password
  }
  toggleShow(id: number) {
    var x = <HTMLInputElement>document.getElementById("password" + id.toString() + "Change");
    if (x.type === "password") {
      x.type = "text";
      (<HTMLInputElement>document.getElementById("eye" + id.toString() + "Change")).src = "assets/svg/eyeoff.svg"
    } else {
      x.type = "password";
      (<HTMLInputElement>document.getElementById("eye" + id.toString() + "Change")).src = "assets/svg/eye.svg"
    }
  }
  async info() {
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Informations',
      message: 'Enter your password, then upload:<br><br>' +
        '  -  A clear picture of yourself. Make sure you are recognizable.<br><br>' +
        '  -  A clear picture of the front side of your Identity Card.<br><br><br>' +
        'After you send your request, we will check the documents and you will be notified via email as soon as your account is ready. This can take a few working days.<br>' +
        'You can also check the state of your request in the profile section.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async error0() {
    const toast = await this.toastController.create({
      color: 'danger',
      duration: 2000,
      position: "top",
      message: 'Please fill in every field.',
    });

    await toast.present();
  }
  async error1() {
    const toast = await this.toastController.create({
      color: 'danger',
      duration: 2000,
      position: "top",
      message: 'Please make sure your password satisfies the requirements.',
    });

    await toast.present();

  }
  async error2() {
    const toast = await this.toastController.create({
      color: 'danger',
      duration: 2000,
      position: "top",
      message: 'The 2 passwords need to match.',
    });

    await toast.present();

  }
  async error3() {
    const toast = await this.toastController.create({
      color: 'danger',
      duration: 2000,
      position: "top",
      message: 'Wrong Password',
    });

    await toast.present();

  }
  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      buttons: ['Cancel', {
        text: 'Confirm',
        handler: () => {
          let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
          this.router.navigate(['login'], NavigationExtras);
        }
      }],
    });

    await alert.present();
  }
  actualLogout(): void {
    this.router.navigate(['login']);
  }
  async successPassword() {
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Completed!',
      message: 'Your password was modified successfully!',
      buttons: [{
        text: 'OK',
        handler: () => {
          let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
          this.router.navigate(['profile'], NavigationExtras);
        }
      }]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  async successRequest() {
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Completed!',
      message: 'Your new request has been sent!',
      buttons: [{
        text: 'OK',
        handler: () => {
          let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
          this.router.navigate(['profile'], NavigationExtras);
        }
      }]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  async successMail() {
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Completed!',
      message: 'Your Email was modified successfully!',
      buttons: [{
        text: 'OK',
        handler: () => {
          let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
          this.router.navigate(['profile'], NavigationExtras);
        }
      }]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
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
