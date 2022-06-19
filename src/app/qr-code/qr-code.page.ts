import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {
  private sourceType: any;
  option: string;
  constructor(private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        switch (this.router.getCurrentNavigation().extras.state.method) {
          case 0:
            this.option = "Card";
            break;
          case 1:
            this.option = "Paypal";
            break;
          case 2:
            this.option = "Wallet";
            break;
          case 3:
            this.option = "Cash/Pos";
        }
        console.log(this.option);
      }
    });
  }

}
