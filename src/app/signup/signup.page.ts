import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user$: User;

  eye1: boolean = true;
  eye2: boolean = true;
  photo1: boolean = false;
  photo2: boolean = false;
  constructor(private router: Router,
    public toastController: ToastController,
    public alertController: AlertController
  ) {
  }
  ngOnInit() {
    this.eye1 = true;
    this.eye2 = true;
    this.photo1 = false;
    this.photo2 = false;
  }
  
  signup(): void {
    var mail = (<HTMLInputElement>document.getElementById("mailSignup")).value.trim();
    var pwd1 = (<HTMLInputElement>document.getElementById("password1Signup")).value.trim();
    var pwd2 = (<HTMLInputElement>document.getElementById("password2Signup")).value.trim();

    console.log(mail == "" || pwd1 == "" || pwd2 == "" || !this.photo1 || !this.photo2);
    if (mail == "" || pwd1 == "" || pwd2 == "" || !this.photo1 || !this.photo2) {
      this.error0();
    }
    else if (!this.validate(pwd1)) {
      this.error1();
    }
    else if (pwd1 != pwd2) {
      this.error2();
    }
    else {
      this.user$=new User(mail,pwd1,0.0)
      let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
      this.router.navigate(['login'], NavigationExtras);
    }
  }

  validate(pwd) {

    return /[A-Z]/.test(pwd) &&
      /[a-z]/.test(pwd) &&
      /[0-9]/.test(pwd) &&
      pwd.length >= 8;

  }
  toggleShow1() {
    var x = <HTMLInputElement>document.getElementById("password1Signup");
    if (x.type === "password") {
      x.type = "text";
      (<HTMLInputElement>document.getElementById("eye1Signup")).src = "assets/svg/eyeoff.svg"
    } else {
      x.type = "password";
      (<HTMLInputElement>document.getElementById("eye1Signup")).src = "assets/svg/eye.svg"
    }
  }
  toggleShow2() {
    var x = <HTMLInputElement>document.getElementById("password2Signup");
    if (x.type === "password") {
      x.type = "text";
      (<HTMLInputElement>document.getElementById("eye2Signup")).src = "assets/svg/eyeoff.svg"
    } else {
      x.type = "password";
      (<HTMLInputElement>document.getElementById("eye2Signup")).src = "assets/svg/eye.svg"
    }
  }
  pic1() {
    this.photo1 = true;
  }
  pic2() {
    this.photo2 = true;
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
  async info() {
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Informations',
      message: 'Fill in every field, then upload:<br><br>' +
        '  -  A clear picture of yourself. Make sure you are recognizable.<br><br>' +
        '  -  A clear picture of the front side of your Identity Card.<br><br><br>' +
        'After you sign up, we will check the documents and you will be notified via email as soon as your account is ready. This can take a few working days.<br>' +
        'You can also check the state of your request in the profile section once you login.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
