import { Component, OnInit, Input } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'vita-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
})
export class UserComponent implements OnInit {
  @Input() iconPositon: 'right' | 'right' = 'right';

  isAuthenticated: boolean;
  userId: string;
  email: string;
  userName: string;
  userWithoutAvatarIcon = faUserCircle;
  showUserIcon = false;

  constructor(public oidcSecurityService: OidcSecurityService) {}

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData }) => {
      this.isAuthenticated = isAuthenticated;

      if (!this.isAuthenticated)
        return;

      this.email = userData.email;
      this.userName = `${userData.given_name} ${userData.family_name}`;
      this.userId = userData.sub;
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  onProfileImgLoadError(event: Event) {
    this.showUserIcon = true;
  }
}
