import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ResponseAPI } from './models/data-models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.checkAndGenerateToken();
  }

  async checkAndGenerateToken() {
    let token: any = this.authService.getLocalToken();
    if (!token) {
      let resp: ResponseAPI | null = await this.authService.generateSession();
      if (resp?.status) {
        this.authService.setLocalToken({sysId:resp.data.sysId, authToken: null});
      }
    }
  }
}
