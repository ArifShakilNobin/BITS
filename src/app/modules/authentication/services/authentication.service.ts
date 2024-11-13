import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LoginResponse } from '../models/login-response.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  public currentUserSubject!: BehaviorSubject<LoginResponse | null>;
  public currentUser!: Observable<LoginResponse | null>;
  private isAuthenticated = false;
  private token: string | null = '';
  private tokenTimer: any;
  private userId!: number | null;


  onUserTypeStartEditing = new Subject<number>();

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<LoginResponse | null>(
      JSON.parse(localStorage.getItem('currentUserData') ?? '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  getToken(): string | null {
    return this.token;
  }

  getIsUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }
  get CurrentUserValue(): LoginResponse | null {
    return this.currentUserSubject.value;
  }

  public saveCurrentUserInfo(currentUserInfo: LoginResponse): void {
    const tokenExpiresIn = currentUserInfo.tokenDuration;
    this.setAutoLogoutTimer(tokenExpiresIn);

    const now = new Date();
    const tokenExpirationDate = new Date(now.getTime() + tokenExpiresIn * 1000);
    // console.log(tokenExpirationDate);

    currentUserInfo.tokenExpirationDate = tokenExpirationDate;

    this.currentUserSubject.next(currentUserInfo);
    localStorage.setItem('currentUserInfo', JSON.stringify(currentUserInfo));
    this.token = currentUserInfo.token;
    this.isAuthenticated = true;
    this.userId = currentUserInfo.id;
  }

  logout(): void {
    this.token = null;
    this.isAuthenticated = false;
    this.currentUserSubject.next(null);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearCurrentUserInfo();
    // localStorage.clear();

    this.router.navigate(['/']);
  }

  public clearCurrentUserInfo(): void {
    localStorage.removeItem('currentUserInfo');
  }
  public getCurrentUserInfo(): LoginResponse | null {
    const currentUserInfo: LoginResponse = JSON.parse(
      localStorage.getItem('currentUserInfo') ?? '{}'
    );

    if (!currentUserInfo) {
      return null;
    }

    currentUserInfo.tokenExpirationDate = new Date(
      currentUserInfo.tokenExpirationDate
    );
    return currentUserInfo;
  }

  public setAutoLogoutTimer(duration: number): void {
    // console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

}
