import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Canteen } from '../model/canteen';
import { User, } from '../model/user';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  user$: User;
  address: string;
  constructor(
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
  }
  setup() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.user$ = this.router.getCurrentNavigation().extras.state.user;
      let canteen : Canteen =this.router.getCurrentNavigation().extras.state.canteen;
      this.address = canteen.name+" "+canteen.address;

    }
  }
}
