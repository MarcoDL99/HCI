import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user$: User;

  constructor(private router: Router,
    public toastController: ToastController,
  ) {

  }

  ngOnInit(): void {
    this.user$ = new User("marco", "ciao");
  }
  login(): void {
    if (this.check((<HTMLInputElement>document.getElementById("username")).value, (<HTMLInputElement>document.getElementById("password")).value)) {
      this.gotoHome();
    }
    else {
      this.error();
    }
  }
  check(name: string, pwd: string) {
    return (name == this.user$.username && pwd == this.user$.password);
  }
  gotoHome() {
    let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
    this.router.navigate(['home'], NavigationExtras);
  }
  async error() {
    const toast = await this.toastController.create({
      color: 'danger',
      duration: 2000,
      position: "top",
      message: 'Wrong Username and/or password',
    });

    await toast.present();
  }
}
