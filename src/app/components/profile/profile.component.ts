// src/app/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string | undefined;
  email: string | undefined;
  id: string | undefined;

  constructor(private jwtHelper: JwtHelperService) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  private getUserInfo(): void {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.username = decodedToken.isDeliveryMan ? decodedToken.userName : decodedToken.name;
      this.email = decodedToken.email;
      this.id = decodedToken.id;
    } else {
      // Handle token expiration or absence
      console.error('Token is invalid or expired');
    }
  }
}