import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ActivatedRoute,Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user$: User;
  eye: boolean = true;

  constructor(private router: Router,
    public toastController: ToastController,
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

  ngOnInit(): void {
    
    if (this.user$ != null) {
      this.gotoHome();
    }
  }
  login(): void {
    if (this.user$ && this.check((<HTMLInputElement>document.getElementById("mailLogin")).value, (<HTMLInputElement>document.getElementById("passwordLogin")).value)) {
      this.gotoHome();
    }
    else {
      this.error();
    }
  }
  check(mail: string, pwd: string) {
    return (mail == this.user$.mail && pwd == this.user$.password);
  }
  toggleShowLogin() {
    var x = <HTMLInputElement>document.getElementById("passwordLogin");
    if (x.type === "password") {
      x.type = "text";
      (<HTMLInputElement>document.getElementById("eyeLogin")).src = "assets/svg/eyeoff.svg"
    } else {
      x.type = "password";
      (<HTMLInputElement>document.getElementById("eyeLogin")).src = "assets/svg/eye.svg"
    }
  }
gotoHome() {
  let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
  this.router.navigate(['home'], NavigationExtras);
}
gotoSignUp() {
  let NavigationExtras: NavigationExtras = { state: { user: this.user$ } };
  this.router.navigate(['signup'], NavigationExtras);
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
