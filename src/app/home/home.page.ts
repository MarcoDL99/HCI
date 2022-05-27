import { Component, OnInit } from '@angular/core';
//import * as internal from 'stream';
import { User } from '../model/user';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user$: User;
  hasFavourite: boolean;
  showCredit: boolean = true;
  credit: string = "50000.00€";
  constructor(private router: Router,
    public alertController: AlertController,
    ) {

  }
  ngOnInit(): void {
    this.user$ = new User("marco", "ciao");
    console.log(this.user$);
    this.hasFavourite = true;
  }
  toggleShowCredit(): void {
    this.showCredit = !this.showCredit;
    console.log(this.user$);
    if (this.showCredit) {
      this.credit = "500.00€";
    }
    else {
      this.credit = "*****";
    }
  }
  async logout(){
    const alert = await this.alertController.create({
          header: 'Confirm Logout',
          message: 'Are you sure you want to logout?',
          buttons: ['Cancel', {
            text: 'Confirm',
            handler: () =>{
              this.router.navigate(['login']);   
            }
          }],
        });

        await alert.present();
  }
  actualLogout(): void{
    this.router.navigate(['login']);
  }
 
}
