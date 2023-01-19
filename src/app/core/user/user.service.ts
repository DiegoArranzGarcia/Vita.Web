import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { User } from './user.model';

@Injectable()
export class UserService {
  private _isAuthenticated: boolean;
  private _currentUser: User = null;

  constructor(private _oidcSecurityService: OidcSecurityService) {
    this._currentUser = null;
    this._oidcSecurityService.userData$.subscribe((data) => this.handleOnChangeUserData(data));
  }

  private handleOnChangeUserData(data: any): void {
    if (!data) return;

    this._isAuthenticated = true;
    this._currentUser = {
      id: data.userData.sub,
      email: data.userData.email,
      firstName: data.userData.given_name,
      lastName: data.userData.family_name,
      fullName: `${data.userData.given_name} ${data.userData.family_name}`,
    };
  }

  public getCurrentUser(): User {
    return this._currentUser;
  }

  public isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  public signIn(redirectUrl?: string): void {
    if (!redirectUrl) redirectUrl = '/goals';

    this._oidcSecurityService.authorize(null, { customParams: { ReturnUrl: redirectUrl } });
  }

  public signOut(): void {
    this._oidcSecurityService.logoff();
  }
}
