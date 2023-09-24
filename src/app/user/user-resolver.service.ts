import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { IUser } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserResolver{
  constructor(private authService: AuthService) {}

  resolve(): void {
    this.authService.currentUser = this.authService.getUser();
  }
}
